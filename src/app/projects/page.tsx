// NOTE: useSearchParams 사용으로 인해 Client 분리 + Suspense 구조 필수
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProjectsClient from "./projects-client";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div />}>
      <ProjectsClient />
    </Suspense>
  );
}
