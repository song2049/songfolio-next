"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { WorkPhoto } from "../lib/data/work-photos";

export function WorkCarousel({
  photos,
  intervalMs = 2600,
  height = 220,
  maxPhotos = 6,
}: {
  photos: WorkPhoto[];
  intervalMs?: number;
  height?: number;
  maxPhotos?: number;
}) {
  const list = useMemo(() => photos.slice(0, maxPhotos), [photos, maxPhotos]); // 프리뷰는 최대 6장
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (list.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % list.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [list.length, intervalMs]);

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
        아직 등록된 작업 사진이 없습니다.
      </div>
    );
  }

  // 3-up (left/center/right) + 뒤에 살짝 보이는 느낌
  const getIndex = (offset: number) => {
    const n = list.length;
    return (active + offset + n) % n;
  };

  const center = list[getIndex(0)];
  const left = list.length >= 2 ? list[getIndex(-1)] : null;
  const right = list.length >= 3 ? list[getIndex(1)] : null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="relative w-full overflow-hidden" style={{ height }}>
        {/* left */}
        {left ? (
          <Slide
            key={left.id}
            photo={left}
            pos="left"
            height={height}
            broken={broken[left.id]}
            onBroken={() => setBroken((m) => ({ ...m, [left.id]: true }))}
          />
        ) : null}

        {/* right */}
        {right ? (
          <Slide
            key={right.id}
            photo={right}
            pos="right"
            height={height}
            broken={broken[right.id]}
            onBroken={() => setBroken((m) => ({ ...m, [right.id]: true }))}
          />
        ) : null}

        {/* center */}
        <Slide
          key={center.id}
          photo={center}
          pos="center"
          height={height}
          broken={broken[center.id]}
          onBroken={() => setBroken((m) => ({ ...m, [center.id]: true }))}
        />
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {list.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              aria-label={`go to ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={[
                "h-2.5 w-2.5 rounded-full border transition",
                idx === active ? "border-zinc-900 bg-zinc-900" : "border-zinc-300 bg-white hover:bg-zinc-50",
              ].join(" ")}
            />
          ))}
        </div>
        <div className="text-xs text-zinc-600">
          {active + 1} / {list.length}
        </div>
      </div>

      {/* caption (center only) */}
      <p className="mt-3 text-sm text-zinc-700">
        <span className="font-semibold">•</span> {center.caption}
      </p>
    </div>
  );
}

function Slide({
  photo,
  pos,
  height,
  broken,
  onBroken,
}: {
  photo: WorkPhoto;
  pos: "left" | "center" | "right";
  height: number;
  broken?: boolean;
  onBroken: () => void;
}) {
  const base =
    "absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition-all duration-500";

  const styleByPos: Record<typeof pos, string> = {
    left: "left-2 w-[58%] opacity-60 -translate-x-10 scale-[0.86] rotate-[-6deg] blur-[0.2px]",
    center: "left-1/2 w-[70%] -translate-x-1/2 scale-100 opacity-100 rotate-0",
    right: "right-2 w-[58%] opacity-60 translate-x-10 scale-[0.86] rotate-[6deg] blur-[0.2px]",
  };

  return (
    <div className={[base, styleByPos[pos]].join(" ")} style={{ height: Math.max(160, height - 10) }}>
      <div className="relative h-full w-full">
        {!broken ? (
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            className="object-cover"
            onError={onBroken}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            Image not found
          </div>
        )}
      </div>
    </div>
  );
}
