"use client";

import { IntroOverlay } from "../ui/intro/IntroOverlay";

export function HomeClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroOverlay />
      {children}
    </>
  );
}
