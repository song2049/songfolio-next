"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { projects } from "../lib/data/projects";
import { Section } from "../section";
import { Container } from "../ui/container";
import { ProjectCard } from "../ui/project-card";

type Mode = "featured" | "company" | "archive";

function pillClass(active: boolean) {
  return [
    "rounded-full border px-4 py-2 text-sm transition",
    active
      ? "border-zinc-900 bg-zinc-900 text-white"
      : "border-zinc-200 bg-white hover:bg-zinc-50",
  ].join(" ");
}

function chipClass(active: boolean) {
  return [
    "rounded-full border px-3 py-1 text-xs transition",
    active
      ? "border-zinc-900 bg-zinc-900 text-white"
      : "border-zinc-200 bg-white hover:bg-zinc-50",
  ].join(" ");
}

export default function ProjectsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const mode = (sp.get("mode") as Mode) || "featured";
  const company = sp.get("company") || "";

  const companies = useMemo(() => {
    const map = new Map<string, { key: string; name: string }>();
    for (const p of projects as any[]) {
      const key = p.company?.key as string | undefined;
      if (!key) continue;
      map.set(key, { key, name: p.company?.name ?? key });
    }
    return Array.from(map.values());
  }, []);

  const filtered = useMemo(() => {
    let list = [...(projects as any[])];

    if (mode === "featured") list = list.filter((p) => Boolean(p.featured));
    if (mode === "archive") list = list.filter((p) => Boolean(p.archive));

    if (company) list = list.filter((p) => p.company?.key === company);

    return list;
  }, [mode, company]);

  function setQuery(next: { mode?: Mode; company?: string }) {
    const params = new URLSearchParams(sp.toString());

    if (typeof next.mode !== "undefined") params.set("mode", next.mode);
    else if (!params.get("mode")) params.set("mode", "featured");

    if (typeof next.company !== "undefined") {
      if (next.company) params.set("company", next.company);
      else params.delete("company");
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <main>
      <Section
        title="Projects"
        description="Featured / Company / Archive 기준으로 프로젝트를 탐색할 수 있습니다."
      >
        <Container>
          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={pillClass(mode === "featured")}
                onClick={() => setQuery({ mode: "featured" })}
              >
                Featured
              </button>
              <button
                type="button"
                className={pillClass(mode === "company")}
                onClick={() => setQuery({ mode: "company" })}
              >
                Company
              </button>
              <button
                type="button"
                className={pillClass(mode === "archive")}
                onClick={() => setQuery({ mode: "archive" })}
              >
                Archive
              </button>

              {company ? (
                <button
                  type="button"
                  className="ml-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
                  onClick={() => setQuery({ company: "" })}
                  title="회사 필터 해제"
                >
                  Clear Company ✕
                </button>
              ) : null}
            </div>

            {/* Company chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-zinc-700">
                Company:
              </span>

              <button
                type="button"
                className={chipClass(!company)}
                onClick={() => setQuery({ company: "" })}
              >
                All
              </button>

              {companies.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={chipClass(company === c.key)}
                  onClick={() => setQuery({ company: c.key, mode: "company" })}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Result meta */}
            <div className="text-sm text-zinc-600">
              Showing{" "}
              <span className="font-semibold text-zinc-900">
                {filtered.length}
              </span>{" "}
              projects
              {company ? (
                <>
                  {" "}
                  for{" "}
                  <span className="font-semibold text-zinc-900">{company}</span>
                </>
              ) : null}
              {mode ? (
                <>
                  {" "}
                  in <span className="font-semibold text-zinc-900">{mode}</span>
                </>
              ) : null}
            </div>
          </div>

          {/* List */}
          <div className="mt-6 grid gap-4">
            {filtered.map((p: any) => (
              <ProjectCard
                key={p.slug}
                title={p.title}
                summary={p.summary}
                period={p.period}
                role={p.role}
                stack={p.stack}
                highlights={p.highlights}
                cover={p.cover}
                href={`/projects/${p.slug}`}
                badge={p.featured ? "Featured" : p.archive ? "Archive" : undefined}
              />
            ))}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                조건에 맞는 프로젝트가 없습니다. (필터를 해제해보세요)
              </div>
            ) : null}
          </div>

          {/* Bottom nav (optional) */}
          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Home →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
