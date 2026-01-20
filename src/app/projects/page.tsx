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
