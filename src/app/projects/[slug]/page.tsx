import { notFound } from "next/navigation";
import { projects } from "../../lib/data/projects";
import { Section } from "../../section";
import { Container } from "../../ui/container";
import { ProjectDetail } from "../../ui/project-detail";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <main>
      <Section
        title="Project Detail"
        description="Problem → decisions → results → learnings"
      >
        <Container>
          <ProjectDetail
            title={p.title}
            summary={p.summary}
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
