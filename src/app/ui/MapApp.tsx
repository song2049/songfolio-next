"use client";

import Script from "next/script";
import * as XLSX from "xlsx";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

type VisitStatus = "NONE" | "DONE" | "ABSENT" | "REFUSED";

type Pin = {
  id: string; // 순번
  name: string; // 주주명
  address: string; // 상세주소
  shares: number; // 실제주식수
  sido?: string;
  sigungu?: string;
  x?: number; // lng
  y?: number; // lat
  geoOk?: boolean;
  geoErr?: string;

  status: VisitStatus;
  memo?: string;
  updatedAt?: number;
};

const STORAGE_KEY = "delegation_pins_v1";
const HIGH_SHARES = 5000;

function toNum(v: any) {
  const s = String(v ?? "").replace(/,/g, "").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function safeStr(v: any) {
  return String(v ?? "").trim();
}

function loadSaved(): Record<string, Partial<Pin>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return {};
    return obj;
  } catch {
    return {};
  }
}

function savePins(pins: Pin[]) {
  // id(순번) 기준으로 status/memo만 저장 (좌표/주소는 엑셀에서 다시 불러와도 됨)
  const out: Record<string, Partial<Pin>> = {};
  for (const p of pins) {
    out[p.id] = {
      status: p.status,
      memo: p.memo ?? "",
      updatedAt: p.updatedAt ?? Date.now(),
      // 좌표도 같이 저장해두면 재업로드 없이도 빠름 (있으면 저장)
      x: p.x,
      y: p.y,
      geoOk: p.geoOk,
    };
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
}

function statusLabel(s: VisitStatus) {
  if (s === "DONE") return "완료";
  if (s === "ABSENT") return "부재";
  if (s === "REFUSED") return "거절";
  return "미처리";
}

function statusColor(s: VisitStatus) {
  // 마커/뱃지 색 느낌용 (CSS 색상)
  if (s === "DONE") return "#16a34a"; // green
  if (s === "ABSENT") return "#f59e0b"; // amber
  if (s === "REFUSED") return "#ef4444"; // red
  return "#2563eb"; // blue (미처리)
}

function badgeBg(s: VisitStatus) {
  if (s === "DONE") return "rgba(22,163,74,0.12)";
  if (s === "ABSENT") return "rgba(245,158,11,0.14)";
  if (s === "REFUSED") return "rgba(239,68,68,0.12)";
  return "rgba(37,99,235,0.10)";
}

export default function MapApp() {
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string>("엑셀을 업로드해줘.");
  const [ready, setReady] = useState(false);

  const selected = useMemo(
    () => pins.find((p) => p.id === selectedId) ?? null,
    [pins, selectedId]
  );

  const counts = useMemo(() => {
    const c = { NONE: 0, DONE: 0, ABSENT: 0, REFUSED: 0, HIGH: 0 };
    for (const p of pins) {
      c[p.status]++;
      if (p.shares >= HIGH_SHARES) c.HIGH++;
    }
    return c;
  }, [pins]);

  const isKakaoReady = () => !!window.kakao?.maps && !!window.Kakao;

  const initMap = () => {
    if (!mapDivRef.current) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(35.1595, 129.0756); // 부산 근처(임시)
      const map = new window.kakao.maps.Map(mapDivRef.current, {
        center,
        level: 8,
      });
      mapRef.current = map;
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
      setReady(true);
    });
  };

  const initKakaoSdk = () => {
    if (!KAKAO_KEY) return;
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized?.()) window.Kakao.init(KAKAO_KEY);
  };

  const clearMarkers = () => {
    for (const m of markersRef.current) m.setMap(null);
    markersRef.current = [];
  };

  const markerImgFor = (p: Pin) => {
    // 상태색 기반 마커 + 고액주주면 별(⭐)로 형태 강조
    const s = p.status;
    const isHigh = p.shares >= HIGH_SHARES;

    // 기본 제공 이미지 URL 몇 가지 활용(가볍게 MVP)
    // - 별마커(고액주주): markerStar.png
    // - 일반: 색상별로는 기본이미지가 제한적이라, MVP에선
    //   "고액=별 / 나머지=빨강" 대신, 상태별로 '이미지'를 분기해준다.
    // (완전 커스텀 SVG는 다음 단계에서)
    const base = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/";
    if (isHigh) {
      // 별마커는 상태 색 구분이 어렵지만, 대신 테두리 강조 역할로 쓰고
      // 상태는 인포/리스트/바텀시트로 확실히 보여주자(현장용 OK).
      return { src: base + "markerStar.png", w: 28, h: 40 };
    }

    // 상태별로 다른 기본 이미지를 쓰고 싶지만, 공개 샘플 이미지가 제한적이라
    // MVP에서는 1개 이미지 + 인포/리스트 색으로 구분.
    // (원하면 다음 단계에서 SVG dataURL로 상태별 색 마커 만들어줄게)
    return { src: base + "marker_red.png", w: 24, h: 35 };
  };

  const renderMarkers = () => {
    const map = mapRef.current;
    if (!map || !window.kakao?.maps) return;

    clearMarkers();

    const bounds = new window.kakao.maps.LatLngBounds();
    let n = 0;

    for (const p of pins) {
      if (!p.geoOk || p.x == null || p.y == null) continue;

      const pos = new window.kakao.maps.LatLng(p.y, p.x);
      bounds.extend(pos);
      n++;

      const img = markerImgFor(p);
      const markerImage = new window.kakao.maps.MarkerImage(
        img.src,
        new window.kakao.maps.Size(img.w, img.h)
      );

      const marker = new window.kakao.maps.Marker({
        position: pos,
        image: markerImage,
        clickable: true,
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, "click", () => {
        setSelectedId(p.id);
        map.panTo(pos);
      });

      markersRef.current.push(marker);
    }

    if (n >= 2) map.setBounds(bounds);
    if (n === 1) map.setLevel(5);
  };

  useEffect(() => {
    if (!ready) return;
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, pins]);

  const geocodeOne = (address: string) =>
    new Promise<{ x: number; y: number }>((resolve, reject) => {
      const geocoder = geocoderRef.current;
      if (!geocoder) return reject(new Error("geocoder not ready"));

      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
          resolve({ x: Number(result[0].x), y: Number(result[0].y) });
        } else {
          reject(new Error("not found"));
        }
      });
    });

  const geocodeAll = async (list: Pin[]) => {
    let ok = 0;
    const out: Pin[] = [];

    for (let i = 0; i < list.length; i++) {
      const p = list[i];

      // 이미 저장된 좌표가 있으면 스킵
      if (p.geoOk && p.x != null && p.y != null) {
        out.push(p);
        ok++;
        setStatusText(`좌표 변환: ${i + 1}/${list.length} (성공 ${ok})`);
        setPins([...out, ...list.slice(i + 1)]);
        continue;
      }

      try {
        const { x, y } = await geocodeOne(p.address);
        out.push({ ...p, x, y, geoOk: true, geoErr: undefined });
        ok++;
      } catch {
        out.push({ ...p, geoOk: false, geoErr: "좌표 변환 실패" });
      }

      setStatusText(`좌표 변환: ${i + 1}/${list.length} (성공 ${ok})`);
      setPins([...out, ...list.slice(i + 1)]);
      await new Promise((r) => setTimeout(r, 90)); // 안정성용 딜레이
    }

    setStatusText(`완료! 성공 ${ok}/${list.length}`);
  };

  const onFile = async (file: File) => {
    setSelectedId(null);
    setStatusText("엑셀 읽는 중...");

    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });

    const saved = loadSaved();

    const list: Pin[] = json
      .map((r) => {
        const id = safeStr(r["순번"]);
        const name = safeStr(r["주주명"]);
        const address = safeStr(r["상세주소"]);
        const shares = toNum(r["실제주식수"]);
        const sido = safeStr(r["도"]);
        const sigungu = safeStr(r["시"]);

        if (!id || !address) return null;

        const prev = saved[id] ?? {};
        const status = (prev.status as VisitStatus) || "NONE";
        const memo = typeof prev.memo === "string" ? prev.memo : "";
        const x = typeof prev.x === "number" ? prev.x : undefined;
        const y = typeof prev.y === "number" ? prev.y : undefined;
        const geoOk = typeof prev.geoOk === "boolean" ? prev.geoOk : undefined;

        return {
          id,
          name: name || `#${id}`,
          address,
          shares,
          sido,
          sigungu,
          status,
          memo,
          x,
          y,
          geoOk,
          updatedAt: Date.now(),
        } as Pin;
      })
      .filter(Boolean) as Pin[];

    setPins(list);
    setStatusText(`주소 ${list.length}개 로드됨. 좌표 변환 시작...`);
    await geocodeAll(list);
  };

  const panTo = (p: Pin) => {
    const map = mapRef.current;
    if (!map || !p.geoOk || p.x == null || p.y == null) return;
    const pos = new window.kakao.maps.LatLng(p.y, p.x);
    map.panTo(pos);
  };

  const updatePin = (id: string, patch: Partial<Pin>) => {
    setPins((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p
      );
      // 로컬 저장
      try {
        savePins(next);
      } catch {}
      return next;
    });
  };

  const setVisitStatus = (id: string, s: VisitStatus) => {
    updatePin(id, { status: s });
  };

  const startNavi = (p: Pin) => {
    if (!p.geoOk || p.x == null || p.y == null) return;

    // Kakao Navi JS SDK
    try {
      if (window.Kakao?.Navi?.start) {
        window.Kakao.Navi.start({
          name: p.name,
          x: p.x,
          y: p.y,
          coordType: "wgs84",
        });
        return;
      }
    } catch {}

    // fallback: 카카오맵 링크
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(p.name)},${p.y},${p.x}`;
    window.location.href = url;
  };

  if (!KAKAO_KEY) {
    return (
      <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 12 }}>
        <b>.env.local</b>에 <code>NEXT_PUBLIC_KAKAO_JS_KEY</code> 넣어줘.
      </div>
    );
  }

  return (
    <>
      {/* Kakao JS SDK (Navi) */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          initKakaoSdk();
          if (window.kakao?.maps) initMap();
        }}
      />
      {/* Kakao Maps SDK (services geocoder) */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          initKakaoSdk();
          initMap();
        }}
      />

      {/* 상단: 파일 + 요약 */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
        <span style={{ fontSize: 12, opacity: 0.75 }}>{statusText}</span>
      </div>

      {/* 카운트 바 */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <StatChip label="미처리" value={counts.NONE} color={statusColor("NONE")} />
        <StatChip label="완료" value={counts.DONE} color={statusColor("DONE")} />
        <StatChip label="부재" value={counts.ABSENT} color={statusColor("ABSENT")} />
        <StatChip label="거절" value={counts.REFUSED} color={statusColor("REFUSED")} />
        <StatChip label="⭐ 고액(≥5000)" value={counts.HIGH} color="#111827" />
      </div>

      {/* 지도 + 리스트 (모바일 레이아웃) */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "420px 1fr",
          gap: 10,
        }}
      >
        {/* 지도 */}
        <div
          ref={mapDivRef}
          style={{
            width: "100%",
            height: 420,
            borderRadius: 14,
            border: "1px solid #eaeaea",
            overflow: "hidden",
          }}
        />

        {/* 하단 리스트 */}
        <div style={{ display: "grid", gap: 8 }}>
          {pins.map((p) => {
            const isHigh = p.shares >= HIGH_SHARES;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedId(p.id);
                  panTo(p);
                }}
                style={{
                  textAlign: "left",
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #eee",
                  background:
                    selectedId === p.id ? "rgba(0,0,0,0.03)" : "white",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>
                    {isHigh ? "⭐ " : ""}
                    {p.name}{" "}
                    <span style={{ fontWeight: 700, opacity: 0.75 }}>
                      · {p.shares.toLocaleString()}주
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 999,
                      border: `1px solid ${statusColor(p.status)}`,
                      background: badgeBg(p.status),
                      color: statusColor(p.status),
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                    }}
                  >
                    {statusLabel(p.status)}
                  </span>
                </div>

                <div style={{ fontSize: 12, opacity: 0.78, marginTop: 6 }}>
                  {p.address}
                </div>

                {!p.geoOk && p.geoErr && (
                  <div style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}>
                    {p.geoErr}
                  </div>
                )}

                {p.memo ? (
                  <div style={{ fontSize: 12, marginTop: 6, opacity: 0.85 }}>
                    메모: {p.memo}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* 바텀시트 */}
      {selected && (
        <div
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: 12,
            padding: 14,
            borderRadius: 16,
            border: "1px solid #eaeaea",
            background: "white",
            boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 15 }}>
                {selected.shares >= HIGH_SHARES ? "⭐ " : ""}
                {selected.name}{" "}
                <span style={{ fontWeight: 800, opacity: 0.75 }}>
                  · {selected.shares.toLocaleString()}주
                </span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                {selected.address}
              </div>
            </div>

            <button
              onClick={() => setSelectedId(null)}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: "8px 10px",
                height: 36,
              }}
            >
              닫기
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={() => startNavi(selected)}
              disabled={!selected.geoOk}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: "none",
                background: selected.geoOk ? "#111" : "#aaa",
                color: "white",
                fontWeight: 900,
              }}
            >
              카카오내비 길안내
            </button>
          </div>

          {/* 상태 버튼 3개 */}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <StatusBtn
              active={selected.status === "DONE"}
              label="완료"
              color={statusColor("DONE")}
              onClick={() => setVisitStatus(selected.id, "DONE")}
            />
            <StatusBtn
              active={selected.status === "ABSENT"}
              label="부재"
              color={statusColor("ABSENT")}
              onClick={() => setVisitStatus(selected.id, "ABSENT")}
            />
            <StatusBtn
              active={selected.status === "REFUSED"}
              label="거절"
              color={statusColor("REFUSED")}
              onClick={() => setVisitStatus(selected.id, "REFUSED")}
            />
            <StatusBtn
              active={selected.status === "NONE"}
              label="미처리"
              color={statusColor("NONE")}
              onClick={() => setVisitStatus(selected.id, "NONE")}
            />
          </div>

          {/* 메모 */}
          <div style={{ marginTop: 10 }}>
            <input
              value={selected.memo ?? ""}
              onChange={(e) => updatePin(selected.id, { memo: e.target.value })}
              placeholder="메모 (예: 연락처 없음 / 경비실 방문 등)"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #eaeaea",
                outline: "none",
                fontSize: 13,
              }}
            />
          </div>

          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>
            * 상태/메모는 이 기기 로컬에 자동 저장됨(새로고침해도 유지)
            <br />
            * 마커 색을 상태별로 “완전” 다르게 보이게 하려면 다음 단계에서 SVG 마커로 바꿔주면 됨(10분 컷).
          </div>
        </div>
      )}
    </>
  );
}

function StatChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        border: "1px solid #eaeaea",
        borderRadius: 999,
        padding: "6px 10px",
        fontSize: 12,
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 99, background: color, display: "inline-block" }} />
      <span style={{ fontWeight: 800 }}>{label}</span>
      <span style={{ opacity: 0.75 }}>{value}</span>
    </div>
  );
}

function StatusBtn({
  active,
  label,
  color,
  onClick,
}: {
  active: boolean;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 8px",
        borderRadius: 12,
        border: `1px solid ${active ? color : "#eaeaea"}`,
        background: active ? "rgba(0,0,0,0.04)" : "white",
        color: active ? color : "#111",
        fontWeight: 900,
        fontSize: 13,
      }}
    >
      {label}
    </button>
  );
}