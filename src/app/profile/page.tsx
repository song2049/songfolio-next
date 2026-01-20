// src/app/profile/page.tsx
import Link from "next/link";
import { Container } from "../ui/container";
import { Section } from "../section";
import { credentials, education, skillGroups } from "../lib/data/profile";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
      {children}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-zinc-900">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main>
      <Section title="Profile" description="학력, 자격/수상, 스킬을 한 페이지로 정리했습니다.">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Education */}
            <Card title="학력">
              <ul className="space-y-3">
                {education.map((e) => (
                  <li key={e.name} className="text-sm">
                    <div className="font-medium text-zinc-900">{e.name}</div>
                    <div className="text-zinc-600">{[e.major, e.period].filter(Boolean).join(" · ")}</div>
                    {e.note && <div className="text-xs text-zinc-500">{e.note}</div>}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Credentials */}
            <Card title="자격 · 수상">
              <ul className="space-y-3">
                {credentials.map((c) => (
                  <li key={c.name} className="text-sm">
                    <div className="font-medium text-zinc-900">{c.name}</div>
                    <div className="text-zinc-600">{[c.org, c.date].filter(Boolean).join(" · ")}</div>
                    {c.note && <div className="text-xs text-zinc-500">{c.note}</div>}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Skills */}
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

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/experience"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Experience →
            </Link>
            <Link
              href="/companies"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Companies →
            </Link>
            <Link
              href="/projects?mode=featured"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Projects →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
