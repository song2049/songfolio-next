"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Section } from "../section";
import { Container } from "../ui/container";
import { beforeYouAsk } from "../lib/data/before-you-ask";

const PREVIEW_COUNT = 2;

export function BeforeYouAsk() {
  // ✅ Section이 ref/id를 못 받으니 wrapper div에 ref를 건다
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  // 화면에 보여줄 목록: 기본은 상위 3개, 펼치면 전체
  const visibleItems = useMemo(() => {
    return expanded ? beforeYouAsk : beforeYouAsk.slice(0, PREVIEW_COUNT);
  }, [expanded]);

  // 더보기 클릭으로 펼쳤을 때: 섹션 상단으로 자연스럽게 스크롤
  useEffect(() => {
    if (!expanded) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [expanded]);

  return (
    // ✅ id/ref는 wrapper로
    <div id="before-you-ask" ref={sectionRef}>
      <Section>
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-zinc-900">Before You Ask</h2>
            <p className="mt-3 text-sm text-zinc-600">
            저는 지원 전에 회사의 사업과 구조, 제가 기여할 수 있는 역할을 먼저 봅니다.
            순간적인 말재주보다는 업무의 구조를 만들고 결과로 증명하는 방식에 익숙하며,
            면접 역시 실제 업무 상황을 기준으로 대화를 나누고 싶습니다.

            아래 Q&A는 그 기준을 정리한 내용입니다.
            </p>
          </div>

          <div className="space-y-3">
            {visibleItems.map((qa, i) => (
              <details
                key={qa.title}
                // expanded=false일 때는 전부 open(3개만 보여서 펼쳐둬도 부담 없음)
                // expanded=true일 때는 첫 3개만 open
                open={expanded ? i < 2 : true}
                className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900">
                      {qa.title}
                    </div>
                    {qa.subtitle ? (
                      <div className="mt-1 text-xs text-zinc-500">
                        {qa.subtitle}
                      </div>
                    ) : null}
                  </div>

                  <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="mt-3">
                  {/* ✅ 모바일: 기본 줄임 / ✅ md 이상: 전체 / ✅ open 시: 전체 */}
                  <p className="text-sm leading-relaxed text-zinc-700 line-clamp-4 md:line-clamp-none group-open:line-clamp-none">
                    {qa.answer}
                  </p>

                  {/* 모바일에서만, 닫혀있을 때 힌트 */}
                  <div className="mt-3 text-xs text-zinc-500 md:hidden group-open:hidden">
                    더 보기
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* ✅ “더보기/접기” 버튼 */}
          {beforeYouAsk.length > PREVIEW_COUNT && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setExpanded((v) => {
                    const next = !v;

                    // 접을 때는 섹션 상단으로 다시 올려주면 UX 깔끔
                    if (v === true && next === false) {
                      requestAnimationFrame(() => {
                        sectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      });
                    }

                    return next;
                  });
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
              >
                {expanded ? "Q&A 접기" : "Q&A 더보기"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
