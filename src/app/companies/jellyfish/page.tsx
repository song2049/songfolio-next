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

export default function JellyfishCompanyPage() {
  const companyKey = "jellyfish";
  const companyName = "Jellyfish Entertainment";
  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);

  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10);

  return (
    <main>
      <Section
        title={companyName}
        description="총무 전담 담당자로 OA 자산 250대, 법인차량 13대, 임대차·시설·구매 운영을 총괄하며 비용 구조를 개선하고 운영 체계를 정비했습니다."
      >
        <Container>
          {/* 상단 요약 카드 (기존 템플릿 유지 목적: 핵심 내용만 넣어둠) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  총무/운영 · (2024.04 – 2024.08)
                </div>
                {/* ✅ 리스크 방지: 법인/조직을 굳이 노출하지 않되, 형태는 명확히 */}
                <div className="mt-1 text-xs text-zinc-500">
                  총무/운영 담당으로 구매·시설·자산관리·임대차·차량  업무 전담
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
                  <Bullet>구매·자산·시설·임대차·법인차량 운영 전반 총괄</Bullet>
                  <Bullet>OA 자산 250대 관리 및 소프트웨어·전산 장비 구매/갱신</Bullet>
                  <Bullet>공급업체 비교견적 및 단가 조정 (구매 수수료 30% → 15% 절감)</Bullet>
                  <Bullet>법인차량 13대 계약·운행·정산 관리</Bullet>
                  <Bullet>사옥·사택·숙소 임대차 계약 및 시설 유지보수</Bullet>
                  <Bullet>소방·승강기 안전관리자 선임 및 정기 점검 수행</Bullet>
                  <Bullet>법정의무교육 60인 운영 및 환급 구조 검토</Bullet>
                  <Bullet>IT·OA 장애 대응 및 네트워크 이슈 해결</Bullet>
                  <Bullet>사내·외 행사 1회 운영 지원</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>자산·계약·차량·시설을 하나의 관리 단위로 통합해 인수인계 가능한 구조로 전환</Bullet>
                  <Bullet>비교견적·정산 기준을 명확히 해 비용 누수 구조 개선 (구매 수수료 30% → 15%)</Bullet>
                  <Bullet>구매·시설·차량 이슈를 단일 창구로 정리해 커뮤니케이션/처리 리드타임 단축</Bullet>
                  <Bullet>법정·안전 항목을 일정 기반 관리 체계로 운영해 리스크 최소화</Bullet>
                  <Bullet>운영 데이터를 정리해 향후 시스템화(GAS 기획)의 기반 확보</Bullet>
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
                title="자산·구매 운영"
                points={[
                  "OA 자산 250대 관리 (지급/회수/이력/현황)",
                  "공급업체 비교견적 및 단가 조정",
                  "구매 수수료 30% → 15% 절감",
                ]}
              />
              <EvidenceCard
                title="구독/갱신 관리"
                points={[
                  "소프트웨어 만료/갱신 일정 관리 및 누락 방지",
                  "결제/증빙/정산 서류 정리",
                  "사용 현황 기반 갱신/좌석 최적화 지원",
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
                title="시설·임대차·법인차량"
                points={[
                  "법인차량 13대 계약·정산 운영",
                  "사옥·사택·숙소 임대차 계약 관리",
                  "소방·승강기 안전관리자 선임 및 점검 수행",
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
         
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
