"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import type { WorkPhoto } from "@/app/lib/data/work-photos";

interface LightboxProps {
  photos: WorkPhoto[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 키보드 네비게이션
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }
    },
    [photos.length, onClose]
  );

  // 마운트 시 focus 및 키보드 리스너
  useEffect(() => {
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    // body overflow 방지 (추가 레이어)
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKeyDown]);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* 닫기 버튼 (상단 우측) */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
      >
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 메인 이미지 영역 */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-square">
          {currentPhoto && (
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* 좌측 네비게이션 */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 우측 네비게이션 */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 하단 정보 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="text-white text-sm font-semibold">
          {currentIndex + 1} / {photos.length}
        </div>
        {currentPhoto.caption && (
          <p className="text-white/80 text-sm mt-2 max-w-md">{currentPhoto.caption}</p>
        )}
      </div>
    </div>
  );
}
