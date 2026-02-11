import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import SkipButton from "./SkipButton";
import "./SplashScreen.css";

const SKIP_SHOW_DELAY = 2000;

/**
 * Cinematic splash screen with storytelling frames and book-opening exit.
 * Uses GSAP timeline for orchestration.
 *
 * @param {{ isReady: boolean, progress: number, onComplete: () => void }} props
 */
export default function SplashScreen({ isReady, progress, onComplete }) {
  const [showSkip, setShowSkip] = useState(false);
  const exitingRef = useRef(false);
  const readyRef = useRef(false);
  const timelineRef = useRef(null);

  // DOM refs
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const goldenLightRef = useRef(null);

  // Frame element refs
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const misra1Ref = useRef(null);
  const misra2Ref = useRef(null);
  const coupletDividerRef = useRef(null);
  const identityGroupRef = useRef(null);
  const titleRef = useRef(null);
  const shimmerRef = useRef(null);
  const taglineRef = useRef(null);
  const missionGroupRef = useRef(null);
  const mission1Ref = useRef(null);
  const mission2Ref = useRef(null);
  const mission3Ref = useRef(null);
  const mLine1Ref = useRef(null);
  const mLine2Ref = useRef(null);
  const mLine3Ref = useRef(null);
  const exploreBtnRef = useRef(null);
  const particlesRef = useRef(null);

  // Keep readyRef in sync
  useEffect(() => {
    readyRef.current = isReady;
  }, [isReady]);

  // Show skip button after delay
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), SKIP_SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while splash is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Remove the static pre-splash from index.html
    const pre = document.getElementById("pre-splash");
    if (pre) pre.remove();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Book-opening exit animation
  const runExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(goldenLightRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(
        leftPanelRef.current,
        {
          xPercent: -105,
          rotateY: -2,
          duration: 0.98,
          ease: "power4.inOut",
        },
        "-=0.05"
      )
      .to(
        rightPanelRef.current,
        {
          xPercent: 105,
          rotateY: 2,
          duration: 0.98,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        goldenLightRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.25"
      );
  }, [onComplete]);

  // Wait for ready then exit
  const waitAndExit = useCallback(
    (minDelay = 0) => {
      const start = Date.now();
      const check = () => {
        const elapsed = Date.now() - start;
        if (readyRef.current && elapsed >= minDelay) {
          runExit();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    },
    [runExit]
  );

  // Handle skip
  const handleSkip = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    waitAndExit(0);
  }, [waitAndExit]);

  // Handle explore click
  const handleExplore = useCallback(() => {
    waitAndExit(0);
  }, [waitAndExit]);

  // Generate particles (memoized) — mixed sizes and warm tones
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const size = i < 6 ? 4 + Math.random() * 3 : 2 + Math.random() * 3;
        const isWarm = i % 5 === 0;
        return (
          <div
            key={i}
            className={isWarm ? "splash-particle splash-particle-warm" : "splash-particle"}
            style={{
              left: `${8 + Math.random() * 84}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      }),
    []
  );

  // ─── MASTER GSAP TIMELINE ───
  useEffect(() => {
    // Set initial invisible states
    const allEls = [
      dotRef, lineRef, misra1Ref, misra2Ref, coupletDividerRef,
      titleRef, shimmerRef, taglineRef, identityGroupRef,
      missionGroupRef, mission1Ref, mission2Ref, mission3Ref,
      mLine1Ref, mLine2Ref, mLine3Ref, exploreBtnRef, particlesRef,
    ];
    allEls.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0 });
    });
    gsap.set(goldenLightRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(dotRef.current, { scale: 0 });
    gsap.set(lineRef.current, { scaleX: 0 });
    if (misra1Ref.current) gsap.set(misra1Ref.current, { clipPath: "inset(0 0 0 100%)" });
    if (misra2Ref.current) gsap.set(misra2Ref.current, { clipPath: "inset(0 0 0 100%)" });
    if (titleRef.current) gsap.set(titleRef.current, { y: 20 });
    if (taglineRef.current) gsap.set(taglineRef.current, { y: 10 });
    [mission1Ref, mission2Ref, mission3Ref].forEach((r) => {
      if (r.current) gsap.set(r.current, { y: 15 });
    });
    [mLine1Ref, mLine2Ref, mLine3Ref].forEach((r) => {
      if (r.current) gsap.set(r.current, { scaleX: 0 });
    });
    if (exploreBtnRef.current) gsap.set(exploreBtnRef.current, { scale: 0.9 });

    // ── FIRST VISIT: Full cinematic timeline ──
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // === FRAME 1: THE VOID (0s – 1.8s) ===
    tl.addLabel("void")
      .to(dotRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.5)
      .to(dotRef.current, { scaleX: 3, scaleY: 0.3, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.25")
      .to(lineRef.current, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power3.out" }, "-=0.25")

      // === FRAME 2: THE COUPLET (1.8s – 5.5s) ===
      .addLabel("couplet")
      .to(coupletDividerRef.current, { opacity: 1, duration: 0.8 })
      .to(misra1Ref.current, {
        opacity: 1, clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power1.inOut",
      })
      .to(misra2Ref.current, {
        opacity: 1, clipPath: "inset(0 0 0 0%)", duration: 2.5, ease: "power1.inOut",
      }, "+=0.4")

      // === FRAME 3: THE IDENTITY (5.5s – 8.5s) ===
      .addLabel("identity")
      .to([misra1Ref.current, misra2Ref.current, coupletDividerRef.current], {
        opacity: 0.12, filter: "blur(3px)", duration: 0.5, ease: "power2.out",
      })
      .to([dotRef.current, lineRef.current], { opacity: 0, duration: 0.3 }, "<")
      .to(identityGroupRef.current, { opacity: 1, duration: 0.1 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(shimmerRef.current, { opacity: 1, x: "200%", duration: 1.0, ease: "power2.inOut" }, "-=0.5")
      .to(shimmerRef.current, { opacity: 0, duration: 0.2 })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(particlesRef.current, { opacity: 0.8, duration: 0.5 }, "-=0.4")

      // === FRAME 4: THE MISSION (8.5s – 13.5s) ===
      .addLabel("mission")
      .to([misra1Ref.current, misra2Ref.current, coupletDividerRef.current], {
        opacity: 0, duration: 0.3,
      })
      .to(identityGroupRef.current, { y: -60, scale: 0.82, duration: 0.6, ease: "power2.inOut" }, "<")
      .to(missionGroupRef.current, { opacity: 1, duration: 0.1 })
      .to(mission1Ref.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "+=0.2")
      .to(mLine1Ref.current, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.out" }, "-=0.15")
      .to(mission2Ref.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "+=0.5")
      .to(mLine2Ref.current, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.out" }, "-=0.15")
      .to(mission3Ref.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "+=0.5")
      .to(mLine3Ref.current, { opacity: 1, scaleX: 1, duration: 3, ease: "power2.out" }, "-=0.15")

      // === FRAME 5: THE INVITATION (13.5s – exit) ===
      .addLabel("invite")
      .to(missionGroupRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" })
      .to(identityGroupRef.current, { y: -30, scale: 0.9, duration: 0.4, ease: "power2.inOut" }, "<")
      .to(exploreBtnRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
      .add(() => waitAndExit(2000));

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background panels — rich gradient, split for book-opening exit */}
      <div
        ref={leftPanelRef}
        className="absolute inset-y-0 left-0 w-1/2 splash-bg-panel"
        style={{ transformOrigin: "left center" }}
      />
      <div
        ref={rightPanelRef}
        className="absolute inset-y-0 right-0 w-1/2 splash-bg-panel"
        style={{ transformOrigin: "right center" }}
      />

      {/* Ambient golden glow — adds warmth and depth */}
      <div className="splash-ambient-glow" />
      <div className="splash-ambient-orb" />

      {/* Golden center light — book exit effect */}
      <div ref={goldenLightRef} className="splash-golden-light" />

      {/* Content layer */}
      <div ref={contentRef} className="relative z-10 h-full w-full pointer-events-none">
        {/* Islamic geometric pattern with vignette fade */}
        <div className="splash-pattern-layer" />

        {/* ── Frame 1: Golden dot ── */}
        <div
          ref={dotRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C8A961] splash-dot-glow"
        />

        {/* ── Frame 1–2: Golden line ── */}
        <div
          ref={lineRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[2px] splash-line-glow"
        />

        {/* ── Frame 2: Couplet ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 px-6 max-w-4xl">
            <p
              ref={misra1Ref}
              className="text-[#F5EDE0] text-2xl md:text-[2.6rem] text-center leading-relaxed"
              style={{ direction: "rtl" }}
            >
              خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے
            </p>
            <div
              ref={coupletDividerRef}
              className="w-20 md:w-36 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, #C8A961, transparent)",
              }}
            />
            <p
              ref={misra2Ref}
              className="text-[#F5EDE0] text-2xl md:text-[2.6rem] text-center leading-relaxed"
              style={{ direction: "rtl" }}
            >
              خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے
            </p>
          </div>
        </div>

        {/* ── Frame 3–5: Title + Tagline ── */}
        <div
          ref={identityGroupRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="relative overflow-hidden px-4">
              <h1
                ref={titleRef}
                className="text-[#F5EDE0] text-[3.5rem] md:text-[7rem] lg:text-[8.5rem] leading-tight select-none"
              >
                آئینۂ اقبال
              </h1>
              <div ref={shimmerRef} className="splash-shimmer" />
            </div>
            <p
              ref={taglineRef}
              className="text-[#C8A961]/80 text-[10px] md:text-base tracking-[0.25em] uppercase select-none"
            >
              Reflection of Knowledge Towards Reality
            </p>
          </div>
        </div>

        {/* ── Frame 4: Mission text ── */}
        <div
          ref={missionGroupRef}
          className="absolute inset-x-0 top-[56%] flex flex-col items-center gap-5 md:gap-6 px-6"
        >
          <div className="text-center max-w-2xl">
            <p ref={mission1Ref} className="text-[#F5EDE0] text-lg md:text-2xl leading-relaxed">
              علامہ اقبال نے جو درد اور فکر میں ڈوب کر اشعار کہے
              <span className="block text-[#C8A961]/50 text-[10px] md:text-xs mt-1 tracking-[0.12em]">
                The pain and thought with which Iqbal wrote his poetry...
              </span>
            </p>
            <div ref={mLine1Ref} className="w-16 h-px splash-mission-line mx-auto mt-2" />
          </div>
          <div className="text-center max-w-2xl">
            <p ref={mission2Ref} className="text-[#F5EDE0] text-lg md:text-2xl leading-relaxed">
              وہ پسِ پشت رہ جاتا ہے
              <span className="block text-[#C8A961]/50 text-[10px] md:text-xs mt-1 tracking-[0.12em]">
                ...often remains overlooked
              </span>
            </p>
            <div ref={mLine2Ref} className="w-16 h-px splash-mission-line mx-auto mt-2" />
          </div>
          <div className="text-center max-w-2xl">
            <p ref={mission3Ref} className="text-[#F5EDE0] text-lg md:text-2xl leading-relaxed">
              ہم نے اس خلا کو پُر کرنے کی کوشش کی ہے
              <span className="block text-[#C8A961]/50 text-[10px] md:text-xs mt-1 tracking-[0.12em]">
                We have tried to fill this gap
              </span>
            </p>
            <div ref={mLine3Ref} className="w-16 h-px splash-mission-line mx-auto mt-2" />
          </div>
        </div>

        {/* ── Frame 5: Explore button ── */}
        <div className="absolute inset-x-0 bottom-[35%] md:bottom-[22%] flex justify-center pointer-events-auto">
          <button
            ref={exploreBtnRef}
            onClick={handleExplore}
            className="border border-[#C8A961]/50 text-[#C8A961] px-10 py-3 text-base md:text-lg tracking-[0.2em] hover:bg-[#C8A961]/10 transition-colors duration-300 cursor-pointer splash-btn-glow bg-transparent"
          >
            دیکھیں / Explore
          </button>
        </div>

        {/* ── Particles ── */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {particles}
        </div>
      </div>

      {/* Skip button */}
      <SkipButton progress={progress} onSkip={handleSkip} visible={showSkip} />
    </div>
  );
}
