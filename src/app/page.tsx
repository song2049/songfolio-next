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

      {/* CAREER SNAPSHOT */}
      <Section
        title="Career Snapshot"
        description="회사별 핵심 역할을 짧게 보여주고, 상세는 회사 페이지에서 확인할 수 있습니다."
      >
        {/* ✅ 회사 카드만 4칸 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Miracle City */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">Miracle City World Group</div>
            <div className="mt-1 text-xs text-zinc-500">
              2024.04 ~ 2025.03 · General Affairs
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              자산/소프트웨어 운영과 갱신 관리, 업무 표준화 관점으로 시스템화 기반을 구축했습니다.
            </p>
            <div className="mt-4">
              <Link
                href="/companies/miracle-city"
                className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
              >
                회사/업무 상세 보기 →
              </Link>
            </div>
          </div>

          {/* VACORP */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">VA Corporation</div>
            <div className="mt-1 text-xs text-zinc-500">2022.09 ~ 2024.03 · IT</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              라이선스/자산 운영을 표준화하고 비용/갱신/지급·회수 흐름을 구조화했습니다.
            </p>
            <div className="mt-4">
              <Link
                href="/companies/vacorp"
                className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
              >
                회사/업무 상세 보기 →
              </Link>
            </div>
          </div>

          {/* Jeongmu */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">Jeongmu Real Estate Group</div>
            <div className="mt-1 text-xs text-zinc-500">2017.07–2020.07 · HR/GA</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              사업장 운영, 시설/OA 세팅, 계약 및 차량 운영 등 현장 중심 운영 업무를 수행했습니다.
            </p>
            <div className="mt-4">
              <Link
                href="/companies/jeongmu"
                className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
              >
                회사/업무 상세 보기 →
              </Link>
            </div>
          </div>

          {/* NHN */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">NHN / NAVER</div>
            <div className="mt-1 text-xs text-zinc-500">
              2014.08 ~ 2017.01 · 총무업무지원
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              IT 운영 기본기(자산/지급·회수/장애 대응)를 대규모 조직 환경에서 체득했습니다.
            </p>
            <div className="mt-4">
              <Link
                href="/companies/nhn"
                className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
              >
                회사/업무 상세 보기 →
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Experience 카드는 그리드 밖으로 */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">Experience (경력기술서)</div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            프로젝트의 근거가 되는 전체 업무 흐름/성과는 Experience에서 한 번에 확인할 수 있습니다.
          </p>
          <div className="mt-4">
            <Link
              href="/experience"
              className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
            >
              Experience 보기 →
            </Link>
          </div>
        </div>
      </Section>

      {/* ✅ PROOF: Section 중첩 제거 */}
      <Section title="Proof" description="경력기술서의 핵심을 포트폴리오 관점으로 요약했습니다.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">운영 표준화</div>
            <p className="mt-2 text-sm text-zinc-600">
              구매→등록→배포→회수/폐기까지 라이프 사이클로 운영 관리
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
    </main>
  );
}
