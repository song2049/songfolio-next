import Link from "next/link";
import { projects } from "../lib/data/projects";
import { Section } from "../section";
import { Container } from "../ui/container";

type CompanyItem = { key: string; name: string; count: number };

export default function CompaniesPage() {
  const map = new Map<string, CompanyItem>();

  for (const p of projects as any[]) {
    const key = p.company?.key as string | undefined;
    const name = p.company?.name as string | undefined;
    if (!key) continue;

    const prev = map.get(key);
    map.set(key, {
      key,
      name: name ?? key,
      count: (prev?.count ?? 0) + 1,
    });
  }

  const companies = Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));

  return (
    <main>
      <Section title="Companies" description="회사별 경험과 연결된 프로젝트를 한 번에 정리합니다.">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {companies.map((c) => (
              <Link
                key={c.key}
                href={`/companies/${c.key}`}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:bg-zinc-50"
              >
                <div className="text-sm font-semibold text-zinc-900">{c.name}</div>
                <div className="mt-2 text-sm text-zinc-600">
                  Related projects: <span className="font-semibold text-zinc-900">{c.count}</span>
                </div>
                <div className="mt-3 text-xs text-zinc-500">View company page →</div>
              </Link>
            ))}

            {companies.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                연결된 회사 데이터가 아직 없습니다. projects.ts에 company를 추가해 주세요.
              </div>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/projects"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Projects로 →
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Experience로 →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
