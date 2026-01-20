import Link from "next/link";

export function ExperienceTeaser() {
  return (
    <section className="relative bg-white">
      {/* Proof(다크) 다음 전환을 부드럽게 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200/80" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="relative">
            {/* header spotlight */}
            <div
              className="pointer-events-none absolute -inset-x-10 -top-10 h-36 opacity-60"
              style={{
                background:
                  "radial-gradient(520px circle at 0% 0%, rgba(0,0,0,0.06), transparent 60%)",
              }}
            />
            <h2 className="relative text-2xl font-semibold tracking-tight text-zinc-900">Experience</h2>
            <p className="relative mt-2 text-sm text-zinc-600">
              총무·IT 운영을 “사람 의존”에서 “구조 기반”으로 전환했습니다. 문제 → 판단 → 구조 → 결과 관점으로 정리했습니다.
            </p>
          </div>

          <Link
            href="/experience"
            className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50 sm:inline-flex"
          >
            경력 상세 보기 →
          </Link>
        </div>

        {/* Main teaser card */}
        <div className="mt-8">
          <div className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-zinc-900">경력기술서 요약</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-700">
                  운영은 늘 변하지만, 구조는 남습니다. 자산·계정·라이선스 운영을 기준으로 업무를 재정의하고
                  반복 가능한 프로세스로 정리했습니다.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                    운영 프로세스
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                    비용/갱신 체계
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                    표준화/문서화
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                    리스크 통제
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/experience"
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
                >
                  경력 상세 보기 →
                </Link>
                <Link
                  href="/companies"
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
                >
                  회사별 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* mobile CTA */}
        <div className="mt-6 sm:hidden">
          <Link
            href="/experience"
            className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
          >
            경력 상세 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
