"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  navigate: (path: string) => void;
  isExiting: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExiting, setIsExiting] = useState(false);

  const navigate = (path: string) => {
    if (path === pathname) return;
    setIsExiting(true);
    
    // Play animation before navigating
    setTimeout(() => {
      router.push(path);
    }, 600); // Duration of crt-close
  };

  useEffect(() => {
    // Reset state when the route actually changes
    setIsExiting(false);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, isExiting }}>
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <div 
          className={`w-full h-full origin-center transition-transform duration-0 ${
            isExiting ? "crt-close-animation" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </TransitionContext.Provider>
  );
};

export const useTransitionNav = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransitionNav must be used within a TransitionProvider");
  }
  return context;
};
