import {
  Shield,
  Swords,
  FlaskConical,
  Target,
  Heart,
  Zap,
  Ghost,
  RotateCcw,
  Wifi
} from "lucide-react";
import { useState } from "react";

const abilitiesData = [
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
    id: "shield",
    title: "THE SHIELD",
    type: "Defensive",
    short: "Defend your points from a total steal.",
    desc: "Essential for teams marked as the Bounty. Blocks all health damage directed at you for this duel. It prevents rivals from landing the final blow to steal 50% of your points.",
    tags: ["Survival", "Anti-Steal"],
    color: "#15803d",
  },
  {
    icon: <Swords className="w-8 h-8 md:w-10 md:h-10" />,
    id: "sword",
    title: "THE SWORD",
    type: "Aggressive",
    short: "Lower health to trigger a point theft.",
    desc: "Deals -2 health damage. Use this to push a rival toward 0 health. Eliminating a Bounty team grants you 50% of their points; normal teams grant 25%.",
    tags: ["Execute", "Steal-Setup"],
    color: "#b91c1c",
  },
  {
    icon: <FlaskConical className="w-8 h-8 md:w-10 md:h-10" />,
    id: "poison",
    title: "POISON",
    type: "Tactical",
    short: "Drain health over multiple rounds.",
    desc: "Inflicts immediate and delayed health damage. Perfect for weakening a high-point team so they become an easy target for a points-steal in later rounds.",
    tags: ["Bleed", "Weakening"],
    color: "#7e22ce",
  },
  {
    icon: <Target className="w-8 h-8 md:w-10 md:h-10" />,
    id: "arrows",
    title: "THE ARROWS",
    type: "Piercing",
    short: "Heavy damage for bounty-hunting.",
    desc: "Deals -3 health damage to cooperators. If a high-point team tries to play safe to protect their lead, use Arrows to shatter their health and take their points.",
    tags: ["High Burst", "Eliminator"],
    color: "#a16207",
  },
  {
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
    id: "potion",
    title: "HEALING POTION",
    type: "Recovery",
    short: "Emergency recovery to stay in the game.",
    desc: "Restores +3 health. If your team is being targeted for your points, use this to stay above 0 health and prevent your rivals from claiming their 25% or 50% cut.",
    tags: ["Survival", "Reset"],
    color: "#0e7490",
  },
  {
    icon: <Ghost className="w-8 h-8 md:w-10 md:h-10" />,
    id: "smoke",
    title: "SMOKE SCREEN",
    type: "Stealth",
    short: "Hide your betrayal to avoid being targeted.",
    desc: "Masks your choices. Use this to Betray without alerting the room, helping you avoid being voted as the 'Bounty' team by the other participants.",
    tags: ["Utility", "Anti-Target"],
    color: "#94a3b8",
  },
  {
    icon: <RotateCcw className="w-8 h-8 md:w-10 md:h-10" />,
    id: "time-warp",
    title: "TIME WARP",
    type: "Utility",
    short: "Negate the mutual betrayal health tax.",
    desc: "Bends the rules. If both players Betray, you take -0 health instead of -1. Keeps your health high so you aren't an easy target for elimination theft.",
    tags: ["Health Save", "Economy"],
    color: "#f472b6",
  },
  {
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10" />,
    id: "mirror",
    title: "THE MIRROR",
    type: "Reactive",
    short: "Punish those trying to steal your points.",
    desc: "If a rival uses a Sword or Arrows to eliminate you, The Mirror reflects 50% of the damage back. If you go down, you might take the point-stealer with you.",
    tags: ["Punishment", "Counter"],
    color: "#6366f1",
  },
  {
    icon: <Wifi className="w-8 h-8 md:w-10 md:h-10" />,
    id: "emp",
    title: "EMP BLAST",
    type: "Sabotage",
    short: "Disable a rival's defensive ability.",
    desc: "Shut down an opponent's Shield or Potion. Use this on a low-health team to ensure they cannot heal or defend before you land the final strike to steal their points.",
    tags: ["Disruptor", "Sabotage"],
    color: "#fbbf24",
  }
];

export function Abilities() {
  const [activeAbility, setActiveAbility] = useState<string | null>(null);

  return (
    <section id="abilities" className="relative py-12 bg-transparent overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-10">
          <p className="text-cyan-400 text-xs tracking-[0.4em] uppercase mb-4 font-mono font-bold">
            // SECRET_ARSENAL_V3.0 //
          </p>
          <h2 className="text-white mb-6 font-black font-orbitron text-4xl">
            THE <span style={{ color: "#00f5ff" }}>ARSENAL</span>
          </h2>
          <p className="text-gray-100 max-w-3xl mx-auto text-lg font-medium opacity-95">
            Every team holds a single-use Ultimate Ability. Use it to shield your progress or trigger a Bounty Raid—instantly seizing 50% of an opponent’s points.
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

              {/* Conditional Content Toggle */}
              <p className="text-gray-300 text-sm mb-4 leading-snug">
                {activeAbility === ability.id ? ability.desc : ability.short}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {ability.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-1 border border-white/10 text-white/50">{tag}</span>
                ))}
              </div>

              {/* READ MORE / COLLAPSE INDICATOR */}
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