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

// Fixed date outside component to avoid recreating on every render
const HACKATHON_DATE = new Date("2026-04-25T09:00:00");

// Pre-generated particle data to avoid Math.random() in render
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
  }, [targetTimestamp]); // stable number, not a Date object

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-cyan-500/40 bg-[#050518]/80 backdrop-blur-sm"
        style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
      >
        <div className="absolute inset-0 bg-cyan-500/5" />
        <span
          className="text-cyan-400 relative z-10"
          style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.8rem", fontWeight: 700 }}
        >
          {String(value).padStart(2, "0")}
        </span>
        {/* Glow effect */}
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
  const hackathonTimestamp = HACKATHON_DATE.getTime();
  const timeLeft = useCountdown(hackathonTimestamp);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
        style={{
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
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-xs tracking-widest uppercase"
          style={{ fontFamily: "Share Tech Mono, monospace" }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          SLRTCE PRESENTS
        </div>

        {/* Main Title */}
        <h1
          className="text-white mb-2 leading-none"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 900,
            textShadow: "0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)",
            letterSpacing: "-2px",
          }}
        >
          NEO<span style={{ color: "#00f5ff" }}>FUTURE</span>
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
          HACKATHON 2026
        </div>

        {/* Tagline */}
        <p
          className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          }}
        >
          36 Hours of Innovation • April 25–27, 2026 • SLRTCE, Mumbai
          <br />
          <span className="text-cyan-300/80">Build the future. Break boundaries. Leave a legacy.</span>
        </p>

        {/* Countdown */}
        <div className="mb-10">
          <p
            className="text-gray-500 mb-4 text-xs tracking-widest uppercase"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            — COUNTDOWN TO HACKATHON —
          </p>
          <div className="flex items-start justify-center gap-4 sm:gap-6">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <span className="text-cyan-400 mt-6 text-3xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <span className="text-cyan-400 mt-6 text-3xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <span className="text-cyan-400 mt-6 text-3xl" style={{ fontFamily: "Orbitron, sans-serif" }}>:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onRegister}
            className="relative px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 overflow-hidden group"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              boxShadow: "0 0 30px rgba(0,245,255,0.3)",
            }}
          >
            <span className="relative z-10">REGISTER NOW</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </button>
          <button
            onClick={scrollToAbout}
            className="relative px-10 py-4 border border-cyan-500/60 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            }}
          >
            LEARN MORE
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Participants" },
            { value: "₹1L+", label: "Prize Pool" },
            { value: "36H", label: "Duration" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-cyan-400"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs mt-1 tracking-wider uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
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