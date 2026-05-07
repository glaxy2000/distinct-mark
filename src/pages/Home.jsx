import React from "react";
import HeroSlider from "@/components/home/HeroSlider";
import StatsBar from "@/components/home/StatsBar";
import ServiceGrid from "@/components/home/ServiceGrid";
import AboutPreview from "@/components/home/AboutPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <StatsBar />
      <ServiceGrid />
      <AboutPreview />
      <CTASection />
    </div>
  );
}