import Link from "next/link";
import { projects } from "../lib/data/projects";
import { Container } from "../ui/container";
import { Section } from "../section";
import { ProjectCard } from "../ui/project-card";

export default function ProjectsPage() {
  return (
    <main>
      <Section
        title="Projects"
        description="정적 데이터 기반으로, 설계 의도가 보이게 정리했습니다."
      >
        <div className="grid gap-4">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              summary={p.summary}
              period={p.period}
              stack={p.stack}
              href={`/projects/${p.slug}`}
              cover={p.cover}
            />
          ))}
        </div>
      </Section>

      <section className="py-10">
        <Container>
          <Link
            href="/"
            className="text-sm underline decoration-zinc-200 hover:decoration-zinc-400"
          >
            ← 홈으로
          </Link>
        </Container>
      </section>
    </main>
  );
}
