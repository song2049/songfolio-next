export type Project = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  stack: string[];

  // 기존 하이라이트(짧은 bullet)
  highlights: string[];
  cover?: string; // ✅ 추가
  featured?: boolean; // ✅ 이 줄만 추가
  
  //스토리 구조
  story: {
    problem: string[];
    decisions: string[];
    results: string[];
    learnings: string[];
  };

  links?: {
    github?: string;
    live?: string;
    docs?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "gas",
    title: "GAS (General Affair Asset System)",
    summary: "사내 자산/계정/라이선스 운영을 위한 관리 시스템",
    period: "2025–2026",
    role: "기획 · 설계 · 개발",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "AWS", "Nginx"],
    highlights: [
      "운영 업무를 데이터 구조로 정의하고 화면 흐름으로 연결",
      "권한(RBAC) 기반 접근 제어 설계",
      "정적 데이터/규칙 중심으로 유지보수 단순화",
    ],
    cover: "/projects/gas/cover.png",
    featured: true,

    story: {
      problem: [
        "자산/계정/라이선스 정보가 흩어져 있어 업데이트/인수인계가 어려움",
        "누가 무엇을 관리하는지 모호해 업무가 개인에게 종속됨",
        "요청/승인/갱신 같은 운영 흐름이 기록으로 남지 않음",
      ],
      decisions: [
        "화면보다 먼저 데이터 구조(자산/부서/벤더/권한)를 정의",
        "기능을 크게 만들지 않고 핵심 흐름(등록→조회→변경→로그)부터 구현",
        "운영 배포를 고려해 서버 환경(Nginx/PM2 등)까지 함께 정리",
      ],
      results: [
        "자산 정보를 표준화된 형태로 관리할 수 있는 기반 마련",
        "권한에 따라 메뉴/행동을 분리해 운영 리스크 감소",
        "로그/변경 이력을 통해 인수인계 가능성 상승",
      ],
      learnings: [
        "운영 시스템은 UI보다 ‘규칙/흐름/권한’이 먼저다",
        "처음부터 완벽보다 ‘작은 단위로 안정화’가 더 중요하다",
        "배포/환경까지 포함해서 설계해야 진짜 서비스가 된다",
      ],
    },
    links: {
      github: "https://github.com/song2049",
    },
  },

  {
    slug: "Spoon",
    title: "Spoon",
    summary: "소프트웨어·하드웨어 자산 관리 SaaS 컨셉",
    period: "2025",
    role: "기획 · 개발",
    stack: ["Next.js", "TypeScript", "Prisma", "CSV Import", "RBAC"],
    highlights: [
      "자산 유형(동적 필드) 확장 구조 설계",
      "CSV 업로드 흐름과 검증 UX 구성",
      "운영자 관점의 화면 설계",
    ],
    cover: "/projects/spoonmate/cover.png",
    featured: true,
    story: {
      problem: [
        "회사마다 자산 필드가 달라 ‘고정 스키마’로는 확장이 어려움",
        "엑셀/CSV로 들어오는 데이터 품질이 들쭉날쭉함",
      ],
      decisions: [
        "자산 타입(슬러그) 기반으로 동적 필드를 정의하는 구조 설계",
        "CSV는 ‘필수 헤더’ 중심으로 단순한 규칙부터 적용",
      ],
      results: [
        "회사별 요구를 타입 정의로 흡수할 수 있는 확장성 확보",
        "CSV 입력 흐름을 표준화해 운영 부담 감소",
      ],
      learnings: [
        "입력(데이터 인입)을 잡으면 시스템 전체 품질이 따라온다",
        "확장성은 기능이 아니라 데이터 모델에서 결정된다",
      ],
    },
    links: {
      github: "https://github.com/song2049",
    },
  },

  {
    slug: "x-ink",
    title: "X-ink",
    summary: "프로젝트/아웃소싱 매칭 플랫폼(개인/기업 플로우)",
    period: "2024–2025",
    role: "기획 · UI · 개발",
    stack: ["Next.js", "React", "TypeScript", "UI System"],
    highlights: [
      "개인/기업 사용자 플로우 분리 설계",
      "카테고리 기반 정보 구조화",
      "재사용 가능한 UI 패턴 적용",
    ],
    cover: "/projects/x-ink/cover.png",
    featured: false,
    story: {
      problem: [
        "사용자 유형(개인/기업)에 따라 필요한 정보가 크게 다름",
        "같은 화면을 억지로 재사용하면 UX가 무너짐",
      ],
      decisions: [
        "가입/게시/지원 흐름을 사용자 유형 기준으로 분리",
        "공통 UI는 컴포넌트로 추출하고, 흐름은 페이지 단위로 분리",
      ],
      results: [
        "사용자 유형별 필요한 정보를 더 명확히 제공",
        "재사용 가능한 UI 기반으로 개발 속도 개선",
      ],
      learnings: [
        "재사용은 ‘코드’가 아니라 ‘경험’을 기준으로 결정해야 한다",
      ],
    },
    links: {
      github: "https://github.com/song2049",
    },
  },
];
