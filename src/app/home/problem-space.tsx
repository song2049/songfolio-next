export function ProblemSpace() {
  return (
    <section className="bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            운영은 늘 바쁜데
            <br />
            구조는 남지 않습니다.
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              누가 뭘 관리하는지,
              <br />
              왜 이렇게 운영되는지,
              <br />
              바뀐 담당자는 처음부터 다시 시작합니다.
            </p>
            <p>
              데이터는 흩어지고,
              <br />
              기준은 사람마다 달라지고,
              <br />
              “문제는 반복”됩니다.
            </p>

            <div className="pt-2 text-white/60">
              그래서 저는 운영을 <span className="text-white/85">구조(권한·로그·규칙)</span>로 고정합니다.
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-xs text-white/55">
          Key topics: 자산 · 계정 · 라이선스 · 인수인계 · 감사 대응 · 비용 예측
        </div>
        
      </div>
      <div className="mt-5 h-4 w-full bg-gradient-to-b from-zinc-850 to-white" />
    </section>
  );
}
