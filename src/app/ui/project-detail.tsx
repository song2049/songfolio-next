import Link from "next/link";

type ProjectLinkSet = {
  github?: string;
  live?: string;
  docs?: string;
};

type Story = {
  problem: string[];
  decisions: string[];
  results: string[];
  learnings: string[];
};

export type ProjectDetailProps = {
  title: string;
  summary: string;
  outcomeLine?: string;
  period: string;
  role: string;
  stack: string[];
  highlights: string[];
  cover?: string;
  story: Story;
  links?: ProjectLinkSet;
  stats?: { label: string; value: string }[];
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

function Card({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700">
        {items.map((x, i) => (
          <li key={`${title}-${i}`} className="leading-relaxed">
            • {x}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
    >
      {label} →
    </Link>
  );
}

export function ProjectDetail({
  title,
  summary,
  outcomeLine,
  stats,
  period,
  role,
  stack,
  highlights,
  cover,
  story,
  links,
}: ProjectDetailProps) {
  return (
    <div className="space-y-6">
      {/* Hero */}
                  {links ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {links.github ? <LinkButton href={links.github} label="GAS V1 Site 보기" /> : null}
                {links.live ? <LinkButton href={links.live} label="GAS V2 Site 보기" /> : null}
                {links.docs ? <LinkButton href={links.docs} label="Docs" /> : null}
              </div>
            ) : null}
      <header className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm leading-relaxed text-zinc-600">{summary}</p>
            {outcomeLine ? (
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-semibold text-zinc-900">Outcome</div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-700">{outcomeLine}</p>
              </div>
            ) : null}

            {stats && stats.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {stats.map((s) => (
                  <span
                    key={`${s.label}-${s.value}`}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700"
                  >
                    <span className="font-semibold text-zinc-900">{s.label}</span>
                    <span className="text-zinc-600">{s.value}</span>
                  </span>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Pill>{period}</Pill>
              <Pill>{role}</Pill>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {stack.slice(0, 12).map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>


          </div>

          {cover ? (
            <div className="w-full md:w-[360px]">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                {/* next/image로 바꿔도 OK */}
                <img
                  src={cover}
                  alt={`${title} cover`}
                  className="h-[220px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {/* Highlights */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Highlights</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          {highlights.map((x, i) => (
            <li key={`h-${i}`} className="leading-relaxed">
              • {x}
            </li>
          ))}
        </ul>
      </section>

      {/* Story */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Card title="Problem" items={story.problem} />
          <Card title="Key decisions" items={story.decisions} />
          <Card title="Results" items={story.results} />
          <Card title="Learnings" items={story.learnings} />
        </div>

        <aside className="space-y-4">
          <Link
            href="/projects"
            className="block rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            ← Back to Projects
          </Link>      
        </aside>
      </div>
      {/* Related Experience */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Related Experience</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          이 프로젝트는 실제 업무 경험과 학습 과정에서 정리한 문제를 바탕으로,
          운영 구조를 설계하고 구현해본 결과물입니다.      
        </p>
      </section>

    </div>

  );
}
