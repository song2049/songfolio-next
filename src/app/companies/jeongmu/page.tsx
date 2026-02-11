import Link from "next/link";
import React from "react";
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

export default function JeongmuCompanyPage() {
  const companyKey = "jeongmu";
  const companyName = "Jeongmu Real Estate Group";
  const companyProjects = projects.filter((p: any) => p.company?.key === companyKey);

  const photos = getCompanyWorkPhotos(companyKey).slice(0, 10);

  return (
    <main>
      <Section
        title={companyName}
        description="시설관리 중심의 사업장 운영, 임대차/계약 실무, OA·비품 세팅 및 현장 이슈 대응 경험"
      >
        <Container>
          {/* 상단 요약 카드 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Role</div>
                <div className="mt-1 text-sm text-zinc-600">
                  인사총무 · (2017.07 – 2020.07)
                </div>
                {/* ✅ 추가: 역할 범위 한 줄 요약 (내용 유지, 키워드만 정리) */}
                <div className="mt-1 text-xs text-zinc-500">
                  사업장 세팅/운영 · 시설/비품/OA · 임대차/계약 · 차량/대외 커뮤니케이션
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

            {/* ✅ 추가: 임팩트 한 줄 (정무=시설/운영 성격에 맞춤) */}
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              현장 이슈를 “즉시 처리”로 끝내지 않고, 기준/문서/체크리스트로 남겨 운영 품질을 안정화했습니다.
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">What I did</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>시설/비품/OA 세팅 및 사업장 운영 실무</Bullet>
                  <Bullet>임대차/계약/차량/대외 커뮤니케이션 등 총무 전반 운영</Bullet>
                  <Bullet>현장 이슈 대응 및 운영 프로세스 정리</Bullet>
                  <Bullet>업무 흐름을 표준화하기 위한 문서/체크리스트 정리</Bullet>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Why it matters</div>
                <ul className="mt-3 space-y-2">
                  <Bullet>시설/현장 중심 운영 경험이 “실행력/문제 해결”의 기반이 됨</Bullet>
                  <Bullet>표준화가 없으면 운영이 담당자 경험에 종속된다는 문제 체감</Bullet>
                  <Bullet>이후 시스템화(GAS)로 연결되는 사고방식 형성</Bullet>
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
              사진은 제한적일 수 있어, 아래 Evidence로 업무 범위/프로세스를 함께 증빙합니다.
            </p>
          </div>

          {/* Evidence */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold">Evidence</div>
            <div className="grid gap-4 md:grid-cols-3">
              <EvidenceCard
                title="사업장 운영"
                points={[
                  "시설/공간 운영 지원 및 현장 이슈 대응",
                  "비품/소모품 관리 및 재고 운영",
                  "업무 환경 세팅(OA/가구/좌석) 지원",
                  // ✅ 추가: 결과형 한 줄 (과장 X, 방향만)
                  "현장 대응 기준/흐름을 정리해 혼선과 누락을 줄임",
                ]}
              />
              <EvidenceCard
                title="임대차/계약/차량/대외"
                points={[
                  "임대차/계약 관련 문서/업체 커뮤니케이션",
                  "차량 운영/정비/관리 흐름 지원",
                  "대외 요청 대응 및 일정/비용 정리",
                  // ✅ 추가: 결과형 한 줄
                  "요청 내용을 문서·일정·비용 기준으로 정리해 누락을 줄임",
                ]}
              />
              <EvidenceCard
                title="표준화/문서화"
                points={[
                  "반복 업무 체크리스트/양식 정리",
                  "업무 흐름을 문서로 남겨 인수인계 가능하게",
                  "운영 기준 정리로 업무 품질 안정화",
                  // ✅ 추가: 결과형 한 줄
                  "담당자 변경/부재 시에도 운영 공백을 최소화",
                ]}
              />
            </div>
          </div>

          {/* Related Projects */}
          {companyProjects.length > 0 ? (
            <div className="mt-8">
              <div className="mb-3 text-sm font-semibold">Related Projects</div>
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
            </div>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
