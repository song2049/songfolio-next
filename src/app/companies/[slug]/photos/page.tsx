import Link from "next/link";
import Image from "next/image";
import {
  getCompanyWorkPhotos,
  workCategoryLabel,
  type CompanyKey,
  type WorkCategory,
} from "../../../lib/data/work-photos";

export default async function CompanyPhotosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = getCompanyWorkPhotos(slug as CompanyKey);

  const cats: WorkCategory[] = ["inventory", "move", "setup", "event", "facility"];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Work Photos</h1>
          <p className="mt-1 text-sm text-zinc-600">
            {slug} · {all.length} photos
          </p>
        </div>
        <Link
          href={`/companies/${slug}`}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
        >
          ← Back
        </Link>
      </div>

      <div className="mt-6 space-y-10">
        {cats.map((cat) => {
          const items = all.filter((p) => p.category === cat);
          if (items.length === 0) return null;

          return (
            <section key={cat}>
              <h2 className="text-lg font-semibold">{workCategoryLabel[cat]}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                  >
                    <div className="relative h-44 w-full bg-zinc-50">
                      <Image src={p.src} alt={p.caption} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-zinc-700">{p.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {all.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
            아직 등록된 작업 사진이 없습니다.
          </div>
        ) : null}
      </div>
    </main>
  );
}
