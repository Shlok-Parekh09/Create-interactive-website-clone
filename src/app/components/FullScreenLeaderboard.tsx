import { useMemo, useState } from "react";
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
                        key={team.id}
                        onClick={() => !isExpanded && setExpandedTeamId(team.id)}
                        className={`relative w-full cursor-pointer overflow-hidden transition-all duration-500 ${isExpanded ? 'z-50' : 'z-10'}`}
                        style={{
                          background: "#050518",
                          border: `2px solid ${team.isBounty ? "#eab308" : team.color + "40"}`,
                          clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                        }}
                      >
                        {/* Standard Leaderboard View */}
                        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center gap-4 md:gap-6 w-full md:w-1/3">
                            <span className="font-orbitron text-2xl md:text-3xl font-black" style={{ color: team.color }}>
                              #{String(globalRank).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="text-white text-lg md:text-2xl font-black font-orbitron uppercase truncate">
                                {team.name}
                              </h3>
                              {isExpanded && (
                                <motion.button 
                                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  onClick={(e) => { e.stopPropagation(); setExpandedTeamId(null); }}
                                  className="flex items-center gap-1 text-cyan-400 text-[10px] mt-2 uppercase font-bold"
                                >
                                  <ChevronLeft size={12} /> Back to Board
                                </motion.button>
                              )}
                            </div>
                          </div>

                          {/* Hearts - Always visible but centered */}
                          <div className="flex items-center gap-1 justify-center py-4 md:py-0 flex-1">
                            {[...Array(10)].map((_, i) => (
                              <img
                                key={i}
                                src={i < team.health ? HEART_IMAGE_SRC : EMPTY_HEART_IMAGE_SRC}
                                className="w-6 h-6 md:w-8 md:h-8 object-contain"
                                style={{ 
                                  imageRendering: "pixelated", 
                                  scale: "1.7",
                                  filter: i < team.health ? `drop-shadow(0 0 4px ${team.color})` : 'opacity(0.2)' 
                                }}
                              />
                            ))}
                          </div>

                          <div className="md:w-1/4 flex flex-col items-end">
                            <div className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">Credits</div>
                            <div className="text-xl font-black font-orbitron text-white">
                              {showPoints ? team.points : "[REDACTED]"}
                            </div>
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
                                    {team.players?.sort((a,b) => b.points - a.points).map((p, i) => (
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