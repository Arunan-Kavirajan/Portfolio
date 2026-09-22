"use client";

import DesktopProjectArchive from "@/components/sections/DesktopProjectArchive";
import MobileProjectArchive from "@/components/sections/MobileProjectArchive";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export default function ProjectsPage() {
  const { isMobile, mounted } = useIsMobile();

  if (!mounted) {
    return <main className="h-screen w-full bg-[#0B0E12]" />;
  }

  return isMobile ? <MobileProjectArchive /> : <DesktopProjectArchive />;
}
