import { Code2, Users, Trophy, Heart, Shield, Swords, Activity } from "lucide-react";

const features = [
  {
    icon: <Swords className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Strategy & Survival",
    desc: "Every team starts with 10 health[cite: 16]. Negotiate, bluff, and betray to keep your team alive[cite: 9, 14].",
  },
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Triad Teams",
    desc: "Form a powerhouse of 3[cite: 18]. Each matchup consists of three high-stakes 1-on-1 duels[cite: 21].",
  },
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Secret Abilities",
    desc: "Unleash one-time powers like The Shield or Poison to swing the duel in your favor[cite: 70, 74].",
  },
  {
    icon: <Activity className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Bounty System",
    desc: "Betrayal triggers unblockable point deductions that serve as the Arena's justice[cite: 52, 56].",
  },
];

export function About() {
  return (
    // Reduced py-32 to py-16 to fit more on the screen at once
    <section id="about" className="relative py-16 bg-transparent overflow-hidden">

      {/* Accents scaled down for better visibility */}
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }} />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #8b00ff, transparent)" }} />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header - Scaled down */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-4 font-mono">// SYSTEM_DATA: THE_ARENA_RULES_V3.0 [cite: 5]</p>
          <h2 className="text-white mb-6 font-black tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            WHAT IS <span style={{ color: "#00f5ff" }}>THE MATRIX</span>?
          </h2>
          <p className="text-gray-100 max-w-4xl mx-auto leading-relaxed text-lg md:text-2xl font-medium opacity-90" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            The Matrix is SANKHYA's premier Game Theory Arena[cite: 8]. Face off in a round-robin format [cite: 20] where you decide between mutual cooperation (+3 pts) or risky betrayal (+5 pts)[cite: 43]. Managing health is critical: hit 0, and face immediate elimination[cite: 15, 16].
          </p>
        </div>

        {/* Tactical Cards - Reduced padding and min-height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="relative p-8 border-2 border-cyan-500/30 bg-[#080820]/80 backdrop-blur-md group transition-all duration-500 hover:border-cyan-400 min-h-[220px] flex flex-col justify-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))" }}
            >
              <div className="text-cyan-400 mb-4">{feat.icon}</div>
              <h3 className="text-white mb-2 uppercase tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.5rem", fontWeight: 800 }}>
                {feat.title}
              </h3>
              <p className="text-gray-200 text-sm md:text-base leading-snug font-space-grotesk">{feat.desc}</p>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
            </div>
          ))}
        </div>

        {/* Compact Stats Bar - Smaller text and padding */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cyan-500/30 border-2 border-cyan-500/40 overflow-hidden rounded-xl shadow-lg">
          {[
            { value: "3", label: "Players Per Team" }, // [cite: 18]
            { value: "10", label: "Initial Health" }, // [cite: 16]
            { value: "₹3K+", label: "Total Prize Pool" },
            { value: "5-6", label: "Tournament Rounds" }, // [cite: 23]
          ].map((stat) => (
            <div key={stat.label} className="bg-[#050518]/90 backdrop-blur-sm p-8 text-center group transition-colors">
              <div className="text-cyan-400 mb-2 flex flex-row items-center justify-center gap-3" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "2.5rem", fontWeight: 900 }}>
                <span>{stat.value}</span>
                {stat.label === "Initial Health" && (
                  <Heart size={32} className="text-red-500 fill-red-500 animate-pulse" />
                )}
              </div>
              <div className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest font-space-grotesk">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Compact Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm tracking-[0.4em] uppercase font-mono opacity-80">* OFFICIAL CERTIFICATION FOR ALL COMPETITORS *</p>
        </div>
      </div>
    </section>
  );
}