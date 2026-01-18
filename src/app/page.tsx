import Link from "next/link";
import { projects } from "./lib/data/projects";
import { Section } from "./section";
import { Container } from "./ui/container";
import { ProjectCard } from "./ui/project-card";

export default function HomePage() {
  const featured = projects.filter((p: any) => p.featured);

  return (
    <main>
      {/* HERO */}
      <section className="py-12">
        <Container>
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">
              총무 업무를 시스템으로 설계하고 구현합니다.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              자산·계정·라이선스 운영을 데이터 구조와 권한(RBAC), 로그 기반 흐름으로 정리해
              운영 리스크를 줄이고 인수인계를 가능하게 만드는 것을 목표로 합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/featured"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Featured Projects →
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
              >
                All Projects →
              </Link>
              <Link
                href="/experience"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Experience →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      <Section
        title="Featured Projects"
        description="총무/운영 업무를 시스템으로 전환한 대표 사례입니다."
      >
        <div className="grid gap-4">
          {featured.map((p: any) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              summary={p.summary}
              period={p.period}
              role={p.role}
              stack={p.stack}
              href={`/projects/${p.slug}`}
              cover={p.cover}
              highlights={p.highlights}
            />
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/featured"
            className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
          >
            Featured 전체 보기 →
          </Link>
        </div>
      </Section>

      {/* PROOF */}
      <Section
        title="Proof"
        description="경력기술서의 핵심을 포트폴리오 관점으로 요약했습니다."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">운영 표준화</div>
            <p className="mt-2 text-sm text-zinc-600">
              구매→등록→배포→회수/폐기까지 흐름을 규칙과 데이터로 정리
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">권한/통제</div>
            <p className="mt-2 text-sm text-zinc-600">
              관리자 권한(RBAC)과 로그 기반 운영으로 리스크 감소
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">비용 최적화</div>
            <p className="mt-2 text-sm text-zinc-600">
              라이선스/구독 비용 절감과 갱신 관리 체계화
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/experience"
            className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
          >
            Experience에서 상세 보기 →
          </Link>
        </div>
      </Section>
    </main>
  );
}
