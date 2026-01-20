import Link from "next/link";
import { Container } from "../ui/container";
import { Section } from "../section";
type CompanyCase = {
  company: string;
  period: string;
  role: string;
  outcome: string;
  problem: string[];
  structure: string[];
  result: string[];
  links?: { label: string; href: string }[];
};

const CASES: CompanyCase[] = [
  {
    company: "VA Corporation",
    period: "2022.09 – 2024.03",
    role: "IT / 자산·라이선스 운영",
    outcome:
      "구매·갱신 기준 정립 및 자산 운영 표준화로 비용 절감 + 운영 리스크 감소",
    problem: [
      "부서/개인별 구매로 기준이 불명확",
      "갱신·만료·반납 누락으로 비용·리스크 반복",
      "자산/계정 정보가 파일·사람에 분산되어 인수인계가 어려움",
    ],
    structure: [
      "관리자(Admin) 구매 원칙 및 프로세스 정립",
      "권한(RBAC)·변경이력(Audit Log) 기반 운영 기준 설계",
      "상태/주기/소유/할당을 데이터 구조로 고정",
      "매뉴얼 제작 및 전사 공유",
    ],
    result: [
      "인수인계/감사/정산 대응을 위한 운영 근거(로그·상태·주기) 축적",
      "운영 누수(갱신/반납/만료) 감소",
      "운영을 ‘개인 역량’이 아닌 ‘재현 가능한 프로세스’로 전환",
    ],
    links: [
      { label: "GAS 프로젝트", href: "/projects/gas" },
      { label: "프로젝트 전체", href: "/projects?mode=featured" },
    ],
  },
  {
    company: "Miracle City World Group",
    period: "2024.04 – 2025.03",
    role: "General Affairs / 시설·구매·운영",
    outcome:
      "외주 의존도 감소 및 구매 구조 개선으로 운영 비용 절감 + 관리 범위 확장",
    problem: [
      "외주 의존도가 높아 운영 속도/비용 부담",
      "구매 대행/업체 구조로 비용 누수 가능",
      "시설/출입/법정관리 등 운영 영역이 넓고 이슈가 동시다발",
    ],
    structure: [
      "브랜드/홈페이지/영상 제작 등 내부 제작으로 외주 의존도 감소",
      "구매 구조 재정비(업체/대행 변경 포함)로 수수료 관리",
      "출입 권한·근태(E1) 운영 및 시설/안전 관련 법정 관리 수행",
    ],
    result: [
      "외주 비용 절감 + 운영 리드타임 단축",
      "구매 집행/관리 관점에서 비용 통제 강화",
      "넓은 운영 범위를 우선순위 기반으로 안정화",
    ],

  },
  {
    company: "Jeongmu Real Estate Group",
    period: "2017.07 – 2020.07",
    role: "HR/GA / 총무",
    outcome: "지사 확장·사옥 이전·시설 운영을 표준 프로세스로 안정적으로 수행",
    problem: [
      "다지사 환경에서 시설/자산/차량 운영이 분산",
      "이전/확장 과정에서 일정·업체·현장 이슈 상시 발생",
    ],
    structure: [
      "이전/확장 업무를 체크리스트/프로세스로 관리",
      "시설·차량·자산 관리의 담당/업체/일정 운영",
    ],
    result: [
      "대규모 운영 이슈를 일정/우선순위 기반으로 안정적 처리",
      "현장 중심 총무 운영 역량 강화",
    ],
  },
  {
    company: "NHN / NAVER I&S",
    period: "2014.08 – 2017.01",
    role: "IT Support / 전산 운영",
    outcome: "대규모 조직의 IT 운영 기초 체계 경험",
    problem: ["사용자 요청/장애/자산 관리가 동시다발", "전산 자산 조사/실사/입출고의 정확성 요구"],
    structure: ["IT HelpDesk 운영", "전산 자산 조사·입출고·좌석 실사 및 사용자 대응"],
    result: ["운영 프로세스의 기본기 체득", "현장 대응/커뮤니케이션 기반 강화"],
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{title}</h1>
      {desc ? <p className="mt-2 text-sm text-zinc-600">{desc}</p> : null}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-zinc-700">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience"
          desc="문제 → 판단 → 구조 → 결과 관점으로 경력을 정리했습니다."
        />

        {/* Summary header */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-zinc-900">
            한 줄 요약
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">
            총무·IT 운영을 <span className="font-medium text-zinc-900">‘사람 의존’</span>에서{" "}
            <span className="font-medium text-zinc-900">‘구조 기반’</span>으로 전환해온 실무형 운영 설계자
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {["운영 표준화", "RBAC", "Audit Log", "Lifecycle", "비용 최적화", "인수인계/감사 대응"].map(
              (t) => (
                <Pill key={t}>{t}</Pill>
              )
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/projects?mode=featured"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/#proof"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
            >
              메인 보기
            </Link>
          </div>
        </div>

        {/* Company cases */}
        <div className="mt-10 space-y-6">
          {CASES.map((c) => (
            <section key={c.company} className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="border-b border-zinc-200 px-6 py-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-zinc-900">{c.company}</div>
                    <div className="mt-1 text-xs text-zinc-500">
                      {c.period} · {c.role}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-zinc-900">
                    {c.outcome}
                  </div>
                </div>
              </div>

              <div className="grid gap-8 px-6 py-6 lg:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-700">Problem</div>
                  <List items={c.problem} />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-700">Structure</div>
                  <List items={c.structure} />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-700">Result</div>
                  <List items={c.result} />
                </div>
              </div>

              {c.links?.length ? (
                <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200 px-6 py-5">
                  {c.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-zinc-900 underline underline-offset-4"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-zinc-900">How I Work</div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            <li>• 운영은 감각이 아니라 구조로 관리되어야 합니다.</li>
            <li>• 기준·권한·로그가 없으면 문제는 반복됩니다.</li>
            <li>• 시스템은 “한 사람이 잘 쓰는 도구”가 아니라 누가 맡아도 유지되는 구조여야 합니다.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}