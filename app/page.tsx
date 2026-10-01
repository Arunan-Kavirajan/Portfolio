"use client";

import DesktopHero from "@/components/sections/DesktopHero";
import MobileHero from "@/components/sections/MobileHero";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

import MobileFieldNotes from "@/components/sections/MobileFieldNotes";

export default function Home() {
  const { isMobile, mounted } = useIsMobile();

  if (!mounted) {
    return <main className="h-full w-full bg-bg" />;
  }

  return isMobile ? (
    <div className="flex flex-col bg-[#1a110a] min-h-screen">
      <MobileHero />
      <MobileFieldNotes />
    </div>
  ) : (
    <DesktopHero />
  );
}