import {
  Shield,
  Swords,
  FlaskConical,
  Target,
  Heart,
  Zap,
  Scale,
  TrendingUp,
  Link2
} from "lucide-react";
import { useState } from "react";

const abilitiesData = [
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
    id: "aegis",
    title: "AEGIS OF DEFLECTION",
    type: "Defensive",
    short: "Full match protection with a counter-bonus.",
    desc: "Blocks all health damage for the entire match. If you Cooperate while the opponent Betrays, you gain +4 bonus points and they receive 0.",
    tags: ["Full-Match Guard", "Point Counter"],
    color: "#15803d",
  },
  {
    icon: <Swords className="w-8 h-8 md:w-10 md:h-10" />,
    id: "sword",
    title: "THE SWORD",
    type: "Aggressive",
    short: "Heavy strike and point theft.",
    desc: "Deals -4 health damage instantly. If you choose to Betray this round, you also steal 2 points directly from the opponent's total score.",
    tags: ["High Damage", "Point Steal"],
    color: "#b91c1c",
  },
  {
    icon: <FlaskConical className="w-8 h-8 md:w-10 md:h-10" />,
    id: "poison",
    title: "VIPER'S KISS",
    type: "Tactical",
    short: "Corrosive toxin that drains health over time.",
    desc: "Target immediately loses -2 HP. They continue to lose -2 HP at the start of their next two matches. Bypasses shields played in later matches.",
    tags: ["Status Effect", "Attrition"],
    color: "#7e22ce",
  },
  {
    icon: <Target className="w-8 h-8 md:w-10 md:h-10" />,
    id: "arrow",
    title: "THE SNIPER ARROW",
    type: "Precision",
    short: "The ultimate prediction counter.",
    desc: "Must Cooperate to fire. If the opponent Betrays, they lose -5 HP. If the opponent Cooperates, you gain +5 bonus points.",
    tags: ["Mind Games", "Match Finisher"],
    color: "#a16207",
  },
  {
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
    id: "mend",
    title: "MEND OF THE MARTYR",
    type: "Recovery",
    short: "Massive health surge for peaceful teams.",
    desc: "Restores +5 health to your team. Only triggers if you reveal a Cooperate card. If you Betray, the heal fails and the ability is wasted.",
    tags: ["Heal", "Risk/Reward"],
    color: "#0e7490",
  },
  {
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
    id: "gambit",
    title: "GAMBIT'S TRIPLE",
    type: "Financial",
    short: "Triple your round earnings.",
    desc: "Triples (3x) the points you receive for the current round. Note: If the outcome results in 0 points (Opponent Betrays), you gain nothing.",
    tags: ["High Stakes", "Point Farming"],
    color: "#f472b6",
  },
  {
    icon: <Link2 className="w-8 h-8 md:w-10 md:h-10" />,
    id: "blood-link",
    title: "BLOOD LINK",
    type: "Reactive",
    short: "Reflect damage for the entire match.",
    desc: "For all 3 rounds of the match, any health damage dealt to you is also dealt back to the opponent. The ultimate deterrent against aggression.",
    tags: ["Deterrent", "Mirror"],
    color: "#6366f1",
  },
  {
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10" />,
    id: "vampire",
    title: "VAMPIRIC PACT",
    type: "Hybrid",
    short: "Drain health and gain points.",
    desc: "Drains -2 HP from opponent and heals you +2 HP. If you Betray, you gain +3 bonus points from the bank.",
    tags: ["Sustain", "Leech"],
    color: "#fbbf24",
  },
  {
    icon: <Scale className="w-8 h-8 md:w-10 md:h-10" />,
    id: "justice",
    title: "JUSTICE'S SCALE",
    type: "Utility",
    short: "The ultimate comeback mechanic.",
    desc: "If opponent leads in Points: Deal -4 HP. If opponent leads in Health: Steal 4 points. If they lead in both, both effects trigger.",
    tags: ["Comeback", "Anti-Lead"],
    color: "#94a3b8",
  }
];

export function Abilities() {
  const [activeAbility, setActiveAbility] = useState<string | null>(null);

  return (
    <section id="abilities" className="relative py-12 bg-transparent overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-10">
          <p className="text-cyan-400 text-xs tracking-[0.4em] uppercase mb-4 font-mono font-bold">
            // SECRET_ARSENAL_V4.0 //
          </p>
          <h2 className="text-white mb-6 font-black font-orbitron text-4xl">
            THE <span style={{ color: "#00f5ff" }}>ARSENAL</span>
          </h2>
          <p className="text-gray-100 max-w-3xl mx-auto text-lg font-medium opacity-95">
            You have nine tools, but only <span className="text-cyan-400 font-bold underline">three charges</span> across 12 rounds. Choose your moments wisely; an Ultimate can turn a defeat into a landslide victory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {abilitiesData.map((ability) => (
            <div
              key={ability.id}
              onClick={() => setActiveAbility(activeAbility === ability.id ? null : ability.id)}
              className="relative p-6 border-2 cursor-pointer transition-all duration-300 bg-[#080820]"
              style={{
                borderColor: activeAbility === ability.id ? ability.color : `${ability.color}40`,
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div style={{ color: ability.color }}>{ability.icon}</div>
                <span className="text-[9px] font-mono font-bold px-2 py-1 border border-white/20 uppercase" style={{ color: ability.color }}>
                  {ability.type}
                </span>
              </div>

              <h3 className="text-white mb-2 uppercase font-orbitron text-lg font-black">{ability.title}</h3>

              <p className="text-gray-300 text-sm mb-4 leading-snug min-h-[40px]">
                {activeAbility === ability.id ? ability.desc : ability.short}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {ability.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-1 border border-white/10 text-white/50">{tag}</span>
                ))}
              </div>

              <div className="mt-2 text-[9px] font-mono uppercase tracking-widest" style={{ color: `${ability.color}` }}>
                {activeAbility === ability.id ? "▲ COLLAPSE" : "▼ READ FULL EFFECT"}
              </div>

              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${ability.color}60` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}