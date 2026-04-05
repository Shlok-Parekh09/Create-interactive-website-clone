import { Trophy, Medal, Award, Star, Gift, Zap } from "lucide-react";

const mainPrizes = [
  {
    rank: "2nd",
    icon: <Medal className="w-8 h-8" />,
    amount: "₹25,000",
    label: "Runner Up",
    perks: ["Cash Prize", "Internship Opportunity", "Certificates", "Goody Bags"],
    color: "#c0c0c0",
    gradient: "from-gray-500/10 to-gray-600/5",
    border: "#c0c0c060",
    size: "scale-95",
  },
  {
    rank: "1st",
    icon: <Trophy className="w-10 h-10" />,
    amount: "₹50,000",
    label: "Grand Winner",
    perks: ["Cash Prize", "Pre-Placement Offers", "Mentorship Program", "Exclusive Swag Kit"],
    color: "#ffd700",
    gradient: "from-yellow-500/15 to-amber-500/10",
    border: "#ffd70080",
    size: "scale-105",
    featured: true,
  },
  {
    rank: "3rd",
    icon: <Award className="w-8 h-8" />,
    amount: "₹10,000",
    label: "Second Runner Up",
    perks: ["Cash Prize", "Certificates", "Goody Bags", "Online Resources"],
    color: "#cd7f32",
    gradient: "from-amber-700/10 to-orange-600/5",
    border: "#cd7f3260",
    size: "scale-95",
  },
];

const specialAwards = [
  { icon: <Star className="w-5 h-5" />, title: "Best UI/UX Design", prize: "₹5,000 + Certificate" },
  { icon: <Zap className="w-5 h-5" />, title: "Most Innovative Solution", prize: "₹5,000 + Certificate" },
  { icon: <Gift className="w-5 h-5" />, title: "Best Rookie Team", prize: "₹5,000 + Certificate" },
  { icon: <Trophy className="w-5 h-5" />, title: "Track Winner (×6)", prize: "₹3,000 × 6 Tracks" },
];

export function Prizes() {
  return (
    <section
      id="prizes"
      className="relative py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-10 rounded-full"
        style={{ background: "radial-gradient(circle, #ffd700, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // REWARDS
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            PRIZE <span style={{ color: "#ffd700" }}>POOL</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-6 mb-4" />
          <p className="text-gray-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Total prize pool worth <span className="text-yellow-400" style={{ fontFamily: "Orbitron, sans-serif" }}>₹1,00,000+</span>
          </p>
        </div>

        {/* Main prizes — podium layout */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-16">
          {mainPrizes.map((prize) => (
            <div
              key={prize.rank}
              className={`relative w-full md:w-72 p-8 border transition-all duration-300 ${prize.size} hover:scale-100`}
              style={{
                borderColor: prize.border,
                background: `linear-gradient(135deg, ${prize.gradient.replace("from-", "").replace(" to-", ", ")} transparent)`,
                backgroundColor: "#080820",
                clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                boxShadow: prize.featured ? `0 0 40px ${prize.color}20` : "none",
              }}
            >
              {prize.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs tracking-widest"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    background: "#ffd700",
                    color: "#000",
                    fontWeight: 700,
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  TOP PRIZE
                </div>
              )}

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${prize.color}, transparent)` }}
              />

              <div className="text-center">
                <div className="mb-4 flex justify-center" style={{ color: prize.color }}>
                  {prize.icon}
                </div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    color: prize.color,
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  {prize.rank} PLACE
                </div>
                <div
                  className="text-white mb-1"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    textShadow: `0 0 20px ${prize.color}40`,
                  }}
                >
                  {prize.amount}
                </div>
                <div className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {prize.label}
                </div>

                <div className="space-y-2">
                  {prize.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      <span style={{ color: prize.color }}>▸</span>
                      <span className="text-gray-300">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: `${prize.color}40` }} />
            </div>
          ))}
        </div>

        {/* Special awards */}
        <div className="text-center mb-8">
          <h3
            className="text-white"
            style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem", fontWeight: 700 }}
          >
            SPECIAL <span style={{ color: "#00f5ff" }}>AWARDS</span>
          </h3>
          <div className="w-16 h-0.5 bg-cyan-400/40 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialAwards.map((award) => (
            <div
              key={award.title}
              className="relative p-5 border border-cyan-500/20 bg-[#080820] hover:border-cyan-500/40 transition-all duration-300 group text-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              <div className="text-cyan-400 flex justify-center mb-3">{award.icon}</div>
              <div
                className="text-white mb-2"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.75rem", fontWeight: 700 }}
              >
                {award.title}
              </div>
              <div className="text-cyan-400" style={{ fontFamily: "Share Tech Mono, monospace", fontSize: "0.85rem" }}>
                {award.prize}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
