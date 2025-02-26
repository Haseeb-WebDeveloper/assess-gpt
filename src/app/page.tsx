import Header from "@/components/layout/landing-page/header";
import HeroSection from "@/components/layout/landing-page/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AssessGPT - AI-Powered Assessment Platform",
  description: "Transform education with AI-powered assessment tools",
};

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
    </main>
  );
}
