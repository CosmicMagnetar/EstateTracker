'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CursorProps {
  themeClasses?: {
    cursor?: string;
  };
}

const CustomCursor: React.FC<CursorProps> = ({ themeClasses = { cursor: 'bg-white' } }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shouldShowCursor, setShouldShowCursor] = useState(true);

  useEffect(() => {
    // Mobile device detection (user-agent)
    const isMobileDevice = () => {
      const ua = navigator.userAgent.toLowerCase();
      return /android|iphone|ipad|mobile|touch/.test(ua);
    };

    // Small screen detection (width)
    const isSmallScreen = () => window.innerWidth < 768; // Tailwind's md: breakpoint

    const evaluateVisibility = () => {
      if (isMobileDevice() || isSmallScreen()) {
        setShouldShowCursor(false);
      } else {
        setShouldShowCursor(true);
      }
    };

    evaluateVisibility(); // check once on mount
    window.addEventListener('resize', evaluateVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', evaluateVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!shouldShowCursor) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out mix-blend-difference`}
      style={{
        transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
