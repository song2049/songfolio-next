import Link from "next/link";
import { projects } from "../../lib/data/projects";
import { Section } from "../../section";
import { Container } from "../../ui/container";
import { ProjectCard } from "../../ui/project-card";
import { getCompanyWorkPhotos } from "../../lib/data/work-photos";
import { WorkCarousel } from "../../ui/work-carousel";

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="text-sm leading-relaxed text-zinc-700">• {children}</li>;
}

function EvidenceCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2">
        {points.map((t, i) => (
          <li key={i} className="text-sm text-zinc-700">
            • {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KgaCompanyPage() {
  const companyKey = "kga";
  const companyName = "경일게임IT아카데미";

  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);
  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10); // 현재 데이터 없으면 빈 배열이어도 OK

  return (
    <main>
      <Section
        title={companyName}
        description="프로젝트 기반 학습에서 요구사항 정의→구현→배포까지 경험을 구조화한 과정"
      >
        <Container>
          {/* 상단 요약 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Focus</div>
                <div className="mt-1 text-sm text-zinc-600">
                  팀/개인 프로젝트 진행 · 프론트/백엔드 구조화 · 배포/운영 감각
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/experience"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Experience →
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  All Projects →
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">What I built</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>요구사항을 화면/데이터로 분해해 기능 단위로 구현</Bullet>
                  <Bullet>개인/기업 등 사용자 타입에 따른 플로우 분리</Bullet>
                  <Bullet>Next.js 기반 라우팅/컴포넌트 구조 정리</Bullet>
                  <Bullet>프로젝트 문서화(기획/화면/정의서)와 연결</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>“구현”뿐 아니라 “구조화/문서화”가 실무에서 핵심</Bullet>
                  <Bullet>프로젝트를 포트폴리오로 전환하는 기준(문제-결정-결과)</Bullet>
                  <Bullet>이 경험이 GAS/SpoonMate 같은 운영형 시스템 설계로 연결</Bullet>
                </ul>
              </div>
            </div>
          </div>

          {/* Work Photos */}
          <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold">Work Photos</div>
              <Link
                href={`/companies/${companyKey}/photos`}
                className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
              >
                View all photos →
              </Link>
            </div>

            <WorkCarousel photos={photos} maxPhotos={10} />
          </div>

          {/* Evidence */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-3">
              <EvidenceCard
                title="문제 정의"
                points={[
                  "요구사항을 기능/화면/데이터로 쪼개서 명확화",
                  "사용자 유형별 입력/동선을 분리",
                  "우선순위(필수/선택) 기준으로 범위 관리",
                ]}
              />
              <EvidenceCard
                title="구조 설계"
                points={[
                  "라우팅/컴포넌트 책임 분리",
                  "재사용 가능한 UI 단위로 추출",
                  "데이터 타입 정의로 화면 일관성 확보",
                ]}
              />
              <EvidenceCard
                title="완성도"
                points={[
                  "프로젝트 결과를 포트폴리오 형태로 정리",
                  "문서(기획/정의서/회고)를 링크로 연결",
                  "다음 단계(고도화/배포) 계획 수립",
                ]}
              />
            </div>
          </div>

          {/* Related Projects */}
          <div className="mt-8">
            <div className="mb-3 text-sm font-semibold">Related Projects</div>
            {companyProjects.length > 0 ? (
              <div className="grid gap-4">
                {companyProjects.map((p: any) => (
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
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                아직 kga로 연결된 프로젝트가 없습니다. projects.ts에 company: {"{ key: \"kga\", name: \"경일게임IT아카데미\" }"} 추가하면 자동 연결됩니다.
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
