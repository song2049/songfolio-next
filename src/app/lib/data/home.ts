export const home = {
  hero: {
    headline: "복잡한 문제를 단순한 구조로 정리합니다.",
    subheadline:
      "운영·자산·프로세스를 ‘관리 가능한 시스템’으로 바꾸는 일을 합니다. (Next.js + 정적 데이터 기반)",
  },
  highlights: [
    { title: "설계", desc: "페이지·컴포넌트·데이터 구조를 먼저 정리하고 구현합니다." },
    { title: "운영", desc: "유지보수 가능한 규칙과 문서화를 기본으로 둡니다." },
    { title: "실행", desc: "작게 만들고 빠르게 개선하며 결과로 설득합니다." },
  ],
  featuredProjects: [
    {
      slug: "gas",
      title: "GAS (General Affair Asset System)",
      summary: "사내 자산/계정/라이선스 운영을 위한 관리 시스템",
      period: "2025–2026",
      stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "AWS", "Nginx"],
      badge: "In Progress",
    },
    {
      slug: "spoonmate",
      title: "SpoonMate",
      summary: "소프트웨어·하드웨어 자산 관리 SaaS 컨셉",
      period: "2025",
      stack: ["Next.js", "TypeScript", "Prisma", "RBAC", "CSV Import"],
      badge: "Product",
    },
    {
      slug: "x-ink",
      title: "X-ink",
      summary: "프로젝트/아웃소싱 매칭 플랫폼(개인/기업 플로우)",
      period: "2024–2025",
      stack: ["Next.js", "React", "TypeScript", "UI System"],
      badge: "Platform",
    },
  ],
  links: {
    github: "https://github.com/song2049",
    email: "mailto:you@example.com",
  },
};
