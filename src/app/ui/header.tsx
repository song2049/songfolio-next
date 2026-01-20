import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/companies", label: "Companies" },
  { href: "/experience", label: "Experience" },
];


export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Songfolio
        </Link>

        <nav className="flex items-center gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full border border-transparent px-3 py-1.5 text-sm text-zinc-700 hover:border-zinc-200 hover:bg-zinc-50"
            >
              {n.label}
            </Link>
          ))}

          <a
            href="https://github.com/song2049"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
