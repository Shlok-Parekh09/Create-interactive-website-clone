import { Brain, Link, Wifi, Heart, DollarSign, Globe } from "lucide-react";
import { useState } from "react";

const tracks = [
  {
    icon: <Brain className="w-8 h-8" />,
    id: "ai",
    title: "AI & Machine Learning",
    short: "Leverage the power of artificial intelligence to solve real-world problems.",
    desc: "Build intelligent systems using AI, ML, Deep Learning, NLP, or Computer Vision. Create applications that learn, adapt, and evolve — from predictive analytics to generative AI solutions.",
    tags: ["Neural Networks", "NLP", "Computer Vision", "Generative AI"],
    color: "#00f5ff",
  },
  {
    icon: <Link className="w-8 h-8" />,
    id: "blockchain",
    title: "Blockchain & Web3",
    short: "Build decentralized applications that redefine trust and transparency.",
    desc: "Create decentralized solutions using blockchain, smart contracts, DeFi, NFTs, or DAOs. Build systems that ensure security, transparency, and decentralization.",
    tags: ["Smart Contracts", "DeFi", "NFTs", "DAOs"],
    color: "#8b5cf6",
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    id: "iot",
    title: "IoT & Embedded Systems",
    short: "Connect the physical and digital world through smart devices.",
    desc: "Design smart systems using microcontrollers, sensors, and embedded software. From smart cities to precision agriculture — bring intelligence to everyday objects.",
    tags: ["Arduino", "Raspberry Pi", "Edge Computing", "Smart Cities"],
    color: "#f59e0b",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    id: "health",
    title: "HealthTech",
    short: "Transform healthcare through technology-driven innovation.",
    desc: "Build tools that improve patient outcomes, enable remote diagnostics, or democratize access to healthcare. Use AI, wearables, or telemedicine to save lives.",
    tags: ["Telemedicine", "Wearables", "Mental Health", "Medical AI"],
    color: "#ef4444",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    id: "fintech",
    title: "FinTech",
    short: "Reimagine financial services for the next billion users.",
    desc: "Solve financial inclusion, payment infrastructure, lending, or fraud detection. Build solutions that empower individuals and small businesses to thrive financially.",
    tags: ["Digital Payments", "Microfinance", "Fraud Detection", "InsurTech"],
    color: "#10b981",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    id: "open",
    title: "Open Innovation",
    short: "Got a wild idea that doesn't fit a box? This track is for you.",
    desc: "No constraints. Build anything that creates meaningful impact — EdTech, ClimaTech, AgriTech, GovTech, or anything in between. Innovation knows no boundaries.",
    tags: ["EdTech", "ClimaTech", "AgriTech", "GovTech"],
    color: "#f472b6",
  },
];

export function Tracks() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <section
      id="tracks"
      className="relative py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-3"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // PROBLEM DOMAINS
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            HACKATHON <span style={{ color: "#00f5ff" }}>TRACKS</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Choose your battleground. Six tracks, infinite possibilities.
          </p>
        </div>

        {/* Track cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
              className="relative p-6 border cursor-pointer transition-all duration-300 group"
              style={{
                borderColor: activeTrack === track.id ? track.color : `${track.color}25`,
                backgroundColor: activeTrack === track.id ? `${track.color}08` : "#080820",
                clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                boxShadow: activeTrack === track.id ? `0 0 20px ${track.color}20` : "none",
                transform: activeTrack === track.id ? "translateY(-4px)" : "none",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${track.color}, transparent)`,
                  opacity: activeTrack === track.id ? 1 : 0.3,
                }}
              />

              <div className="mb-4" style={{ color: track.color }}>
                {track.icon}
              </div>
              <h3
                className="text-white mb-3"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
              >
                {track.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {activeTrack === track.id ? track.desc : track.short}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1"
                    style={{
                      fontFamily: "Share Tech Mono, monospace",
                      color: track.color,
                      backgroundColor: `${track.color}10`,
                      border: `1px solid ${track.color}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expand indicator */}
              <div className="mt-4 text-xs" style={{ color: `${track.color}80`, fontFamily: "Share Tech Mono, monospace" }}>
                {activeTrack === track.id ? "▲ Show less" : "▼ Read more"}
              </div>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${track.color}60` }} />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: `${track.color}40` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
