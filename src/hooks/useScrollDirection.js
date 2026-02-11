import { useState, useEffect, useRef, useCallback } from "react";

const SCROLL_THRESHOLD = 12; // px — prevents flickering on tiny scrolls

/**
 * Detects scroll direction with debounced threshold.
 * Returns { direction, isAtTop } for navbar hide/show logic.
 *
 * @returns {{ direction: "up" | "down", isAtTop: boolean }}
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateDirection = useCallback(() => {
    const currentY = window.scrollY;

    setIsAtTop(currentY < 20);

    const diff = currentY - lastScrollY.current;

    if (Math.abs(diff) >= SCROLL_THRESHOLD) {
      setDirection(diff > 0 ? "down" : "up");
      lastScrollY.current = currentY;
    }

    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateDirection);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateDirection]);

  return { direction, isAtTop };
}
