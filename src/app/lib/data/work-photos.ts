export type CompanyKey = "miracle-city" | "jeongmu" | "vacorp" | "nhn" | "kga";

export type WorkCategory = "inventory" | "move" | "setup" | "event" | "facility";

export type WorkPhoto = {
  id: string;
  companyKey: CompanyKey;
  category: WorkCategory;
  src: string; // public 기준 경로: /images/work/...
  caption: string; // 사진 아래 1줄 설명
};

export const workCategoryLabel: Record<WorkCategory, string> = {
  inventory: "자산 실사",
  move: "자산 이동",
  setup: "설치/세팅",
  event: "행사/운영",
  facility: "유지보수",
};

/**
 * ✅ 샘플 데이터
 * - 지금은 더미 경로(/images/work/...)로 넣어뒀고,
 * - 실제 사진 파일을 public/images/work/... 에 넣어주면 바로 표시됨.
 */
export const workPhotos: WorkPhoto[] = [
  // NHN
 {
    id: "nhn-1",
    companyKey: "nhn",
    category: "setup",
    src: "/images/work/nhn/setup-01.jpg",
    caption: "설치/세팅: 신규 입사자 장비 세팅 및 지급",
  },
  
  // VACORP (예시)
  {
    id: "vacorp-1",
    companyKey: "vacorp",
    category: "inventory",
    src: "/images/work/vacorp/inventory-01.jpg",
    caption: "자산 실사: Studio LED Wall",
  },
  {
    id: "vacorp-2",
    companyKey: "vacorp",
    category: "inventory",
    src: "/images/work/vacorp/inventory-02.jpg",
    caption: "자산 실사: Studio LED Wall",
  },
  {
    id: "vacorp-3",
    companyKey: "vacorp",
    category: "inventory",
    src: "/images/work/vacorp/inventory-03.jpg",
    caption: "자산 실사: Studio LED Wall",
  },
  {
    id: "vacorp-4",
    companyKey: "vacorp",
    category: "inventory",
    src: "/images/work/vacorp/inventory-04.jpg",
    caption: "자산 실사: 유휴 자산",
  },
  {
    id: "vacorp-5",
    companyKey: "vacorp",
    category: "event",
    src: "/images/work/vacorp/event-01.jpg",
    caption: "자산 매각: 매각/폐기 절차에 따른 OS 초기화 및 부품 회수",
  },
  {
    id: "vacorp-6",
    companyKey: "vacorp",
    category: "event",
    src: "/images/work/vacorp/event-02.jpg",
    caption: "전사공지: 운영프로세스 변경 및 안내 사항 전파",
  },
  {
    id: "vacorp-7",
    companyKey: "vacorp",
    category: "event",
    src: "/images/work/vacorp/event-03.jpg",
    caption: "전사공지: 운영프로세스 변경 및 안내 사항 전파",
  },
  {
    id: "vacorp-8",
    companyKey: "vacorp",
    category: "move",
    src: "/images/work/vacorp/move-02.jpg",
    caption: "",
  },
  {
    id: "vacorp-9",
    companyKey: "vacorp",
    category: "move",
    src: "/images/work/vacorp/move-01.jpg",
    caption: "자산 이동: 하남스튜디오 => 강남 본사 셋팅을 위한 이동",
  },

  // Miracle City (예시)
  {
    id: "miracle-1",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-01.jpg",
    caption: "행사 운영: 그늘막 설치 및 행사 장소 셋팅",
  },
    {
    id: "miracle-2",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-02.jpg",
    caption: "행사 운영: 사내 공간 활용하여 자리 셋팅",
  },
    {
    id: "miracle-3",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-03.jpg",
    caption: "행사 운영: 외부 업체 섭외(핫도그)",
  },
  {
    id: "miracle-4",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-04.jpg",
    caption: "행사 운영: 공간 활용 및 컨셉에 맞는 드럼통 배치",
  },
  {
    id: "miracle-5",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-05.jpg",
    caption: "행사 운영: 핑거 푸드 운영",
  },
  {
    id: "miracle-6",
    companyKey: "miracle-city",
    category: "event",
    src: "/images/work/miracle/event-06.jpg",
    caption: "행사 운영: 사옥 이전 기념 행사 진행 준비",
  },
  {
    id: "miracle-7",
    companyKey: "miracle-city",
    category: "facility",
    src: "/images/work/miracle/facility-01.jpg",
    caption: "시설관리: 외부 유리창 크랙(파손)으로 교체 작업 진행",
  },
  {
    id: "miracle-8",
    companyKey: "miracle-city",
    category: "facility",
    src: "/images/work/miracle/facility-02.jpg",
    caption: "시설관리: 외부 유리창 크랙(파손)으로 교체 작업 진행",
  },
  {
    id: "miracle-9",
    companyKey: "miracle-city",
    category: "facility",
    src: "/images/work/miracle/facility-03.jpg",
    caption: "시설관리: 외부 유리창 크랙(파손)으로 교체 작업 진행",
  },

  // Jeongmu (예시)
  {
    id: "jeongmu-1",
    companyKey: "jeongmu",
    category: "inventory",
    src: "/images/work/jeongmu/inventory-01.jpg",
    caption: "정무부동산그룹",
  },
   {
    id: "jeongmu-2",
    companyKey: "jeongmu",
    category: "event",
    src: "/images/work/jeongmu/event-01.jpg",
    caption: "법인차량관리: 교통사고 / 보험사고 처리",
  },
   {
    id: "jeongmu-3",
    companyKey: "jeongmu",
    category: "event",
    src: "/images/work/jeongmu/event-02.jpg",
    caption: "법인차량관리: 교통사고 / 보험사고 처리",
  },

];

export function getCompanyWorkPhotos(companyKey: CompanyKey) {
  return workPhotos.filter((p) => p.companyKey === companyKey);
}
