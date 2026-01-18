import { projects } from "../lib/data/projects";
import { Section } from "../section";
import { ProjectCard } from "../ui/project-card";

export default function FeaturedPage() {
  const featured = projects.filter((p: any) => p.featured);

  return (
    <main>
      <Section
        title="Featured Projects"
        description="총무 업무를 시스템으로 전환한 사례 중심으로 정리했습니다."
      >
        <div className="grid gap-4">
          {featured.map((p: any) => (
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
      </Section>
    </main>
  );
}
