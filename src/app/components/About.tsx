import { Code2, Users, Trophy, Shield, Swords, Activity } from "lucide-react";

const features = [
  {
    icon: <Swords className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Strategy & Survival",
    desc: "Every team starts with 10 health. Negotiate, bluff, and betray to keep your team alive.",
  },
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Triad Teams",
    desc: "Form a powerhouse of 3. Each matchup consists of three high-stakes 1-on-1 duels.",
  },
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Secret Abilities",
    desc: "Unleash one-time powers to swing the duel in your favor.",
  },
  {
    icon: <Activity className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Bounty System",
    desc: "The Arena's justice.",
  },
];

export function About() {
  return (
    // Reduced py-32 to py-16 to fit more on the screen at once
    <section id="about" className="relative py-16 bg-transparent overflow-hidden">

      {/* Accents scaled down for better visibility */}
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }} />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #8b00ff, transparent)" }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header - Scaled down */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-4 font-mono">// SYSTEM_DATA: THE_ARENA_RULES_V3.0 </p>
          <h2 className="text-white mb-6 font-black tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            WHAT IS <span style={{ color: "#00f5ff" }}>THE MATRIX</span>?
          </h2>
          <p className="text-gray-100 max-w-4xl mx-auto leading-relaxed text-justify md:text-2xl font-medium opacity-90 mb-12" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Step into SANKHYA’s most ruthless simulation, where game theory is stripped of its abstractions and forged into a weapon. In this high-stakes circuit, every round forces a choice between the collective safety of the group and the predatory allure of the solo surge.
          </p>
          {/* Embedded YouTube Video */}
          <div className="relative w-full max-w-4xl mx-auto mb-8 aspect-video border-2 border-cyan-500/40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.2)]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/lPmOu3xA98Y"
              title="What is the Matrix?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          </div>
        </div>

        {/* Rules List Section */}
        <div className="max-w-4xl mx-auto text-left mb-10" >
          <ul className="space-y-6 text-gray-100 leading-relaxed text-lg md:text-xl font-medium opacity-90" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <li className="flex gap-4">
              <span className="text-cyan-400 font-mono">[01]</span>
              <span>
                <strong className="text-cyan-400 uppercase tracking-wider">Cooperate (+3 Points):</strong> Play the long game. Choose mutual benefit for a steady, reliable climb up the leaderboard.
              </span>
            </li>

            <li className="flex gap-4">
              <span className="text-cyan-400 font-mono">[02]</span>
              <span>
                <strong className="text-cyan-400 uppercase tracking-wider">Betray (+5 Points):</strong> Execute a lethal spike. Maximize your gain at the cost of your connection, but prepare for the fallout.
              </span>
            </li>

            <li className="flex gap-4">
              <span className="text-cyan-400 font-mono">[03]</span>
              <span>
                <strong className="text-cyan-400 uppercase tracking-wider">The Currency of Life:</strong> Forget credits—your Health is the only resource that matters.
              </span>
            </li>

            <li className="flex gap-4" >
              <span className="text-cyan-400 font-mono">[04]</span>
              <span>
                <strong className="text-rose-500 uppercase tracking-wider">Permanent Disconnection:</strong> The system is unforgiving. If your Health hits zero, your feed is cut and you are purged from the circuit forever.
              </span>
            </li>
          </ul>
        </div>

        {/* Tactical Cards - Reduced padding and min-height */}
        <div id="rules" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
            { value: "3", label: "Players Per Team" },
            { value: "10", label: "Initial Health" },
            { value: "₹3K+", label: "Total Prize Pool" },
            { value: "4", label: "Tournament Rounds" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#050518]/90 backdrop-blur-sm p-8 text-center group transition-colors">
              <div className="text-cyan-400 mb-2 flex flex-row items-center justify-center gap-0" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "2.5rem", fontWeight: 900 }}>
                <span>{stat.value}</span>
                {stat.label === "Initial Health" && (
                  <img
                    src="/pixel_heart.png"
                    alt="pixel heart"
                    width={90}
                    height={90}
                    style={{ imageRendering: "pixelated", marginLeft: "-18px", marginRight: "-18px", transform: "translateY(8px)" }}
                  />
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