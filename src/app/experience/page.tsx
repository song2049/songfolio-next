import Link from "next/link";
import { Container } from "../ui/container";
import { Section } from "../section";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-zinc-700">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={i}>• {x}</li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <main>
      <Section
        title="Experience"
        description="총무 실무를 ‘운영 규칙·권한·데이터’로 구조화해 시스템으로 전환한 경험을 중심으로 정리했습니다."
      >
        <Container>
          {/* Intro */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold tracking-tight">
              Operations → System
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              자산/계정/라이선스 운영을 “사람이 기억하는 방식”이 아니라,
              표준화된 데이터와 프로세스로 재현 가능하게 만드는 것을 지향합니다.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Asset / License Ops</Pill>
              <Pill>RBAC / Audit Logs</Pill>
              <Pill>Procurement & Vendor</Pill>
              <Pill>Facility & Office Ops</Pill>
            </div>

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
            </div>
          </div>

          {/* Proof */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Cost optimization">
              <BulletList
                items={[
                  "소프트웨어 라이선스 비용 70% 이상 절감 경험",
                  "구매~등록~관리~매각까지 흐름을 체계화해 비용 효율화",
                ]}
              />
            </Card>

            <Card title="Asset scale & control">
              <BulletList
                items={[
                  "대규모 OA/IT 자산 운영 경험 (자산 수량 단위로 관리)",
                  "지급/반납을 신청서 기반으로 표준화하여 문서화와 추적성 강화",
                ]}
              />
            </Card>

            <Card title="Operational system mindset">
              <BulletList
                items={[
                  "업무를 ‘규칙/권한/흐름’으로 정의해 시스템 설계로 연결",
                  "배포/운영 환경까지 포함해 실제 서비스 관점으로 정리",
                ]}
              />
            </Card>
          </div>

          {/* Detailed Experience (portfolio-style) */}
          <div className="mt-6 space-y-4">
            <Card title="Miracle City World Group (2024.04–2025.03) | General Affairs">
              <BulletList
                items={[
                  "브랜드 디자인 및 사내 홈페이지 구축/운영(외주 없이 진행)",
                  "구매/전산장비/소프트웨어 관리 및 갱신 운영",
                  "시리얼 취합 → 자산번호 부여 → 등록 등 자산 전산화",
                  "OA 자산 규모: 법인 소유 250여 대 운영",
                ]}
              />
              <div className="mt-4">
                <Link
                  href="/projects/gas"
                  className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
                >
                  이 경험이 연결된 프로젝트: GAS 상세 보기 →
                </Link>
              </div>
            </Card>

            <Card title="Large-scale asset operations (portfolio highlight)">
              <BulletList
                items={[
                  "지급: 개인/부서 요청 → 신청서 품의 기반 지급으로 전환",
                  "반납: 반납 신청서 품의로 문서 보존 및 퇴사 전 결함/파손 사전 파악 용이",
                  "보유 자산 규모 예시: 사무/작업/서버 장비 2천여 대, 영상촬영 장비 500여 대, LED Wall 3500여 대",
                  "노후/불용 자산 매각/기부/폐기 프로세스(1차 임직원 판매 → 2차 복지기관 기부 → 3차 업체 폐기)",
                  "매각 결과 예시: 임직원 판매 약 600만 원, 기부 400만 원, 업체 매각/폐기 300만 원",
                ]}
              />
            </Card>

            <Card title="Jeongmu Real Estate Group (2017.07–2020.07) | HR/GA">
              <BulletList
                items={[
                  "사업장 신규 계약 및 확장/이전 관련 실무",
                  "지사 시설관리 및 OA 장비 세팅",
                  "법인차량 리스/구매/렌탈 관리 및 운행일지 취합",
                ]}
              />
            </Card>
          </div>

          {/* Next actions */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">Next</div>
            <p className="mt-2 text-sm text-zinc-600">
              Experience는 Featured Projects의 “근거(Proof)”로 작동합니다.
              다음 단계로, 각 Featured 프로젝트 상세 하단에 “연결된 경험” 블록을 붙여
              이 페이지로 점프되게 만들면 완성도가 크게 올라갑니다.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/featured"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Featured로 돌아가기 →
              </Link>
              <Link
                href="/"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Home →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
