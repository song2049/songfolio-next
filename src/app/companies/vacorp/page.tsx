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

function StatCard({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-xs font-semibold text-zinc-500">{label}</div>
      <div className="mt-1 text-base font-semibold text-zinc-900">{value}</div>
      <p className="mt-1 text-xs leading-relaxed text-zinc-600">{desc}</p>
    </div>
  );
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
        description="자산·라이선스·벤더 운영을 ‘사람 의존’에서 ‘구조 기반’으로 전환한 경험"
      >
        <Container>
          {/* ✅ 1) Company Header (Role/Period/CTA만) */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  IT / 자산·라이선스 운영 (2022.09–2024.03)
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-700">
                  약 50종 라이선스와 25개 벤더 운영을 2023년 2.5억 예산 기준으로 정리하고,
                  갱신 리스크(약 7천만원)를 관리 가능한 체계로 표준화했습니다.
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/experience"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Experience →
                </Link>
                <Link
                  href="/companies"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Companies →
                </Link>
              </div>
            </div>
          </div>

          {/* ✅ 2) Key Outcomes Strip (숫자 스트립) */}
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <StatCard
              label="Licenses"
              value="약 50종"
              desc="운영 라이선스 포트폴리오"
            />
            <StatCard
              label="Vendors"
              value="약 25곳"
              desc="벤더 커뮤니케이션/계약·견적 관리"
            />
            <StatCard
              label="2023 Budget"
              value="2.5억원"
              desc="연간 예산 운영 및 최적화"
            />
            <StatCard
              label="Renewal 예정"
              value="약 7천만원"
              desc="갱신 예정 금액/일정 리스크 관리"
            />
            <StatCard
              label="Asset Audit"
              value="약 6~7천대"
              desc="합병 이후 전사 IT/HW 자산 실사 및 대장 정합성 정리"
            />
          </div>

          {/* ✅ 3) What I did / Why it matters (2컬럼, 기존 톤 유지) */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">What I did</div>
              <ul className="mt-3 space-y-2">
                <Bullet>소프트웨어 라이선스/구독 운영(갱신, 좌석, 비용, 계약, 증빙)</Bullet>
                <Bullet>구매 프로세스 운영(요청 접수 → 견적/협의 → 결제/증빙)</Bullet>
                <Bullet>벤더 관리(일정/계약/갱신 조건/요율 커뮤니케이션)</Bullet>
                <Bullet>자산/장비 운영(지급·회수, 이력/현황 업데이트, 재배치)</Bullet>
                <Bullet>운영 프로세스 템플릿화(요청 양식, 체크리스트, 기준 문서)</Bullet>
                <Bullet>합병 이후 총 자산 규모(약 6~7천대) 관점에서 정합성/운영 기준 정리</Bullet>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Why it matters</div>
              <ul className="mt-3 space-y-2">
                <Bullet>비용/갱신/좌석이 “사람 기억”에 의존하면 누수가 발생</Bullet>
                <Bullet>대규모 운영은 기준·흐름·증빙(로그)이 없으면 인수인계가 불가능</Bullet>
                <Bullet>운영 리스크를 줄이려면 “프로세스”를 데이터 구조로 고정해야 함</Bullet>
              </ul>
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
              사진은 제한적일 수 있어, 아래 Evidence로 업무의 실체(프로세스/산출물)를 함께 증빙합니다.
            </p>
          </div>

          {/* Evidence */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-4">
              <EvidenceCard
                title="라이선스/구독 운영"
                points={[
                  "갱신 일정(만료/결제/증빙) 관리 및 누락 방지",
                  "좌석(Seat) 최적화: 미사용 회수/재배치",
                  "비용 현황 정리 및 예산/정산 지원",
                ]}
              />
              <EvidenceCard
                title="자산/장비 운영"
                points={[
                  "지급·회수 프로세스 운영 및 이력 관리",
                  "재고/현황 업데이트(부서/사용자 단위)",
                  "교체/폐기/이관 흐름 지원",
                ]}
              />
              <EvidenceCard
                title="벤더/구매 커뮤니케이션"
                points={[
                  "견적/계약/납기 커뮤니케이션 및 리스크 관리",
                  "구매 채널/결제 방식 기준화",
                  "문서/체크리스트 기반 운영 안정화",
                ]}
              />
              <EvidenceCard
                title="자산 실사 / 대장 정합성"
                points={[
                  "본사·스튜디오 대상 IT/HW 자산 실사 직접 수행",
                  "장부·실물 대조를 통해 누락/중복/미확인 자산 식별",
                  "합병 이후 전사 기준으로 자산 수량 및 소유 정합성 정리",
                  "약 6~7천대 자산 기준으로 관리 대상 범위 확정",
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
