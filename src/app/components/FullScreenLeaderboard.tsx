import { useMemo, useState, useEffect } from "react";
import { Users, Trophy, ChevronLeft, Activity } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const HEART_IMAGE_SRC = "/minecraft_hardcore_heart.png";
const EMPTY_HEART_IMAGE_SRC = "/minecraft_hardcore_null.png";

export type Player = { name: string; points: number; };
export type TeamProps = {
  id: number;
  name: string;
  health: number;
  points: number;
  isBounty: boolean;
  history: string[];
  color: string;
  players?: Player[];
};

function TeamCredits({ points, showPoints }: { points: number; showPoints: boolean }) {
  const [prevPoints, setPrevPoints] = useState(points);
  const [animationType, setAnimationType] = useState<"pop" | "spin" | "burst" | null>(null);
  const [burstCoins, setBurstCoins] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);
  const [floaters, setFloaters] = useState<{ id: number; delta: number }[]>([]);

  useEffect(() => {
    if (points !== prevPoints) {
      const delta = points - prevPoints;

      // Floating text logic
      const floaterId = Date.now();
      setFloaters(prev => [...prev, { id: floaterId, delta }]);
      setTimeout(() => {
        setFloaters(prev => prev.filter(f => f.id !== floaterId));
      }, 1000);

      // Coin animations
      if (delta > 0) {
        if (delta >= 5) {
          setAnimationType("burst");
          const newCoins = Array.from({ length: Math.min(delta + 2, 12) }).map((_, i) => ({
            id: Date.now() + i,
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 120 - 30,
            rotate: Math.random() * 360
          }));
          setBurstCoins(newCoins);
          setTimeout(() => {
            setAnimationType(null);
            setBurstCoins([]);
          }, 1000);
        } else if (delta >= 3) {
          setAnimationType("spin");
          setTimeout(() => setAnimationType(null), 500);
        } else {
          setAnimationType("pop");
          setTimeout(() => setAnimationType(null), 400);
        }
      }

      setPrevPoints(points);
    }
  }, [points, prevPoints]);

  return (
    <div className="flex flex-row items-center gap-2 relative">
      <div className="text-sm sm:text-lg md:text-2xl font-black font-orbitron text-white z-10 relative leading-none">
        {showPoints ? points : "[REDACTED]"}

        {/* Floating Numbers */}
        <AnimatePresence>
          {floaters.map(f => (
            <motion.div
              key={f.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1 font-bold font-mono text-xs md:text-sm pointer-events-none z-50 ${f.delta > 0 ? "text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" : "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]"}`}
            >
              {f.delta > 0 ? `+${f.delta}` : f.delta}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative">
        <motion.img
          src="/coin.png"
          alt="Coin"
          draggable={false}
          className="w-5 h-5 md:w-6 md:h-6 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] select-none pointer-events-none relative z-20"
          animate={
            animationType === "spin" ? { rotateY: [0, 360] } :
              animationType === "pop" ? { scale: [1, 1.4, 1], y: [0, -10, 0] } :
                animationType === "burst" ? { scale: [1, 1.3, 1] } : { rotateY: 0, scale: 1, y: 0 }
          }
          transition={{
            duration: animationType === "spin" ? 0.5 : 0.4,
            ease: "easeInOut"
          }}
        />

        <AnimatePresence>
          {burstCoins.map(coin => (
            <motion.img
              key={coin.id}
              src="/coin.png"
              draggable={false}
              initial={{ opacity: 1, scale: 0.2, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.2, x: coin.x, y: coin.y, rotate: coin.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-0.5 left-0.5 w-4 h-4 md:w-5 md:h-5 object-contain pointer-events-none select-none z-10"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FullScreenLeaderboard({ teams, showPoints }: { teams: TeamProps[], showPoints: boolean }) {
  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);

  // Global rankings for the # displayed on the card
  const globalRankings = useMemo(() => {
    return [...teams].sort((a, b) => b.points - a.points);
  }, [teams]);

  // Pool Logic: Locked by ID, Sorted by Points within the pool
  const teamPools = useMemo(() => {
    const pools: TeamProps[][] = [];
    const poolGroups: { [key: number]: TeamProps[] } = {};
    const baseTeams = [...teams].sort((a, b) => a.id - b.id);

    baseTeams.forEach((team, index) => {
      const poolIndex = Math.floor(index / 5);
      if (!poolGroups[poolIndex]) poolGroups[poolIndex] = [];
      poolGroups[poolIndex].push(team);
    });

    Object.keys(poolGroups).forEach((key) => {
      const pool = poolGroups[parseInt(key)].sort((a, b) => b.points - a.points);
      pools.push(pool);
    });
    return pools;
  }, [teams]);

  return (
    <div className="fixed inset-0 z-[100] bg-transparent flex flex-col font-space-grotesk overflow-hidden">
      {/* Header */}
      <div className="relative z-10 px-4 py-4 md:px-8 md:py-6 border-b border-white/5 bg-[#050518]/60 backdrop-blur-xl flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping flex-shrink-0" />
          <h1 className="text-white font-orbitron text-lg md:text-2xl font-black tracking-tighter uppercase">
            The <span className="text-cyan-400">Leaderboard</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 relative z-10 px-3 py-6 md:px-6 md:py-8 overflow-y-auto">
        <LayoutGroup> {/* Ensures all cards animate together smoothly */}
          <div className="max-w-5xl mx-auto space-y-12">
            {teamPools.map((pool, poolIndex) => (
              <div key={`pool-${poolIndex}`} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <span className="font-mono text-[10px] text-cyan-400 tracking-[0.5em] uppercase">SECTOR {poolIndex + 1}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                </div>

                <div className="flex flex-col gap-4">
                  {pool.map((team) => {
                    const isExpanded = expandedTeamId === team.id;
                    const globalRank = globalRankings.findIndex(t => t.id === team.id) + 1;

                    return (
                      <motion.div
                        layout
                        transition={{ layout: { type: "tween", duration: 0.05 } }}
                        key={team.id}
                        onClick={() => !isExpanded && setExpandedTeamId(team.id)}
                        className={`relative w-full cursor-pointer overflow-hidden transition-all duration-75 ${isExpanded ? 'z-50' : 'z-10'}`}
                        style={{
                          background: "#050518",
                          border: `2px solid ${team.isBounty ? "#eab308" : team.color + "40"}`,
                          clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                        }}
                      >
                        {/* Standard Leaderboard View */}

                        {/* MOBILE layout: stacked (name → hearts → credits) */}
                        <div className="flex md:hidden flex-col px-3 py-3 gap-2">
                          {/* Row 1: Rank + Name */}
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-orbitron text-2xl font-black leading-none shrink-0" style={{ color: team.color }}>
                              #{String(globalRank).padStart(2, "0")}
                            </span>
                            <h3 className="text-white text-base font-black font-orbitron uppercase truncate">
                              {team.name}
                            </h3>
                            {isExpanded && (
                              <motion.button
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                onClick={(e) => { e.stopPropagation(); setExpandedTeamId(null); }}
                                className="flex items-center gap-1 text-cyan-400 text-[10px] uppercase font-bold whitespace-nowrap ml-auto"
                              >
                                <ChevronLeft size={12} /> Back
                              </motion.button>
                            )}
                          </div>
                          {/* Row 2: Hearts */}
                          <div className="flex flex-row flex-nowrap items-center justify-center gap-[2px]">
                            {[...Array(10)].map((_, i) => (
                              <img
                                key={i}
                                src={i < team.health ? HEART_IMAGE_SRC : EMPTY_HEART_IMAGE_SRC}
                                draggable={false}
                                className="object-contain select-none pointer-events-none shrink-0"
                                style={{
                                  imageRendering: "pixelated",
                                  width: "clamp(22px, 8vw, 36px)",
                                  height: "clamp(22px, 8vw, 36px)",
                                  filter: i < team.health ? `drop-shadow(0 0 4px ${team.color})` : 'opacity(0.2)'
                                }}
                              />
                            ))}
                          </div>
                          {/* Row 3: Credits */}
                          <div className="flex items-center gap-2">
                            <div className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest">Credits</div>
                            <TeamCredits points={team.points} showPoints={showPoints} />
                          </div>
                        </div>

                        {/* DESKTOP layout: single horizontal row */}
                        <div className="hidden md:grid px-6 py-4 w-full" style={{ gridTemplateColumns: "30% 1fr 18%", alignItems: "center", gap: "8px" }}>
                          {/* LEFT: Rank + Name */}
                          <div className="flex items-center gap-6 min-w-0">
                            <span className="font-orbitron text-3xl font-black leading-none shrink-0" style={{ color: team.color }}>
                              #{String(globalRank).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-white text-2xl font-black font-orbitron uppercase truncate">
                                {team.name}
                              </h3>
                              {isExpanded && (
                                <motion.button
                                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  onClick={(e) => { e.stopPropagation(); setExpandedTeamId(null); }}
                                  className="flex items-center gap-1 text-cyan-400 text-[10px] mt-2 uppercase font-bold whitespace-nowrap"
                                >
                                  <ChevronLeft size={12} /> Back to Board
                                </motion.button>
                              )}
                            </div>
                          </div>
                          {/* CENTER: Hearts */}
                          <div className="flex flex-row flex-nowrap items-center justify-center overflow-hidden" style={{ gap: "clamp(1px, 0.5vw, 8px)" }}>
                            {[...Array(10)].map((_, i) => (
                              <img
                                key={i}
                                src={i < team.health ? HEART_IMAGE_SRC : EMPTY_HEART_IMAGE_SRC}
                                draggable={false}
                                className="object-contain select-none pointer-events-none shrink-0"
                                style={{
                                  imageRendering: "pixelated",
                                  width: "clamp(22px, 3.5vw, 44px)",
                                  height: "clamp(22px, 3.5vw, 44px)",
                                  filter: i < team.health ? `drop-shadow(0 0 4px ${team.color})` : 'opacity(0.2)'
                                }}
                              />
                            ))}
                          </div>
                          {/* RIGHT: Credits + Coin */}
                          <div className="flex flex-col items-end justify-center">
                            <div className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest">Credits</div>
                            <TeamCredits points={team.points} showPoints={showPoints} />
                          </div>
                        </div>

                        {/* Expanded Stats View (The Morphing Part) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-6 border-t border-white/10"
                            >
                              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                  <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase mb-4 tracking-tighter">
                                    <Activity size={14} className="text-cyan-400" /> Bio-Signature Analysis
                                  </div>
                                  <div className="space-y-2">
                                    {team.players?.sort((a, b) => b.points - a.points).map((p, i) => (
                                      <div key={i} className="flex justify-between bg-white/5 p-3 border-l-2" style={{ borderColor: team.color }}>
                                        <span className="text-white font-bold uppercase text-sm">{p.name}</span>
                                        <span className="text-cyan-400 font-mono text-sm">{p.points} PTS</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="hidden md:block bg-cyan-500/5 border border-cyan-500/20 p-4 flex flex-col justify-center items-center">
                                  <Trophy className="text-cyan-500 mb-2" size={32} />
                                  <div className="text-[10px] font-mono text-cyan-500 uppercase">Sector Performance</div>
                                  <div className="text-2xl font-black font-orbitron text-white italic">OPTIMAL</div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}