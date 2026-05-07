import React from "react";
import HeroSlider from "@/components/home/HeroSlider";
import StatsBar from "@/components/home/StatsBar";
import ColorBoxes from "@/components/home/ColorBoxes";
import ServiceGrid from "@/components/home/ServiceGrid";
import AboutPreview from "@/components/home/AboutPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <StatsBar />
      <ColorBoxes />
      <ServiceGrid />
      <AboutPreview />
      <CTASection />
    </div>
  );
}