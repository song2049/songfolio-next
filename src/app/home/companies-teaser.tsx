// src/app/home/companies-teaser.tsx
import Link from "next/link";

type Company = {
  key: string;
  name: string;
  period?: string;
  role?: string;
  oneLiner?: string;
};

const companies: Company[] = [
  {
    key: "kga",
    name: "경일게임IT아카데미 (KGA)",
    period: "2025–2026",
    role: "블록체인기반 AI 웹 풀스택",
    oneLiner: "Next.js 기반 프로젝트 수행과 포트폴리오 구축을 통해 실무 중심 개발 역량을 정리",
  },
  {
    key: "miracle-city",
    name: "Miracle City × Jellyfish",
    period: "2024–2025",
    role: "총무 · 운영 관리",
    oneLiner: "현장 운영, 시설·비품 관리, 협력사 대응 등 실무 운영 전반을 담당",
  },
  {
    key: "vacorp",
    name: "VA Corporation",
    period: "2022–2024",
    role: "IT · 자산관리담당자",
    oneLiner: "제로베이스에서 자산·계정·라이선스 운영 업무를 구조화 진행",
  },
  {
    key: "jeongmu",
    name: "Jeongmu",
    period: "2017–2020",
    role: "인사총무 · 운영 지원",
    oneLiner: "운영 업무를 문서·체크리스트 중심으로 정리해 인수인계 가능한 구조로 개선",
  },
  {
    key: "nhn",
    name: "NHN / NAVER",
    period: "2014–2017",
    role: "IT 총무 · 전산 운영",
    oneLiner: "대규모 조직 환경에서 IT 자산·계정·장비 운영의 기본 체계를 경험",
  },
];

export function CompaniesTeaser() {
  return (
    <section className="relative bg-zinc-50">
      {/* top/bottom divider to create rhythm */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-zinc-200/80" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
              Companies
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">Companies</h2>
            <p className="mt-2 text-sm text-zinc-600">
              회사별 경력(업무 내용) 페이지로 바로 이동할 수 있습니다.
            </p>
          </div>

          <Link
            href="/companies"
            className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50 sm:inline-flex"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <Link
              key={c.key}
              href={`/companies/${c.key}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50"
            >
              <div className="text-sm font-semibold text-zinc-900">{c.name}</div>

              {(c.period || c.role) && (
                <div className="mt-1 text-xs text-zinc-600">
                  {[c.period, c.role].filter(Boolean).join(" · ")}
                </div>
              )}

              {c.oneLiner && <p className="mt-3 text-sm text-zinc-700 line-clamp-2">{c.oneLiner}</p>}

              <div className="mt-4 text-xs text-zinc-500">Company page →</div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/companies"
            className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
          >
            전체 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
