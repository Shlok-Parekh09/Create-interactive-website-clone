import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  onRegister: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Updated to your specific event date
const EVENT_DATE = new Date("2026-04-23T10:00:00");

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (((i * 37 + 13) * 97) % 100),
  top: (((i * 53 + 7) * 83) % 100),
  duration: 3 + (i % 4),
  delay: (i * 0.3) % 4,
}));

function useCountdown(targetTimestamp: number): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetTimestamp - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-cyan-500/40 bg-[#050518]/80 backdrop-blur-sm"
        style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
      >
        <div className="absolute inset-0 bg-cyan-500/5" />
        <span
          className="text-cyan-400 relative z-10"
          style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", fontWeight: 700 }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <div className="absolute inset-0 shadow-inner shadow-cyan-500/10" />
      </div>
      <span
        className="text-gray-400 mt-2 text-xs tracking-widest uppercase"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Hero({ onRegister }: HeroProps) {
  const eventTimestamp = EVENT_DATE.getTime();
  const timeLeft = useCountdown(eventTimestamp);

  const scrollToAbout = () => {
    document.querySelector("#rules")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridMove 20s linear infinite",
          zIndex: 1,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          width: "min(80vw, 800px)",
          height: "min(80vw, 800px)",
          background: "radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(139,0,255,0.2) 40%, transparent 70%)",
          zIndex: 5,
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            zIndex: 5,
          }}
        />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50" style={{ zIndex: 5 }} />
      <div className="absolute top-20 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50" style={{ zIndex: 5 }} />
      <div className="absolute bottom-20 left-8 w-16 h-16 border-b-2 border-l-2 border-purple-500/50" style={{ zIndex: 5 }} />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-b-2 border-r-2 border-purple-500/50" style={{ zIndex: 5 }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-3 max-w-xl mx-auto sm:max-w-3xl lg:max-w-5xl">
       {/* Slim Badge */}
  <div 
    className="inline-flex items-center gap-2 mb-4 px-4 py-0.5 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs tracking-[0.3em] uppercase"
    style={{ 
      fontFamily: "Share Tech Mono, monospace",
      clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" // Adds a slight "cyberpunk" slant for extra slimness
    }}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    SANKHYA PRESENTS
  </div>

        {/* Main Title */}
        <h1
          className="text-white mb-2 mt-4 leading-none"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 900,
            textShadow: "0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)",
            letterSpacing: "-2px",
          }}
        >
          THE <span style={{ color: "#00f5ff" }}>MATRIX</span>26
        </h1>
        <div
          className="text-purple-400 mb-6"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            letterSpacing: "0.3em",
            textShadow: "0 0 20px rgba(139,0,255,0.6)",
          }}
        >
          PRISONER'S DILEMMA 2026
        </div>

        {/* Tagline */}
        <p
          className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          }}
        >
          A High-Stakes Game Theory Challenge • April 23, 2026 • Mumbai
          <br />
          <span className="text-cyan-300/80">Collaborate to survive. Betray to win. Solve the logic.</span>
        </p>

        {/* Countdown */}
        <div className="mb-10">
          <p
            className="text-gray-500 mb-4 text-xs tracking-widest uppercase"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            — Free your mind —
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <span className="text-cyan-400 mt-6 text-2xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <span className="text-cyan-400 mt-6 text-2xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <span className="text-cyan-400 mt-6 text-2xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
          <button
            onClick={onRegister}
            className="relative w-full sm:w-auto px-8 sm:px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 overflow-hidden group"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              boxShadow: "0 0 30px rgba(0,245,255,0.3)",
            }}
          >
            <span className="relative z-10">ENTER THE MATRIX</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </button>
          <button
            onClick={scrollToAbout}
            className="relative w-full sm:w-auto px-8 sm:px-10 py-4 border border-cyan-500/60 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            }}
          >
            THE RULES
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-cyan-400 transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}