// src/app/lib/data/companies.ts

export type CompanyKey = "nhn" | "vacorp" | "miracle-city" | "jeongmu" | "kga"| "jellyfish";

export type Company = {
  key: CompanyKey;
  name: string;
  period: string;
  roleLine: string;
  role?: string;

  /** 상세 페이지 요약 문단 (없으면 oneLiner를 사용) */
  summary?: string;

  /** 한 줄 소개 (리스트/카드에서 사용) */
  oneLiner: string;

  /** 상세 페이지 - 주요 성과 (없으면 tags로 대체) */
  description?: string[];

  /** 상세 페이지 - 주요 기술/키워드 (없으면 tags로 대체) */
  highlights?: string[];

  tags: string[];
  href: string;
};

export const companies: Company[] = [
  {
    key: "nhn",
    name: "NHN (Naver / NHN 계열)",
    period: "2014.08–2017.01",
    roleLine: "IT 총무 · 전산 운영",
    oneLiner: "대규모 조직 환경에서 표준 IT 운영·자산 관리 기본기를 체계적으로 구축",
    tags: ["전산 운영", "자산/장비", "장애 대응", "온보딩/오프보딩"],
    href: "/companies/nhn",
  },
  {
    key: "vacorp",
    name: "VA Corporation",
    period: "2022.09-2024.03",
    roleLine: "총무 · IT 자산/라이선스 운영",
    oneLiner: "자산·계정·라이선스·벤더 운영을 규모 기준으로 표준화하고, 데이터 기반 운영 체계로 정리",
    tags: ["자산관리", "라이선스", "벤더", "프로세스 표준화"],
    href: "/companies/vacorp",
  },
  {
    key: "jellyfish",
    name: "Jellyfish Entertainment",
    period: "2024.04-2024.08",
    roleLine: "총무 · 운영 지원",
    oneLiner: "현장 운영·행사·시설/비품 관리 등 운영 업무를 구조화해 재사용 가능한 흐름으로 정리",
    tags: ["현장 운영", "시설/비품", "행사", "협력사 커뮤니케이션"],
    href: "/companies/jellyfish",
  },
  {
    key: "jeongmu",
    name: "Jeongmu",
    period: "2017.07-2020.07",
    roleLine: "총무 · 운영",
    oneLiner: "업무 운영을 문서/체크리스트/자산 흐름으로 정리해 인수인계 가능한 상태로 유지",
    tags: ["운영 프로세스", "문서화", "자산/비품", "인수인계"],
    href: "/companies/jeongmu",
  },
  {
    key: "kga",
    name: "경일게임IT아카데미 (KGA)",
    period: "2025.08-2025.02",
    roleLine: "교육 · 프로젝트 수행",
    oneLiner: "개발 기반 포트폴리오 구축과 프로젝트 수행 경험을 실무형 결과물로 정리",
    tags: ["Next.js", "프로젝트", "학습/구현", "포트폴리오"],
    href: "/companies/kga",
  },
];

export function getCompanyByKey(key: string) {
  return companies.find((c) => c.key === key) ?? null;
}
