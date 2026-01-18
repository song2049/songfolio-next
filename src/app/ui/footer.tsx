export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-sm font-semibold">Songfolio</div>
            <div className="text-sm text-zinc-600">
              정적 데이터 기반으로, 유지보수 쉬운 포트폴리오를 만듭니다.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://blog.naver.com/song912049"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Blog
            </a>
            <a
              href="https://github.com/song2049"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-zinc-500">© {year} Songfolio. All rights reserved.</div>
      </div>
    </footer>
  );
}
