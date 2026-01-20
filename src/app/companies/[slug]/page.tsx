import Link from "next/link";
import { getCompanyByKey } from "../../lib/data/companies";
import { workPhotos } from "../../lib/data/work-photos";
import { notFound } from "next/navigation";

export default async function CompanyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const company = getCompanyByKey(slug);

    if (!company) {
        notFound();
    }

    const companyPhotos = workPhotos.filter((p) => p.companyKey === company.key);

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                {/* 뒤로가기 */}
                <Link
                    href="/companies"
                    className="inline-flex text-sm text-zinc-600 hover:text-zinc-900 mb-8"
                >
                    ← 회사 목록으로
                </Link>

                {/* 헤더 */}
                <div className="border-b border-zinc-200 pb-8">
                    <h1 className="text-4xl font-bold text-zinc-900">{company.name}</h1>
                    <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:gap-6">
                        <span className="font-medium">{company.roleLine}</span>
                        <span>{company.period}</span>
                    </div>
                </div>

                {/* 요약 */}
                <div className="py-8">
                    <p className="text-lg leading-relaxed text-zinc-800">
                        {company.summary ?? company.oneLiner}
                    </p>
                </div>

                {/* 주요 성과 */}
                <section className="space-y-4 py-8 border-b border-zinc-200">
                    <h2 className="text-xl font-semibold text-zinc-900">주요 성과</h2>
                    <ul className="space-y-3">
                        {(company.description ?? company.tags).map((desc, idx) => (
                            <li key={idx} className="flex gap-4 text-zinc-700">
                                <span className="mt-1 flex-shrink-0 text-zinc-400">→</span>
                                <span>{desc}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 주요 기술 */}
                <section className="space-y-4 py-8 border-b border-zinc-200">
                    <h2 className="text-xl font-semibold text-zinc-900">주요 기술</h2>
                    <div className="flex flex-wrap gap-2">
                        {(company.highlights ?? company.tags).map((highlight, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 border border-zinc-200"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </section>

                {/* 사진 섹션 */}
                {companyPhotos.length > 0 && (
                    <section className="space-y-6 py-8 border-b border-zinc-200">
                        <h2 className="text-xl font-semibold text-zinc-900">업무 사진</h2>
                        <Link
                            href={`/companies/${slug}/photos`}
                            className="inline-flex rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800 transition"
                        >
                            {companyPhotos.length}개 사진 보기 →
                        </Link>
                    </section>
                )}

                {/* 홈 링크 */}
                <div className="py-8">
                    <Link
                        href="/"
                        className="inline-flex rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition"
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </main>
    );
}
