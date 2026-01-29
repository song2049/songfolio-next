"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";

type Step = { text: string; holdMs: number };

const STORAGE_KEY = "songfolio_intro_seen_v1";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function useQueryIntroDisabled() {
  const sp = useSearchParams();
  const v = sp.get("intro");
  return v === "false" || v === "0";
}

export function IntroOverlay({
  onDone,
  force,
}: {
  onDone?: () => void;
  force?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const introDisabled = useQueryIntroDisabled();

  const shouldShow = useMemo(() => {
    if (introDisabled) return false;
    if (force) return true;
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) !== "1";
  }, [introDisabled, force]);

  const MAX_SHAKES = 3;
  const [shakeCount, setShakeCount] = useState(0);

  // 미세 흔들림 트리거
  const [shakeTick, setShakeTick] = useState(0);

  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  const steps: Step[] = useMemo(
    () => [
      { text: "광활한 우주에서", holdMs: 450 },
      { text: "모든 별이 반짝일 필요는 없습니다.", holdMs: 650 },
      { text: "저는 반복되던 총무 · IT · 자산 운영을", holdMs: 650 },
      { text: "빛보다 구조로 정리해왔고,", holdMs: 650 },
      { text: "그 가치를 알아볼 준비가 된 분께", holdMs: 650 },
      { text: "이 포트폴리오를 공개합니다.", holdMs: 850 },
      { text: "총무 · IT 운영을 시스템으로 설계해온 송명진입니다.", holdMs: 900 },
    ],
    []
  );

  useEffect(() => {
    if (!shouldShow) return;
    setOpen(true);
  }, [shouldShow]);

  // 시퀀스 진행: 한 줄씩 stepIdx 증가
  useEffect(() => {
    if (!open) return;

    setStepIdx(0);
    setCanContinue(false);

    if (reduceMotion) {
      // 전부 노출
      setStepIdx(steps.length - 1);
      setCanContinue(true);
      return;
    }

    (async () => {
      for (let i = 0; i < steps.length; i++) {
        setStepIdx(i);
        await sleep(steps[i].holdMs);
      }
      setCanContinue(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reduceMotion]);

  // Enter/Escape 지원
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (e.key === "Enter" && canContinue) finish();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, canContinue]);

  function finish() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch { }
    setOpen(false);
    onDone?.();
  }

  if (!shouldShow) return null;

  const visibleLines = reduceMotion
    ? steps.map((s) => s.text)
    : steps.slice(0, stepIdx + 1).map((s) => s.text);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="intro"
          role="dialog"
          aria-modal="true"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black" />
          <Starfield />
          <Meteors />

          {/* readability overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.9)]" />

          {/* Center text (with subtle shake on impact) */}
          <div className="relative z-[101] flex h-full w-full items-center justify-center px-6">
            <motion.div
              key={shakeTick}
              className="w-full max-w-5xl"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: [0, -3, 2, -2, 1, 0],
                y: [0, 1, -1, 1, 0],
              }}
              transition={{ duration: 0.14, ease: "easeOut" }}
            >
              <div
                className={[
                  "font-sans tracking-tight text-white",
                  "text-[28px] leading-[1.35] sm:text-[36px] sm:leading-[1.3] md:text-[46px] md:leading-[1.22]",
                ].join(" ")}
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
              >
                <div className="space-y-3 md:space-y-4">
                  {visibleLines.map((line, idx) => (
                    <MeteorLine
                      key={idx}
                      text={line}
                      active={idx === visibleLines.length - 1 && !reduceMotion}
                      onImpact={() => {
                        setShakeCount((c) => {
                          if (c >= MAX_SHAKES) return c; // 제한
                          setShakeTick((t) => t + 1);
                          return c + 1;
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            {/* (선택) 버튼 넣고 싶으면 여기 */}
            <button  className="
                  rounded-xl
                  bg-zinc-900
                  px-6 py-3
                  text-sm font-medium text-white
                  transition
                  hover:bg-zinc-800 
                  disabled:opacity-40
                  disabled:pointer-events-none
                "
                onClick={finish} disabled={!canContinue}>포트폴리오 보기</button>
              {/* Bottom hints */}
              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/55">
                <span>
                  Enter: <span className="text-white/70">다음</span>
                </span>
              </div>

              
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MeteorLine({
  text,
  active,
  onImpact,
}: {
  text: string;
  active: boolean;
  onImpact?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -42, rotate: -2, filter: "blur(6px)" }}
      animate={{
        opacity: 1,
        y: [-42, 6, 0],
        rotate: [-2, 0.6, 0],
        filter: ["blur(6px)", "blur(1px)", "blur(0px)"],
      }}
      transition={{
        duration: 0.62,
        ease: [0.2, 0.9, 0.2, 1],
      }}
      onAnimationComplete={() => {
        if (active) onImpact?.();
      }}
      className="relative"
    >
      {/* 착지 임팩트(짧은 플래시) */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none absolute -left-1 -right-1 -bottom-2 h-[2px] bg-white/40"
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: [0, 1, 0], scaleX: [0.2, 1, 1.1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {text}
    </motion.div>
  );
}

function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="starfield starfield--1" />
      <div className="starfield starfield--2" />
      <div className="starfield starfield--3" />
    </div>
  );
}

function Meteors() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <span className="meteor meteor--1" />
      <span className="meteor meteor--2" />
      <span className="meteor meteor--3" />
      <span className="meteor meteor--4" />
    </div>
  );
}
