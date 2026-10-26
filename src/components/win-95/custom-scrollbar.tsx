"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Slider } from "react95";

interface CustomScrollbarProps {
  children: React.ReactNode;
}

export const CustomScrollbar = ({ children }: CustomScrollbarProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);

  // Check if content is scrollable
  const updateScrollability = useCallback(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setShowScrollbar(scrollHeight > clientHeight);
    }
  }, []);

  // Update on mount and resize
  useEffect(() => {
    updateScrollability();
    
    const resizeObserver = new ResizeObserver(updateScrollability);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("resize", updateScrollability);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollability);
    };
  }, [updateScrollability]);

  // Also check after images/content loads
  useEffect(() => {
    const timer = setTimeout(updateScrollability, 500);
    return () => clearTimeout(timer);
  }, [children, updateScrollability]);

  // Handle scroll events from the content
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        // Invert: 0% scroll = 100 slider (top), 100% scroll = 0 slider (bottom)
        setScrollPercent(100 - (scrollTop / maxScroll) * 100);
      }
    }
  }, []);

  // Handle slider changes (inverted)
  const handleSliderChange = (value: number) => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;
      // Invert: slider 100 (top) = scroll 0, slider 0 (bottom) = scroll max
      contentRef.current.scrollTop = ((100 - value) / 100) * maxScroll;
    }
  };

  return (
    <>
      {/* Main scrollable content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-auto scrollbar-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Win95 Scrollbar - Fixed position */}
      {showScrollbar && (
        <div 
          className="fixed -right-[24px] top-[60px] bottom-[60px] py-2 px-1 z-40"
          style={{ 
            background: "var(--win95-material, #c0c0c0)",
          }}
        >
          <Slider
            orientation="vertical"
            min={0}
            max={100}
            value={scrollPercent}
            onChange={(value) => handleSliderChange(value)}
            style={{ height: "100%" }}
          />
        </div>
      )}
    </>
  );
};
