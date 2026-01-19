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
    active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white hover:bg-zinc-50",
  ].join(" ");
}

function smallPillClass(active: boolean) {
  return [
    "rounded-full border px-3 py-1 text-xs transition",
    active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white hover:bg-zinc-50",
  ].join(" ");
}

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const mode = (sp.get("mode") as Mode) || "featured";
  const company = sp.get("company") || "";

    // projects.ts에서 company.key가 miracle-city/jeongmu/nhn/vacorp 로 확장된 상태를 전제
const companies = useMemo(() => {
  const map = new Map<string, { key: string; name: string }>();

  for (const p of projects as any[]) {
    const key = p.company?.key as string | undefined;
    const name = p.company?.name as string | undefined;
    if (!key) continue;

    map.set(key, { key, name: name ?? key });
  }

  return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
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

    if (typeof next.mode !== "undefined") {
      params.set("mode", next.mode);
    } else if (!params.get("mode")) {
      params.set("mode", "featured");
    }

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
          {/* Top filters */}
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

            {/* Company chips (mode=company일 때 가시성 ↑, 그 외에도 company 필터 UX 유지) */}
            <div className="flex flex-wrap gap-2">
              <span className="mr-1 text-xs font-semibold text-zinc-700">Company:</span>
              <button
                type="button"
                className={smallPillClass(!company)}
                onClick={() => setQuery({ company: "" })}
              >
                All
              </button>
              {companies.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={smallPillClass(company === c.key)}
                  onClick={() => setQuery({ company: c.key, mode: "company" })}
                  title={`Filter: ${c.key}`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Result meta */}
            <div className="text-sm text-zinc-600">
              Showing <span className="font-semibold text-zinc-900">{filtered.length}</span> projects
              {company ? (
                <>
                  {" "}
                  for <span className="font-semibold text-zinc-900">{company}</span>
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
            {filtered.map((p: any) => {
              const companyKey = p.company?.key as string | undefined;
              const companyName = p.company?.name as string | undefined;

              // 카드 상단 badge는 “Featured/Archive”만 강조 (company는 아래 링크로)
              const badge = p.featured ? "Featured" : p.archive ? "Archive" : undefined;

              return (
                <div key={p.slug} className="relative">
                  <ProjectCard
                    title={p.title}
                    summary={p.summary}
                    period={p.period}
                    role={p.role}
                    stack={p.stack}
                    href={`/projects/${p.slug}`}
                    badge={badge}
                    cover={p.cover}
                    highlights={p.highlights}
                  />

                  {/* Company badge/link overlay (카드 아래 영역으로 자연스럽게) */}
                  {companyKey ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                        Company
                      </span>

                      <Link
                        href={`/companies/${companyKey}`}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
                        title="회사 페이지로 이동"
                      >
                        {companyName ?? companyKey} →
                      </Link>

                      {/* 빠른 필터 */}
                      <button
                        type="button"
                        onClick={() => setQuery({ company: companyKey, mode: "company" })}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
                        title="이 회사 프로젝트만 보기"
                      >
                        Filter
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                조건에 맞는 프로젝트가 없습니다. (필터를 해제해보세요)
              </div>
            ) : null}
          </div>

          {/* bottom nav */}
          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/featured"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Featured 페이지로 →
            </Link>
            <Link
              href="/companies"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Companies 페이지로 →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
