import { notFound } from "next/navigation";
import { projects } from "../../lib/data/projects";
import { Section } from "../../section";
import { Container } from "../../ui/container";
import { ProjectDetail } from "../../ui/project-detail";
import Link from "next/link";

function LinkBadge({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700 hover:bg-zinc-50"
    >
      {children}
    </Link>
  );
}
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-700">
      {children}
    </span>
  );
}

type Params = { slug: string };

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const { slug } = await Promise.resolve(params);

  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <main>
      <Section title={p.title} description={p.summary}>
        <Container>
          <div className="mb-4 flex flex-wrap gap-2">
            {p.featured ? <LinkBadge href="/featured">Featured</LinkBadge> : <Badge>Archive</Badge>}
            {p.company?.key && p.company?.name ? (
              <LinkBadge href={`/companies/${p.company.key}`}>Company: {p.company.name}</LinkBadge>
            ) : null}
          </div>

          <ProjectDetail
            title={p.title}
            summary={p.summary}
            outcomeLine={p.outcomeLine}
            stats={p.stats}
            period={p.period}
            role={p.role}
            stack={p.stack}
            highlights={p.highlights}
            cover={p.cover}
            story={p.story}
            links={p.links}
          />
        </Container>
      </Section>
    </main>
  );
}
