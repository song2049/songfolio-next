import Link from "next/link";

type CareerCard = {
  company: string;
  period: string;
  role: string;
  outcome: string;
  href?: string; // 회사 상세/경험 상세로 연결
};

const CAREERS: CareerCard[] = [
  {
    company: "Jellyfish Entertainment",
    period: "2024.04 – 2024.08",
    role: "General Affairs",
    outcome:
      "외주 의존도 감소 및 구매 구조 개선으로 운영 비용 절감 + 시설/출입/법정관리 운영.",
    href: "/companies/miracle-city",
  },
  {
    company: "VA Corporation",
    period: "2022.09 – 2024.03",
    role: "IT",
    outcome:
      "구매·갱신 기준 정립 및 자산 운영 표준화로 비용 절감 + 운영 리스크 감소.",
    href: "/companies/vacorp",
  },
  {
    company: "Jeongmu Real Estate Group",
    period: "2017.07 – 2020.07",
    role: "HR/GA",
    outcome:
      "지사 확장·사옥 이전·시설 운영을 표준 프로세스로 안정적으로 수행.",
    href: "/companies/jeongmu",
  },
  {
    company: "NHN / NAVER I&S",
    period: "2014.08 – 2017.01",
    role: "IT Support",
    outcome:
      "IT HelpDesk + 전산자산 조사/입출고/좌석 실사 등 운영 기초 체계 경험.",
    href: "/companies/nhn",
  },
];

function Card({ c }: { c: CareerCard }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-zinc-900">{c.company}</div>
      <div className="mt-1 text-xs text-zinc-500">
        {c.period} · {c.role}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-700">{c.outcome}</p>

      {c.href && (
        <div className="mt-4">
          <Link href={c.href} className="text-sm text-zinc-900 underline underline-offset-4">
            회사/업무 상세 보기 →
          </Link>
        </div>
      )}
    </div>
  );
}

export function CareerSnapshotSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Career Snapshot
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          회사별 핵심 역할을 짧게 보여주고, 상세는 회사 페이지에서 확인할 수 있습니다.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {CAREERS.map((c) => (
            <Card key={c.company} c={c} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-zinc-900">Experience (경력기술서)</div>
          <p className="mt-2 text-sm text-zinc-700">
            프로젝트의 근거가 되는 전체 업무 흐름/성과는 Experience에서 한 번에 확인할 수 있습니다.
          </p>
          <div className="mt-3">
            <Link href="/experience" className="text-sm text-zinc-900 underline underline-offset-4">
              Experience 보기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
