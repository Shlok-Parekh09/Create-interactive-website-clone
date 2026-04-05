import { useState } from "react";
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

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>
      {/* ── Fixed full-site video background ── */}
      <video
        autoPlay
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
      {/* Dark tinted overlay — keeps video subtle and text readable */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(2,2,8,0.80) 0%, rgba(5,5,24,0.72) 50%, rgba(2,2,8,0.80) 100%)",
          zIndex: -1,
        }}
      />
      {/* Cyan/purple radial accent to tie video colours to site palette */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,245,255,0.06) 0%, rgba(139,0,255,0.04) 50%, transparent 80%)",
          zIndex: -1,
        }}
      />

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
