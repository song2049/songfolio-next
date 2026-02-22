/**
 * 페이지 공통 배경 장식(그라데이션 블랍 + 그리드)
 * - Home은 자체 Hero 연출이 있으니, 전역 배경은 과하지 않게 '은은한 레이어'만 사용
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* gradient blobs */}
      <div className="absolute -top-32 left-[-10%] h-[520px] w-[520px] rounded-full bg-black/10 blur-3xl" />
      <div className="absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full bg-black/10 blur-3xl" />
      <div className="absolute bottom-[-25%] left-[20%] h-[520px] w-[520px] rounded-full bg-black/5 blur-3xl" />
    </div>
  );
}
