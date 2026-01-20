// src/app/home/profile-section.tsx
type Education = {
  name: string;
  major?: string;
  period?: string;
};

type Credential = {
  name: string;
  date?: string;
  note?: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

const education: Education[] = [
  { name: "경기대학교", major: "호텔경영학과", period: "2021.08–2023.08" },
  { name: "학점은행제", major: "경영학", period: "2020.01–2021.08" },
  { name: "신동신정보산업고등학교", major: "정보처리전공", period: "2007.03–2010.02" },
];

const credentials: Credential[] = [
  { name: "소방안전관리자 1급", date: "2020.12" },
  { name: "자동차운전면허 1종 보통", date: "2010.12" },
  { name: "4종 무인 드론(3과정)", date: "2025.02" },
  { name: "일반경비원", date: "2014.03" },
  { name: "한국 911 수색 구조대", date: "2025.04", note: "기자 활동 포함(선택)" },
  { name: "블록체인기반 웹 풀스택 개발자", date: "2025.08", note: "교육 과정 진행 중" },
];

const skillGroups: SkillGroup[] = [
  { title: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "MySQL", "Prisma"] },
  { title: "Ops", items: ["AWS", "Nginx", "PM2"] },
  { title: "General Affairs", items: ["자산관리", "라이선스", "구매/계약", "벤더 관리", "임대 협상", "OA"] },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50">
      <div className="text-sm font-semibold text-zinc-900">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
      {children}
    </span>
  );
}

export function ProfileSection() {
  return (
    <section className="relative bg-zinc-50">
      {/* section rhythm */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200/80" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="relative">
            {/* header spotlight */}
            <div
              className="pointer-events-none absolute -inset-x-10 -top-10 h-36 opacity-60"
              style={{
                background:
                  "radial-gradient(520px circle at 0% 0%, rgba(0,0,0,0.06), transparent 60%)",
              }}
            />
            <h2 className="relative text-2xl font-semibold tracking-tight text-zinc-900">Profile</h2>
            <p className="relative mt-2 text-sm text-zinc-600">학력 · 자격/수상 · 스킬</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card title="학력">
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.name} className="text-sm">
                  <div className="font-medium text-zinc-900">{e.name}</div>
                  <div className="text-zinc-600">{[e.major, e.period].filter(Boolean).join(" · ")}</div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="자격 · 수상">
            <ul className="space-y-3">
              {credentials.map((c) => (
                <li key={c.name} className="text-sm">
                  <div className="font-medium text-zinc-900">{c.name}</div>
                  <div className="text-zinc-600">{c.date}</div>
                  {c.note && <div className="text-xs text-zinc-500">{c.note}</div>}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="스킬">
            <div className="space-y-4">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <div className="text-xs font-semibold text-zinc-600">{g.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
