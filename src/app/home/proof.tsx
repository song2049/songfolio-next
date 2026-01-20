import Link from "next/link";

type ProofCard = {
  title: string;
  desc: string;
};

const PROOFS: ProofCard[] = [
  {
    title: "운영 표준화",
    desc: "구매→등록→배포→회수/폐기까지 라이프사이클 기반으로 운영 관리.",
  },
  {
    title: "권한/통제",
    desc: "관리자 권한(RBAC)과 로그 기반 운영으로 리스크 감소 및 근거 축적.",
  },
  {
    title: "비용 최적화",
    desc: "라이선스/구독 비용 절감과 갱신 관리 체계화로 누수 방지.",
  },
];

function ProofCardUI({ title, desc }: ProofCard) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      {/* subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-sm font-semibold tracking-tight text-white">{title}</div>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{desc}</p>
      </div>
    </div>
  );
}

export function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* background: space vibe (black & white only) */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft blobs */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-56 -left-56 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-56 -right-56 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at 50% 0%, rgba(255,255,255,0.14), transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Portfolio Proof
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Proof</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              경력기술서의 핵심을 포트폴리오 관점으로 요약했습니다. “업무를 구조화하고, 통제하고, 비용을
              최적화하는 방식”을 결과로 보여줍니다.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
            <Link
              href="/projects?mode=featured"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07]"
            >
              Projects →
            </Link>
            <Link
              href="/companies"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07]"
            >
              Companies →
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07]"
            >
              Experience →
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROOFS.map((p) => (
            <ProofCardUI key={p.title} {...p} />
          ))}
        </div>


      </div>
    </section>
  );
}
