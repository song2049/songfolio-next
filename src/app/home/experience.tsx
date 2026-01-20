import Link from "next/link";

type ExpCard = {
  title: string;
  context: string;
  problem: string[];
  decision: string[];
  build: string[];
  result: string[];
  tags: string[];
  cta?: { label: string; href: string };
};

const CARDS = [
  {
    title: "운영을 ‘사람’에서 ‘구조’로 바꾸기",
    context: "자산·계정·라이선스 운영에서 반복되는 이슈를 시스템 구조로 고정",
    problem: [
      "부서/개인별 구매·운영으로 기준이 불명확",
      "갱신·만료·반납 누락으로 비용·리스크 반복",
      "정보가 파일·사람에 분산되어 인수인계가 어려움",
    ],
    decision: [
      "권한(RBAC)과 변경 이력(Audit Log)을 운영의 기본값으로 설계",
      "상태/주기/소유/할당을 데이터 모델로 고정",
      "CSV로 초기 데이터를 빠르게 적재하고 이후 운영을 시스템에 누적",
    ],
    build: [
      "GAS(General Affair Asset System) 설계/개발",
      "등록→할당→변경→반납 흐름 화면화",
      "운영 로그/권한 분리/업로드 흐름 표준화",
    ],
    result: [
      "담당자 변경에도 운영 기준이 유지되는 구조 확보",
      "감사/정산/인수인계 근거(로그·상태·주기) 축적",
      "운영 업무를 재현 가능한 프로세스로 전환",
    ],
    tags: ["RBAC", "Audit Log", "Lifecycle", "CSV Import", "Standard Ops"],
    cta: { label: "GAS 프로젝트 보기", href: "/projects/gas" },
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-white/60">{title}</div>
      <ul className="space-y-1.5 text-sm leading-relaxed text-white/75">
        {items.map((x, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceSection() {
  const c = CARDS[0];

  return (
    <section className="bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Experience
            </h2>
            <p className="mt-2 text-sm text-white/65">
              문제 → 판단 → 구조 → 결과로 정리했습니다.
            </p>
          </div>

          <Link
            href="/projects?mode=featured"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            전체 프로젝트
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="mr-2 text-lg font-semibold text-white">{c.title}</h3>
              {c.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/65">{c.context}</p>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-2">
            <ListBlock title="문제" items={c.problem} />
            <ListBlock title="판단" items={c.decision} />
            <ListBlock title="구현" items={c.build} />
            <ListBlock title="결과" items={c.result} />
          </div>

          {c.cta && (
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-5 sm:px-8">
              <div className="text-xs text-white/55">
                근거는 프로젝트 화면/로그/운영 플로우로 연결됩니다.
              </div>
              <Link
                href={c.cta.href}
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200/40"
              >
                {c.cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
