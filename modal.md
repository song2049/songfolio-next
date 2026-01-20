# Next.js App Router 포트폴리오 - 인터셉팅 라우트 기반 모달 구현

## ✅ 완성된 구현

모든 요구사항을 만족하는 인터셉팅 라우트 기반 모달 구현이 완료되었습니다.

---

## 📁 생성된 파일 및 폴더 구조

```
src/app/
├── layout.tsx (✅ 수정)
│   └── @modal 슬롯 추가
├── @modal/(.)companies/[slug]/
│   ├── page.tsx (✅ 회사 상세 모달)
│   └── photos/
│       └── page.tsx (✅ 사진 조회 모달)
├── companies/
│   ├── [slug]/
│   │   ├── page.tsx (✅ 직접 접속 시 풀페이지)
│   │   └── photos/
│   │       └── page.tsx (✅ 직접 접속 시 풀페이지)
│   └── layout.tsx (기존 유지)
├── lib/data/
│   ├── companies.ts (✅ 신규 회사 데이터 구조)
│   ├── work-photos.ts (기존 유지)
│   └── projects.ts (기존 유지)
├── ui/
│   ├── modal.tsx (✅ 신규 모달 래퍼)
│   └── ...
└── home/
    └── companies-teaser.tsx (✅ 수정 - 모달 링크)
```

---

## 🎯 구현 세부사항

### 1️⃣ RootLayout 수정 (`src/app/layout.tsx`)

- `@modal` 슬롯 추가
- `{children}`과 `{modal}` 함께 렌더링

```tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <Header />
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
```

---

### 2️⃣ 모달 래퍼 컴포넌트 (`src/app/ui/modal.tsx`)

- HTML `<dialog>` 요소 기반
- ESC 키 및 배경 클릭 시 `router.back()` 실행
- body 스크롤 자동 잠금
- 닫기 버튼 포함

**주요 기능:**
```tsx
"use client";
const handleClose = () => router.back();
// dialog showModal() 호출
// 배경 클릭 시 handleClose()
// onCancel 이벤트 처리 (ESC)
```

---

### 3️⃣ 회사 상세 모달 (`src/app/@modal/(.)/companies/[slug]/page.tsx`)

- 홈 위에서 모달 형태로 회사 상세 표시
- "사진 보기" 링크로 사진 페이지로 전환
- 배경은 홈이 유지됨 (인터셉팅 라우트)

**UX 흐름:**
```
홈 → 회사 클릭 → /companies/[slug] → @modal 인터셉트 → 모달 렌더링
```

---

### 4️⃣ 사진 조회 모달 (`src/app/@modal/(.)/companies/[slug]/photos/page.tsx`)

- 같은 `@modal` 슬롯에서 단계 전환
- 카테고리별 사진 그룹핑
- 뒤로가기 → 회사 상세 모달로 복귀

**UX 흐름:**
```
회사 모달 → "사진 보기" 클릭 → /companies/[slug]/photos → 모달 단계 전환
```

---

### 5️⃣ 회사 데이터 구조 (`src/app/lib/data/companies.ts`)

```typescript
export type Company = {
  key: CompanyKey;
  name: string;
  role: string;
  period: string;
  summary: string;
  description: string[];
  highlights: string[];
};

export const companies: Record<CompanyKey, Company> = {
  "miracle-city": { ... },
  "jeongmu": { ... },
  "vacorp": { ... },
  "nhn": { ... },
  "kga": { ... },
};
```

---

### 6️⃣ Fallback 페이지들

**`src/app/companies/[slug]/page.tsx`**
- 직접 URL 접근 시 풀페이지 회사 상세
- 공유 가능한 독립 페이지

**`src/app/companies/[slug]/photos/page.tsx`**
- 직접 URL 접근 시 풀페이지 사진 조회

---

## 🔄 UX 흐름도

