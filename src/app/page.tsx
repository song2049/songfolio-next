import { HomeClient } from "./home/HomeClient";
import { HomeHero } from "./home/hero";
import { ProblemSpace } from "./home/problem-space";
import { FeaturedProjectsSection } from "./home/featured-projects";
import { ProofSection } from "./home/proof";
import { ExperienceTeaser } from "./home/experience-teaser";
import { CompaniesTeaser } from "./home/companies-teaser";
import { ProfileSection } from "./home/profile-section";
import { Suspense } from "react";



export default function HomePage() {
  return (
     <Suspense fallback={null}>
    <HomeClient>
      {/* IntroOverlay 다음: 안정적인 Hero */}
      <HomeHero />
      <ProblemSpace />

      {/* White zone: 증명 → 근거 → 상세 유도 */}
      <CompaniesTeaser />
      <FeaturedProjectsSection />
      <ProofSection />
      <ExperienceTeaser />
      <ProfileSection />
    </HomeClient>
    </Suspense>
  );
}
