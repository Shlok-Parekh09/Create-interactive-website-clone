import { Code2, Users, Trophy, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Build & Innovate",
    desc: "Code, design, and prototype your ideas in 36 non-stop hours alongside the brightest minds.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborate",
    desc: "Form teams of 2–4 members and collaborate with students from across the country.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Win Big",
    desc: "Compete for a prize pool of ₹1 Lakh+ along with internship opportunities and goodies.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Learn & Grow",
    desc: "Attend workshops, mentorship sessions, and talks by industry leaders and experts.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ background: "transparent" }}>
      {/* Background accent */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #8b00ff, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // ABOUT THE EVENT
          </p>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            WHAT IS <span style={{ color: "#00f5ff" }}>NEOFUTURE</span>?
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
          <p
            className="text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.05rem" }}
          >
            NeoFuture is SLRTCE's flagship 36-hour hackathon — a battleground for innovators, dreamers, and
            builders. Whether you're a coder, designer, or entrepreneur, this is your launchpad to create
            solutions that shape the future. With cutting-edge problem statements spanning AI, Blockchain, IoT,
            and more, NeoFuture challenges you to push beyond limits and build something extraordinary.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="relative p-6 border border-cyan-500/20 hover:border-cyan-500/50 bg-[#080820]/50 group transition-all duration-300 hover:-translate-y-1"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-cyan-400 mb-4 relative z-10">{feat.icon}</div>
              <h3
                className="text-white mb-2 relative z-10"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
              >
                {feat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {feat.desc}
              </p>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400/40" />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-500/10 border border-cyan-500/20 overflow-hidden"
          style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
        >
          {[
            { value: "500+", label: "Registered Participants" },
            { value: "50+", label: "Expert Mentors" },
            { value: "₹1L+", label: "Total Prize Pool" },
            { value: "6", label: "Problem Tracks" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#050518] p-8 text-center">
              <div
                className="text-cyan-400 mb-2"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "2rem", fontWeight: 800 }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
