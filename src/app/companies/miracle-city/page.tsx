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

export default function MiracleCityCompanyPage() {
  const companyKey = "miracle-city";
  const companyName = "Miracle City World Group";
  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);

  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10);

  return (
    <main>
      <Section
        title={companyName}
        description="총무·시설·구매·IT 운영을 상주 형태로 지원하며, 반복 업무를 표준화 관점으로 정리해 운영 기반을 만든 경험"
      >
        <Container>
          {/* 상단 요약 카드 (기존 템플릿 유지 목적: 핵심 내용만 넣어둠) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  총무/운영 · (2024.04 – 2025.03)
                </div>
                {/* ✅ 리스크 방지: 법인/조직을 굳이 노출하지 않되, 형태는 명확히 */}
                <div className="mt-1 text-xs text-zinc-500">
                  그룹 운영 프로젝트 형태로 상주하며 총무·시설·구매·IT 운영을 지원/전담
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
                <div className="text-sm font-semibold">What I did</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>자산/장비 운영(재고, 지급·회수, 이력/현황 업데이트)</Bullet>
                  <Bullet>소프트웨어 구독/갱신 관리(만료/결제/증빙)</Bullet>
                  <Bullet>시설/안전 운영(점검, 협력사 대응, 출입/공용설비 관리)</Bullet>
                  <Bullet>구매/계약 운영(비교견적, 발주, 납기·정산 관리)</Bullet>
                  <Bullet>사내·외 행사 운영 지원(기획안 검토, 실행 조율)</Bullet>
                  <Bullet>업무 표준화(요청 양식, 체크리스트, 운영 기준 정리)</Bullet>
                  <Bullet>협업 부서/업체 커뮤니케이션(일정/비용/납기)</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>운영 데이터가 쌓여야 “인수인계/지속 운영”이 가능</Bullet>
                  <Bullet>반복 업무를 표준화해 담당자 의존도를 낮춤</Bullet>
                  <Bullet>업무를 시스템으로 전환하기 위한 핵심 요구사항을 정의</Bullet>
                </ul>
              </div>
            </div>
          </div>

          {/* Work Photos Preview */}
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

            <p className="mt-2 text-xs text-zinc-600">
              현장 사진이 제한적일 수 있어, 아래 Evidence로 프로세스/산출물을 함께 증빙합니다.
            </p>
          </div>

          {/* Evidence */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-4">
              <EvidenceCard
                title="자산/장비 운영"
                points={[
                  "재고/현황 업데이트(사용자/부서 기준 관리)",
                  "지급·회수 및 이관 흐름 지원",
                  "자산 실사/상태 점검 및 정리",
                ]}
              />
              <EvidenceCard
                title="구독/갱신 관리"
                points={[
                  "만료/갱신 일정 체크 및 누락 방지",
                  "결제/증빙 서류 정리",
                  "사용 현황 기반 좌석/계정 운영 지원",
                ]}
              />
              <EvidenceCard
                title="표준화/문서화"
                points={[
                  "요청 양식/체크리스트 정리",
                  "반복 업무 템플릿화",
                  "운영 기준 공유로 담당자 의존도 감소",
                ]}
              />
              <EvidenceCard
                title="총무·시설·구매 운영"
                points={[
                  "법인차량/렌탈 계약 운영 및 정산",
                  "시설 점검·AS 접수 및 협력사 커뮤니케이션",
                  "비교견적 기반 발주/납기/정산 프로세스 운영",
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
                현재는 회사-프로젝트 매칭을 반영하지 않았습니다. (추후 연결 예정)
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
