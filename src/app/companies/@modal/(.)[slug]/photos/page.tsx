"use client";

import { use, useMemo, useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  getCompanyWorkPhotos,
  workCategoryLabel,
  type CompanyKey,
  type WorkCategory,
  type WorkPhoto,
} from "../../../../lib/data/work-photos";
import { Lightbox } from "@/src/components/work-photos/lightbox";

function pill(active: boolean) {
  return [
    "rounded-full border px-3 py-1 text-xs transition",
    active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white hover:bg-zinc-50",
  ].join(" ");
}

export default function CompanyPhotosModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug: slugRaw } = use(params);
  const slug = slugRaw as CompanyKey;

  // 🔍 디버깅: slug 값과 데이터 로깅
  console.log("[Modal] slug:", slug, "| type:", typeof slug);

  const all = useMemo(() => {
    try {
      const result = getCompanyWorkPhotos(slug);
      console.log(`[Modal] getCompanyWorkPhotos("${slug}") returned ${result.length} photos`);
      return result;
    } catch {
      console.error(`[Modal] Error getting photos for slug: ${slug}`);
      return [];
    }
  }, [slug]);

  const [cat, setCat] = useState<WorkCategory | "all">("all");
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    if (cat === "all") return all;
    return all.filter((p) => p.category === cat);
  }, [all, cat]);

  // ESC 키 및 오버레이 클릭으로 모달 닫기
  const handleCloseModal = useCallback(() => {
    router.back();
  }, [router]);

  // 키보드 이벤트 (ESC로 모달 닫기)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCloseModal]);

  // body overflow 관리
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 포커스 관리: 모달 열리면 닫기 버튼에 focus
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // 이미지 클릭 시 라이트박스 열기
  const handlePhotoClick = (photo: WorkPhoto) => {
    const index = filtered.indexOf(photo);
    if (index !== -1) {
      setSelectedPhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/50 cursor-pointer"
          onClick={handleCloseModal}
          aria-label="Close modal"
        />

        {/* modal */}
        <div className="absolute left-1/2 top-1/2 w-[min(980px,92vw)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200 p-5 flex-shrink-0">
            <div>
              <div className="text-sm font-semibold">Work Photos</div>
              <div className="mt-1 text-xs text-zinc-600">
                {slug} · {all.length} photos
              </div>
            </div>

            <button
              ref={closeButtonRef}
              onClick={handleCloseModal}
              aria-label="Close modal"
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 transition"
            >
              Close ✕
            </button>
          </div>

          {/* filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 p-4 flex-shrink-0 overflow-x-auto">
            <button type="button" className={pill(cat === "all")} onClick={() => setCat("all")}>
              All
            </button>
            {(
              Object.keys(workCategoryLabel) as WorkCategory[]
            ).map((k) => (
              <button key={k} type="button" className={pill(cat === k)} onClick={() => setCat(k)}>
                {workCategoryLabel[k]}
              </button>
            ))}
          </div>

          {/* body - scrollable */}
          <div className="flex-1 overflow-auto p-5">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
                해당 조건에 맞는 사진이 없습니다.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, idx) => (
                  <div
                    key={p.id}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:shadow-md transition cursor-pointer"
                    onClick={() => handlePhotoClick(p)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${p.caption || "photo"} in lightbox`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePhotoClick(p);
                      }
                    }}
                  >
                    <div className="relative h-44 w-full bg-zinc-50">
                      {!broken[p.id] ? (
                        <Image
                          src={p.src}
                          alt={p.caption}
                          fill
                          className="object-cover"
                          onError={() => setBroken((m) => ({ ...m, [p.id]: true }))}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                          Image not found
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700">
                          {workCategoryLabel[p.category]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-700 line-clamp-2">{p.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-xs text-zinc-500">
              Tip: 이미지를 클릭하면 확대 뷰에서 볼 수 있습니다. 실제 사진 파일을{" "}
              <span className="font-semibold">public/images/work/...</span> 경로에 넣으면 바로 반영됩니다.
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          photos={filtered}
          initialIndex={selectedPhotoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
