import Link from "next/link";

export function ProfileTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Profile</h2>
              <p className="mt-2 text-sm text-zinc-600">
                학력 · 자격/수상 · 스킬을 한 페이지로 정리했습니다.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">Education</span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">Certificates</span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">Skills</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/profile"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
              >
                프로필 보기 →
              </Link>
              <Link
                href="/experience"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
              >
                경력 보기 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
