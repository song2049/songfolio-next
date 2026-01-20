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
    notion?: string;
    live?: string;
    docs?: string;
  };
  company?: {
    key: "miracle-city" | "jeongmu" | "vacorp" | "nhn" | "kga" // 회사 상세 라우트 slug
    name: string; // 카드/표시용 회사명
  };
  outcomeLine?: string;
  stats?: { label: string; value: string }[];

};

export const projects: Project[] = [

  {
    slug: "gas",
    title: "GAS (General Affair Asset System)",
    summary:
      "총무·IT 실무에서 발생하는 자산·계정·라이선스 관리 문제를 구조적으로 해결하기 위해 설계한 통합 운영 시스템",
    period: "2025 ~ 2026",
    role: "기획 · 설계 · 단독 개발",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "AWS", "Nginx"],
    highlights: [
      "총무 실무 경험에서 발생한 문제를 기준으로 데이터 모델 설계",
      "자산·계정·라이선스 운영 흐름을 하나의 시스템으로 통합",
      "RBAC 기반으로 ‘누가 무엇을 관리하는지’가 드러나는 구조 설계",
      "실제 운영을 가정한 배포 환경(AWS · Nginx · PM2)까지 직접 구성",
    ],
    cover: "/projects/gas/cover.png",
    featured: true,
    company: { key: "vacorp", name: "VA Corporation" },
    outcomeLine:
      "실무에서 겪은 관리·인수인계의 문제를 데이터 구조와 권한 흐름으로 풀어내, 바로 사용 가능한 수준의 자산 운영 시스템을 구축했습니다.",
    stats: [
      { label: "RBAC", value: "권한 분리" },
      { label: "Audit Log", value: "변경 이력" },
      { label: "Workflow", value: "등록→조회→변경" },
    ],

    story: {
      problem: [
        "자산·계정·라이선스 정보가 문서/엑셀/개인 기억에 흩어져 있음",
        "업무가 특정 담당자에게 종속되어 인수인계가 어려움",
        "요청·변경·갱신 이력이 남지 않아 관리 책임이 불명확함",
      ],
      decisions: [
        "기능보다 먼저 ‘운영 규칙과 데이터 구조’를 정의",
        "총무 업무 흐름(등록→조회→변경→로그)을 최소 단위로 구현",
        "실제 도입을 가정하고 인증·권한·배포 환경까지 함께 설계",
      ],
      results: [
        "자산·계정·라이선스 정보를 하나의 기준 구조로 통합",
        "권한에 따라 접근과 행동이 분리되는 운영 기반 확보",
        "즉시 사용 가능하면서도 점진적 확장이 가능한 구조 완성",
      ],
      learnings: [
        "운영 시스템은 화려한 기능보다 ‘규칙과 책임’이 핵심이다",
        "실무 경험이 있어야 불필요한 기능을 걸러낼 수 있다",
        "서비스는 개발이 아니라 ‘운영까지 포함한 설계’라는 점을 체감",
      ],
    },
    links: {
      github: "http://54.180.142.153/dashboard",
    },
  },

  {
    slug: "x-ink",
    title: "X-ink",
    summary: "프로젝트/아웃소싱 매칭 플랫폼(개인/기업 플로우)",
    period: "2025",
    role: "기획 · UI · 개발",
    stack: ["Next.js", "React", "TypeScript", "UI System"],
    highlights: [
      "개인/기업 사용자 플로우 분리 설계",
      "카테고리 기반 정보 구조화",
      "재사용 가능한 UI 패턴 적용",
    ],
    cover: "/projects/x-ink/cover.png",
    featured: true,
    company: { key: "kga", name: "경일게임IT아카데미" },
    outcomeLine: "개인/기업 플로우를 분리해 요구 정보와 UX를 정렬하고, UI 재사용 단위를 안정적으로 설계했습니다.",

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

  {
    slug: "tocheon",
    title: "ToCheon (Today Cheonho)",
    summary: "천호역 반경 500m 내 음식점을 경험 기반으로 공유하는 로컬 맛집 플랫폼",
    period: "2025",
    role: "기획 · 백엔드 개발",
    stack: [
      "Node.js",
      "Express",
      "MySQL",
      "JWT Authentication",
      "Kakao Map API",
    ],
    highlights: [
      "음식점 · 리뷰 · 사용자 도메인 중심 REST API 설계",
      "JWT 기반 인증 흐름 및 권한 분리 구조 구현",
      "프론트엔드와 연동을 고려한 API 응답 규격 정의",
      "Postman 기반 API 연결 테스트 및 데이터 검증",
      "카카오맵 API 연계를 고려한 위치 데이터 구조 설계",
    ],
    cover: "/projects/tocheon/cover.png",
    featured: true,
    company: { key: "kga", name: "경일게임IT아카데미" },
    outcomeLine:
      "기획 단계에서 정의한 사용자 흐름을 기준으로 API를 설계하고, 실제 서비스 수준의 인증·데이터 구조를 백엔드에서 구현했습니다.",

    story: {
      problem: [
        "매일 반복되는 점심 메뉴 선택 문제",
        "포털 리뷰는 광고성 정보가 많아 신뢰하기 어려움",
        "학원 주변 로컬 맛집 정보를 구조적으로 관리할 방법 부재",
      ],
      decisions: [
        "서비스 범위를 천호역(금복빌딩 기준) 반경 500m로 명확히 제한",
        "‘직접 다녀온 사람의 경험’을 핵심 데이터로 정의",
        "백엔드 주도 구조로 API 스펙을 먼저 설계한 뒤 프론트와 연결",
        "JWT 기반 인증을 도입해 사용자별 리뷰 관리 구조 설계",
      ],
      results: [
        "음식점 / 리뷰 / 사용자 도메인이 분리된 REST API 구조 완성",
        "프론트엔드와의 연결 테스트를 통해 실제 서비스 흐름 검증",
        "기획 의도를 API 구조로 구현하며 백엔드 설계 경험 축적",
      ],
      learnings: [
        "기획을 직접 했기 때문에 API 설계에서 불필요한 기능을 줄일 수 있었다",
        "API는 단순 구현이 아니라 ‘사용자 흐름의 번역’이라는 점을 체감",
        "연결 테스트 과정에서 응답 규격과 에러 정의의 중요성을 배움",
      ],
    },
    links: {
      notion: "https://www.notion.so/ToCheon-Today-Cheonho-2a0ce3f42bd2813f91f0c2e2a6689682",
      github: "https://github.com/song2049",
    },
  }
];
