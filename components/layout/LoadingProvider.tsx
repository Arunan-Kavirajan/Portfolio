"use client";

import { createContext, useContext, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

type LoadingContextType = {
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({ isLoading: true });

export function useLoading() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const intervalMs = 16;
    const totalSteps = duration / intervalMs;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(100, Math.round((step / totalSteps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <LoadingScreen show={isLoading} count={count} />
      {children}
    </LoadingContext.Provider>
  );
}