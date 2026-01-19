import { projects } from "../lib/data/projects";
import { Section } from "../section";
import { ProjectCard } from "../ui/project-card";

export default function FeaturedPage() {
  const featured = projects.filter((p: any) => p.featured);

  return (
    <main>
      <Section
        title="Featured Projects"
        description="실무 경험을 일반화해, 특정 조직에 의존하지 않는
‘지식 기반 시스템’으로 설계한 대표 프로젝트입니다.
"
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
