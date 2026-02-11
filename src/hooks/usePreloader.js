import { useState, useEffect, useRef } from "react";

const COVER_IMAGE_URL = "/cover.png";
const MIN_DISPLAY_MS = 1800;

/**
 * Tracks all critical assets loading in background.
 * Returns { isReady, progress } for the splash screen.
 *
 * @param {boolean} postsLoaded - Whether WordPress posts have been fetched
 */
export function usePreloader(postsLoaded = false) {
  const [fontsReady, setFontsReady] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [minTimeReady, setMinTimeReady] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Track font loading
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (mounted.current) setFontsReady(true);
    });
  }, []);

  // Preload cover image
  useEffect(() => {
    const img = new Image();
    img.onload = () => { if (mounted.current) setImageReady(true); };
    img.onerror = () => { if (mounted.current) setImageReady(true); }; // Don't block on error
    img.src = COVER_IMAGE_URL;
  }, []);

  // Minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mounted.current) setMinTimeReady(true);
    }, MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const tasks = [fontsReady, postsLoaded, imageReady, minTimeReady];
  const completed = tasks.filter(Boolean).length;
  const progress = Math.round((completed / tasks.length) * 100);
  const isReady = tasks.every(Boolean);

  return { isReady, progress };
}
