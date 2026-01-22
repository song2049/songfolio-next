import Image from "next/image";
import Link from "next/link";

type Featured = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  tags: string[];
  href: string;
  logoSrc: string;
};

const FEATURED: Featured[] = [
  {
    slug: "gas",
    title: "GAS (General Affair Asset System)",
    summary: "사내 자산·계정·라이선스 운영을 위한 관리 시스템",
    outcome: "운영을 RBAC + 로그 + 주기 기반 흐름으로 표준화해 인수인계 가능한 구조를 만들었습니다.",
    tags: ["RBAC", "Audit Log", "Lifecycle", "CSV Import", "AWS/Nginx"],
    href: "/projects/gas",
    logoSrc: "/projects/gas/cover.png",
  },
  {
    slug: "x-ink",
    title: "X-ink",
    summary: "개인/기업 외주 매칭 플랫폼 프로토타입",
    outcome: "사용자 유형(개인/기업)별 흐름을 분리해 정보 구조와 화면 동선을 명확히 설계했습니다.",
    tags: ["Next.js", "TypeScript", "UI Flow"],
    href: "/projects/x-ink",
    logoSrc: "/projects/x-ink/cover.png",
  },
  {
    slug: "tocheon",
    title: "Tocheon",
    summary: "학원 주변 로컬 맛집 지도/목록 프로젝트",
    outcome: "API와 화면을 분리하고 데이터 기준을 고정해 확장 가능한 리스트/상세 구조로 정리했습니다.",
    tags: ["Node.js", "API", "Data Model"],
    href: "/projects/tocheon",
    logoSrc: "/projects/tocheon/cover.png",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="relative">
            {/* subtle spotlight behind header only */}
            <div
              className="pointer-events-none absolute -inset-x-10 -top-10 h-40 opacity-60"
              style={{
                background: "radial-gradient(520px circle at 0% 0%, rgba(0,0,0,0.06), transparent 60%)",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                Featured Projects
              </div>
              <h2 className="relative mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
                Featured Projects
              </h2>
            </div>
            <p className="relative mt-2 text-sm text-zinc-600">
              결과물로 증명합니다. (로고/흐름/근거는 상세 페이지에서 확인)
            </p>
          </div>

          <Link
            href="/projects?mode=featured"
            className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50 sm:inline-flex"
          >
            전체 프로젝트 →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {FEATURED.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50"
            >
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <Image
                    src={p.logoSrc}
                    alt={`${p.title} logo`}
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-tight text-zinc-900">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600">{p.summary}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-800">
                <span className="font-semibold text-zinc-900">Outcome.</span> {p.outcome}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/projects?mode=featured"
            className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
          >
            전체 프로젝트 →
          </Link>
        </div>
      </div>
    </section>
  );
}
