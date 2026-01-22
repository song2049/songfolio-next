"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Mail, FileText } from "lucide-react"; // FileText = 블로그 대체 아이콘

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function HomeHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-zinc-950">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[10%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* browser frame */}
        <div
          className={[
            "relative rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur",
            !reducedMotion ? "motion-safe:animate-[fadeUp_.6s_ease-out_both]" : "",
          ].join(" ")}
        >
          {/* top chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

            <div className="ml-3 hidden flex-1 items-center justify-center md:flex">
              <div className="w-[420px] max-w-[70%] rounded-full border border-white/10 bg-black/30 px-4 py-1 text-center text-[11px] text-white/60">
                songfolio.dev
              </div>
            </div>
          </div>

          {/* content */}
          <div className="grid items-center gap-10 px-6 py-10 md:grid-cols-3 md:px-10 md:py-12">
            {/* Left */}
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-3xl">
                혼란스러운 운영을
                <br />
                구조로 정리하는 사람
              </h1>

              <p className="text-sm leading-relaxed text-white/70">
                총무 · IT · 시스템 설계
                <br />
                <span className="text-white/90">Song Myeongjin</span>
              </p>

              <div className="flex items-center gap-2 pt-2">
                <IconLink href="song912049@naver.com" label="Email">
                  <Mail className="h-4 w-4" />
                </IconLink>

                <IconLink href="https://github.com/song2049" label="GitHub">
                  <Github className="h-4 w-4" />
                </IconLink>

                <IconLink
                  href="https://blog.naver.com/song912049"
                  label="Naver Blog"
                >
                  <FileText className="h-4 w-4" />
                </IconLink>
              </div>
            </div>

            {/* Middle */}
            <div className="relative mx-auto w-full max-w-[250px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src="/me/profile.jpg"
                  alt="프로필 사진"
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4 md:pl-2">
              <p className="text-sm leading-relaxed text-white/70">
                자산 · 계정 · 라이선스 운영을
                <br />
                데이터 구조와 화면 흐름으로 표준화합니다.
                <br />
                운영 담당자가 바뀌어도 유지되는 시스템을 지향합니다.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {/*  RBAC 기반 권한 설계 / Audit Log 기반 변경 이력 관리 /CSV Import 기반 자산·라이선스 대량 이관 / AWS EC2 + Nginx 운영 환경 구축*/}
                {["RBAC", "Audit Log", "CSV Import", "SaaS"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  href="/projects?mode=featured"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200/40"
                >
                  Explore Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
