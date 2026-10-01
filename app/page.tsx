"use client";

import DesktopHero from "@/components/sections/DesktopHero";
import MobileHero from "@/components/sections/MobileHero";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export default function Home() {
  const { isMobile, mounted } = useIsMobile();

  if (!mounted) {
    return <main className="h-full w-full bg-bg" />;
  }

  return isMobile ? <MobileHero /> : <DesktopHero />;
}