```
┌─────────────────────────────────────────────────────────────┐
│                           홈                                  │
│  (companies-teaser에서 회사 카드 표시)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ 회사 클릭 (Link href="/companies/[slug]")
                       ↓
        ┌──────────────────────────────┐
        │   @modal 인터셉트 라우트     │
        │  /.../companies/[slug]       │
        │    ↓                         │
        │  모달 배경(홈 유지)          │
        │  모달 콘텐츠(회사 상세)      │
        └──────────────────────────────┘
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │
  ESC 또는        사진 보기           전체 페이지
  배경 클릭        클릭 시            보기 링크
     │         (→ /companies/[slug]/photos)
     │                 │
     ↓                 ↓
   홈 복귀     ┌──────────────────────────────┐
               │   @modal 인터셉트 라우트     │
               │ /.../companies/[slug]/photos │
               │    ↓                         │
               │  모달 배경(홈 유지)          │
               │  모달 콘텐츠(사진 목록)      │
               └──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      ESC        뒤로가기           전체 페이지
    또는배경      클릭 시           보기 링크
    클릭         (→ /companies/[slug])
        │              │
        ↓              ↓
      홈복귀    회사 모달 복귀
```

---

## ✨ 주요 특징

| 요구사항 | 상태 | 설명 |
|---------|------|------|
| 모달 형태 표시 | ✅ | `<dialog>` + Modal 래퍼 |
| 홈 배경 유지 | ✅ | 인터셉팅 라우트로 구현 |
| URL 유지 (/companies/[slug]) | ✅ | 인터셉팅 라우트 특성 |
| Fallback 페이지 | ✅ | 직접 접속 시 풀페이지 |
| 사진 단계 전환 | ✅ | 같은 @modal 슬롯 |
| 모달 중첩 금지 | ✅ | 모달 래퍼에서 단일 슬롯만 사용 |
| useState 금지 | ✅ | 라우팅 기반만 사용 |
| ESC/배경 닫기 | ✅ | Modal 컴포넌트에서 처리 |
| 배경 스크롤 잠금 | ✅ | useEffect에서 body.overflow 제어 |
| Experience 페이지 유지 | ✅ | 변경 없음 |
| /companies 구조 유지 | ✅ | fallback과 @modal 함께 사용 |

---

## 🚀 사용 방법

### 1. 홈에서 회사 클릭

```tsx
<Link href="/companies/[slug]">
  {company.name}
</Link>
```

→ 인터셉팅되어 모달로 표시됨

### 2. 모달에서 사진 보기

```tsx
<Link href={`/companies/${slug}/photos`}>
  사진 보기 →
</Link>
```

→ 같은 모달 슬롯에서 사진 페이지로 전환

### 3. 뒤로가기

```tsx
router.back()  // ESC나 닫기 버튼 클릭 시
```

→ 이전 페이지로 복귀 (회사 모달 → 홈, 사진 모달 → 회사 모달)

### 4. 직접 접속

```
/companies/jeongmu
/companies/nhn/photos
```

→ 풀페이지로 표시됨 (인터셉팅 안 됨)

---

## 📝 주의사항

1. **@modal 폴더 이름**: `@modal` 파라미터식 슬롯 사용
2. **(.) 패턴**: 같은 수준에서 인터셉트
3. **Layout**: `companies/layout.tsx`가 `{children, modal}` 받아야 함 ✅ 이미 구성됨
4. **defaultModal**: `@modal/default.tsx`는 null 반환해야 함 ✅ 기존 파일 유지

---

## 📋 구현 체크리스트

- [x] RootLayout에 @modal 슬롯 추가
- [x] Modal 래퍼 컴포넌트 생성 (ESC, 배경 클릭, 스크롤 잠금)
- [x] @modal/(.)companies/[slug]/page.tsx 생성
- [x] @modal/(.)companies/[slug]/photos/page.tsx 생성
- [x] companies/[slug]/page.tsx 풀페이지 생성
- [x] companies/[slug]/photos/page.tsx 풀페이지 생성
- [x] companies.ts 데이터 구조 생성
- [x] companies-teaser.tsx 모달 링크 업데이트

---

## 🎉 결과

**홈에서 회사 카드를 클릭하면 모달로 상세 정보가 표시**되고, **사진 보기를 클릭하면 같은 모달에서 사진 단계로 전환**됩니다. 뒤로가기 시 이전 화면으로 자연스럽게 복귀합니다!