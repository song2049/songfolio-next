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

function EvidenceCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
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

export default function NHNCompanyPage() {
  const companyKey = "nhn";
  const companyName = "NHN (Naver / NHN 계열)";
  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);

  // 사진 1장이어도 WorkCarousel은 동작함(센터만 보여줌)
  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10);

  return (
    <main>
      <Section
        title={companyName}
        description="대규모 IT 조직 환경에서 총무·IT 운영의 기본기를 체계적으로 쌓은 경험"
      >
        <Container>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  IT 총무 · 정규직 (2014.08–2017.01)
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
                <div className="mb-5">
                  <div className="text-sm font-semibold">Key Outcomes</div>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-xs font-semibold text-zinc-900">Scale</div>
                      <div className="mt-1 text-lg font-semibold text-zinc-900">대규모 조직</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        수백 명 단위 조직 환경에서 표준 IT 운영 경험
                      </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-xs font-semibold text-zinc-900">Operations</div>
                      <div className="mt-1 text-lg font-semibold text-zinc-900">전사 IT 지원</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        장비·계정·자산 조사 및 운영 지원
                      </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-xs font-semibold text-zinc-900">Process</div>
                      <div className="mt-1 text-lg font-semibold text-zinc-900">운영 기본기</div>
                      <p className="mt-1 text-sm text-zinc-600">
                        입·퇴사 지급/회수, 장애 대응, 회선/네트워크 운영
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold">What I did</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>임직원 전산 장비(OS 재설치, 노후 PC 교체) 운영</Bullet>
                  <Bullet>사내 네트워크/회선 관리 및 IT 장애 대응</Bullet>
                  <Bullet>전산 장비·소프트웨어 자산 조사 및 입·출고 관리</Bullet>
                  <Bullet>신규 입·퇴사자 장비 지급/회수 프로세스 운영</Bullet>
                  <Bullet>회의실·복지공간·좌석 배치 관리</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>
                    대규모 IT 조직에서 “표준 운영”과 “자산 관리 체계”의 중요성을 체감
                  </Bullet>
                  <Bullet>
                    단순 지원이 아닌, 운영 흐름과 기준이 있어야 시스템이 유지된다는 인식 형성
                  </Bullet>
                  <Bullet>
                    이후 자산관리 시스템(GAS) 설계의 기초 사고방식이 된 경험
                  </Bullet>
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
              사진은 제한적일 수 있어, 아래 Evidence로 업무의 실체(프로세스/산출물)를 함께 증빙합니다.
            </p>
          </div>

          {/* ✅ Evidence (증빙 강화) */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-3">
              <EvidenceCard
                title="자산/장비 운영"
                points={[
                  "자산 실사(리스트 대조, 상태 점검, 라벨링) 수행",
                  "지급·회수 및 재배치(좌석/부서 이동) 지원",
                  "입·출고 흐름 정리 및 현황 업데이트",
                ]}
              />
              <EvidenceCard
                title="계정/권한/온보딩"
                points={[
                  "신규 입사자 장비 세팅 및 지급 프로세스 운영",
                  "계정 발급/회수, 권한 요청 흐름 지원",
                  "기본 가이드/체크리스트 기반으로 운영 안정화",
                ]}
              />
              <EvidenceCard
                title="장애 대응/네트워크"
                points={[
                  "IT 이슈 접수 → 1차 분류 → 조치/에스컬레이션 운영",
                  "사내 회선/네트워크 이슈 대응 지원",
                  "재발 방지 관점의 운영 기준 정리",
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
