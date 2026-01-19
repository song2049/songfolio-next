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

export default function VacorpCompanyPage() {
  const companyKey = "vacorp";
  const companyName = "VA Corporation";
  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);

  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10);

  return (
    <main>
      <Section
        title={companyName}
        description="라이선스/자산 운영을 표준화하고, 비용/갱신/지급·회수 흐름을 구조화한 경험"
      >
        <Container>
          {/* 상단 요약 카드 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  총무/IT 운영 · (기간은 실제 값으로 유지)
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

            {/* ✅ 네가 이미 넣어둔 VACorp Key Outcomes(21종/1억/2.4억) 반영 */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Key Outcomes</div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="text-xs font-semibold text-zinc-900">Catalog</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">21종</div>
                    <p className="mt-1 text-sm text-zinc-600">운영 대상(도구/솔루션) 표준 목록화</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="text-xs font-semibold text-zinc-900">Savings</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">1억</div>
                    <p className="mt-1 text-sm text-zinc-600">비용 절감/최적화 성과</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="text-xs font-semibold text-zinc-900">Budget</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900">2.4억</div>
                    <p className="mt-1 text-sm text-zinc-600">연간/기간 예산 규모 운영</p>
                  </div>
                </div>

                <div className="mt-5 text-sm font-semibold">What I did</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>소프트웨어 라이선스/구독 관리(갱신, 좌석, 비용, 계약)</Bullet>
                  <Bullet>자산/장비 운영(지급·회수, 이력/현황 업데이트)</Bullet>
                  <Bullet>구매/정산/벤더 커뮤니케이션(견적, 계약, 일정)</Bullet>
                  <Bullet>운영 프로세스 템플릿화(요청 양식, 체크리스트, 기준 정리)</Bullet>
                  <Bullet>부서/구성원 단위 사용 현황 가시화 및 보고 지원</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>비용/갱신/좌석을 데이터로 관리해야 운영 리스크가 줄어듦</Bullet>
                  <Bullet>담당자 의존을 줄이기 위해 “기준/흐름/로그”가 필요</Bullet>
                  <Bullet>GAS(자산관리 시스템) 설계의 직접적인 문제의식이 된 경험</Bullet>
                </ul>
              </div>
            </div>
          </div>

          {/* ✅ Work Photos Preview (A안 복제) */}
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
              첨부된 사진 1장 + 한 줄 설명 기반으로, 현장감 있는 “Proof”를 제공합니다.
            </p>
          </div>

          {/* ✅ Evidence (증빙 강화) */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-3">
              <EvidenceCard
                title="라이선스/구독 운영"
                points={[
                  "갱신 일정 관리(만료/결제/증빙) 및 누락 방지",
                  "좌석(Seat) 최적화: 미사용 회수/재배치",
                  "비용 현황 정리 및 예산/정산 지원",
                ]}
              />
              <EvidenceCard
                title="자산/장비 운영"
                points={[
                  "지급·회수 프로세스 표준화 및 이력 관리",
                  "재고/현황 업데이트(부서/사용자 단위)",
                  "장비 교체/폐기/이관 흐름 지원",
                ]}
              />
              <EvidenceCard
                title="벤더/구매 커뮤니케이션"
                points={[
                  "견적/계약/납기 커뮤니케이션 및 리스크 관리",
                  "구매 채널/결제 방식 표준화",
                  "문서/체크리스트 기반 운영 안정화",
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
