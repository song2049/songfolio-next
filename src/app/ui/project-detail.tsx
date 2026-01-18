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
  period: string;
  role: string;
  stack: string[];
  highlights: string[];
  cover?: string;
  story: Story;
  links?: ProjectLinkSet;
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
      <header className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm leading-relaxed text-zinc-600">{summary}</p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Pill>{period}</Pill>
              <Pill>{role}</Pill>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {stack.slice(0, 12).map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            {links ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {links.github ? <LinkButton href={links.github} label="GitHub" /> : null}
                {links.live ? <LinkButton href={links.live} label="Live" /> : null}
                {links.docs ? <LinkButton href={links.docs} label="Docs" /> : null}
              </div>
            ) : null}
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

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm">
            <div className="font-medium text-zinc-900">Tip</div>
            <p className="mt-2 leading-relaxed">
              Results 섹션에 “전/후 비교”나 “수치(예: 시간 30% 단축)”가 들어가면 설득력이 확 올라가.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
