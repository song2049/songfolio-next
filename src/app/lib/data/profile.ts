// src/app/lib/data/profile.ts

export type Education = {
  name: string;
  major?: string;
  period?: string;
  note?: string;
};

export type Credential = {
  name: string;
  org?: string;
  date?: string;
  note?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const education: Education[] = [
  { name: "경기대학교", major: "호텔경영학과", period: "2021.08–2023.08" },
  { name: "학점은행제", major: "경영학", period: "2020.01–2021.08" },
  { name: "신동신정보산업고등학교", major: "정보처리전공", period: "2007.03–2010.02" },
];

export const credentials: Credential[] = [
  { name: "소방안전관리자 1급", date: "2020.12" },
  { name: "자동차운전면허 1종 보통", date: "2010.12" },
  { name: "4종 무인 드론(3과정)", date: "2025.02" },
  { name: "일반경비원", date: "2014.03" },
  { name: "한국 911 수색 구조대", date: "2025.04", note: "기자 활동 포함(선택 기재)" },
  { name: "블록체인기반 웹 풀스택 개발자", date: "2025.08", note: "교육 과정 진행 중" },
];

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "MySQL", "Prisma"] },
  { title: "Ops", items: ["AWS", "Nginx", "PM2"] },
  { title: "General Affairs", items: ["자산관리", "라이선스", "구매/계약", "벤더 관리", "비용 절감", "OA"] },
];
