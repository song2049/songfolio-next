// src/app/companies/page.tsx

import Link from "next/link";
import { Section } from "../section";
import { Container } from "../ui/container";
import { companies } from "../lib/data/companies";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-zinc-200 bg-white/70 px-2 py-0.5 text-[11px] text-zinc-700 backdrop-blur">
      {children}
    </span>
  );
}

export default function CompaniesPage() {
  return (
    <main>
      <Section title="Companies" description="회사별 경력(업무 내용)을 한 페이지로 정리했습니다.">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {companies.map((c) => (
              <Link
                key={c.key}
                href={c.href}
                className="surface rounded-3xl p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">{c.name}</div>
                    <div className="mt-1 text-xs text-zinc-600">
                      {c.period} · {c.roleLine}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">View →</div>
                </div>

                <p className="mt-3 text-sm text-zinc-700 leading-relaxed">{c.oneLiner}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.slice(0, 6).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/projects"
              className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm backdrop-blur hover:bg-white"
            >
              Projects로 →
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm backdrop-blur hover:bg-white"
            >
              Experience로 →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
