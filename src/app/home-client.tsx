"use client";

import { useCallback } from "react";
import { IntroOverlay } from "./ui/intro/IntroOverlay"; // 너 프로젝트 경로에 맞게 수정

export function HomeClient() {
  const onDone = useCallback(() => {
    // 기존 onDone 로직 있으면 여기에 그대로
  }, []);

  return (
    <>
      <IntroOverlay onDone={onDone} />
      {/* 기존 홈 화면 구성(섹션/컨테이너 등)이 Client에 있어야 하면 여기에 같이 둬도 됨 */}
    </>
  );
}
