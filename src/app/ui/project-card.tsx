"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProjectCard({
  title,
  summary,
  period,
  role,
  stack,
  href,
  badge,
  cover,
  highlights,
}: {
  title: string;
  summary: string;
  period: string;
  role?: string;
  stack: string[];
  href: string;
  badge?: string;
  cover?: string;
  highlights?: string[];
}) {
  const [imageError, setImageError] = useState(false);
  const showCover = Boolean(cover) && !imageError;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* cover */}
      <div className="relative h-40 w-full overflow-hidden border-b border-zinc-200 bg-zinc-50">
        {showCover ? (
          <Image
            src={cover as string}
            alt={title}
            fill
            className="object-cover"
            onError={() => {
              setImageError(true);
              if (process.env.NODE_ENV === "development") {
                console.warn(`[ProjectCard] cover load failed: ${cover}`);
              }
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            No cover image
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold">{title}</h3>

              {badge ? (
                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-700">
                  {badge}
                </span>
              ) : null}

              {role ? (
                <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700">
                  {role}
                </span>
              ) : null}
            </div>

            <p className="text-sm text-zinc-600">{summary}</p>

            {/* highlights는 1줄만 선택적으로 노출 */}
            {highlights && highlights.length > 0 ? (
              <p className="mt-2 text-xs text-zinc-500">• {highlights[0]}</p>
            ) : null}
          </div>

          <div className="text-xs text-zinc-500">{period}</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {stack.slice(0, 6).map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-zinc-700 underline decoration-zinc-200 group-hover:decoration-zinc-400">
          자세히 보기
        </div>
      </div>
    </Link>
  );
}
