import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer";
import { BackgroundDecor } from "./ui/background-decor";

export const metadata: Metadata = {
  title: "Songfolio",
  description: "Simple portfolio built with Next.js",
};

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
        <div className="app-shell">
          <BackgroundDecor />
          <Header />
          {children}
          {modal}
          <Footer />
        </div>
      </body>
    </html>
  );
}
