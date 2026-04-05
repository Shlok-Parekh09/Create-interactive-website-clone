import { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Timeline } from "./components/Timeline";
import { Tracks } from "./components/Tracks";
import { Prizes } from "./components/Prizes";
import { Sponsors } from "./components/Sponsors";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { RegistrationModal } from "./components/RegistrationModal";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      console.log("Initial autoplay prevented by browser.");
    });

    let lastScrollY = window.scrollY;
    let targetTime = 0;
    let isRewinding = false;
    let animationFrameId: number;

    // 🏎️ The "Engine" that makes rewinding buttery smooth
    const smoothRewind = () => {
      if (!video || !isRewinding) return;

      // Glide current time 10% of the way towards the target time every frame
      video.currentTime += (targetTime - video.currentTime) * 0.1;

      // If we are close enough to the target, stop the animation loop
      if (Math.abs(targetTime - video.currentTime) < 0.01) {
        isRewinding = false;
        video.pause();
      } else {
        animationFrameId = requestAnimationFrame(smoothRewind);
      }
    };

    const handleScroll = () => {
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);

      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // ⭐ NEW: If near top → behave like initial load
      if (currentScrollY < 50) {
        isRewinding = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        video.play().catch(() => { });
        return;
      }

      if (deltaY > 0) {
        // 🖱️ Scroll DOWN
        isRewinding = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (video.paused) video.play().catch(() => { });
      }
      else if (deltaY < 0) {
        // 👆 Scroll UP (rewind)
        video.pause();

        if (!isRewinding) {
          targetTime = video.currentTime;
          isRewinding = true;
          smoothRewind();
        }

        const rewindAmount = Math.abs(deltaY) * 0.008;
        targetTime = Math.max(0, targetTime - rewindAmount);
      }

      scrollTimeout.current = window.setTimeout(() => {
        if (!isRewinding) {
          video.pause();
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/video/Video%20Project%202.mp4" type="video/mp4" />
      </video>

      {/* Dark tinted overlay */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(2,2,8,0.80) 0%, rgba(5,5,24,0.72) 50%, rgba(2,2,8,0.80) 100%)",
        zIndex: -1,
      }} />

      {/* Cyan/purple radial accent */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 30%, rgba(0,245,255,0.06) 0%, rgba(139,0,255,0.04) 50%, transparent 80%)",
        zIndex: -1,
      }} />

      <Navbar onRegister={() => setIsRegisterOpen(true)} />
      <Hero onRegister={() => setIsRegisterOpen(true)} />
      <About />
      <Timeline />
      <Tracks />
      <Prizes />
      <Sponsors />
      <FAQ />
      <Footer onRegister={() => setIsRegisterOpen(true)} />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}