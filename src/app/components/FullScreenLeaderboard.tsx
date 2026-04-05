import { Trophy, Target, Heart, Activity, AlertTriangle } from "lucide-react";

// Mock Data representing the 5 Teams in your Arena
const arenaTeams = [
  { id: 1, name: "NEO CYPHERS", points: 2450, health: 8, isBounty: true, betrayals: 12 },
  { id: 2, name: "VOID RUNNERS", points: 1980, health: 10, isBounty: false, betrayals: 4 },
  { id: 3, name: "STATIC TRIAD", points: 1540, health: 3, isBounty: false, betrayals: 8 },
  { id: 4, name: "REBIRTH 404", points: 1200, health: 5, isBounty: false, betrayals: 6 },
  { id: 5, name: "GHOST PROTOCOL", points: 890, health: 2, isBounty: false, betrayals: 15 },
];

export function FullScreenLeaderboard() {
  const sortedTeams = [...arenaTeams].sort((a, b) => b.points - a.points);

  return (
    <div className="fixed inset-0 z-[100] bg-[#02020a] flex flex-col font-space-grotesk overflow-hidden">

      {/* Background Video Hint - Re-using your video styling */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Your Video Component would go here */}
      </div>

      {/* Top HUD Bar */}
      <div className="relative z-10 flex items-center justify-between px-12 py-8 border-b border-cyan-500/30 bg-[#050518]/80 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center rotate-45 border-2 border-white shadow-[0_0_20px_#00f5ff]">
            <Trophy className="-rotate-45 text-[#050518]" size={28} />
          </div>
          <div>
            <h1 className="text-white font-orbitron text-4xl font-black tracking-tighter">
              THE MATRIX: <span className="text-cyan-400">GLOBAL RANKINGS</span>
            </h1>
            <p className="text-cyan-500/60 font-mono text-xs tracking-[0.5em] uppercase">
              // SANKHYA_LIVE_SYNC_PROTOCOL_V3.0 //
            </p>
          </div>
        </div>

        <div className="text-right flex items-center gap-8">
          <div className="px-6 py-2 border border-red-500/40 bg-red-500/5 rounded-sm">
            <span className="text-red-500 font-mono text-sm block">ELIMINATION THRESHOLD</span>
            <span className="text-white font-orbitron font-bold uppercase">0 HP = VOID</span>
          </div>
          <div className="text-white font-orbitron text-3xl font-black tabular-nums">
            14:59:02
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="flex-1 relative z-10 px-12 py-10 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-4">

          {/* Table Header */}
          <div className="grid grid-cols-12 px-10 py-4 text-cyan-500/50 font-mono text-sm uppercase tracking-widest border-b border-cyan-500/10">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Team Designation</div>
            <div className="col-span-3">Vitality Index (Health)</div>
            <div className="col-span-2 text-center">Bounty Status</div>
            <div className="col-span-2 text-right">Arena Credits (Points)</div>
          </div>

          {/* Team Rows */}
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`grid grid-cols-12 items-center px-10 py-8 transition-all duration-300 group
                ${team.isBounty
                  ? "bg-yellow-500/10 border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
                  : "bg-[#080820]/60 border border-white/5 hover:border-cyan-500/40 hover:bg-[#0a0a2a]"
                }`}
              style={{ clipPath: "polygon(0 0, 98% 0, 100% 30%, 100% 100%, 2% 100%, 0 70%)" }}
            >
              {/* Rank */}
              <div className="col-span-1 font-orbitron text-4xl font-black text-gray-600 group-hover:text-cyan-400 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Team Name */}
              <div className="col-span-4">
                <h3 className="text-white text-3xl font-black tracking-tight font-orbitron group-hover:translate-x-2 transition-transform">
                  {team.name}
                </h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Betrayals: {team.betrayals}</span>
                  <span className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest">Verified Triad</span>
                </div>
              </div>

              {/* Health Bars */}
              <div className="col-span-3">
                <div className="flex gap-2 mb-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 w-3 rounded-sm shadow-sm transition-all duration-500 ${i < team.health
                          ? (team.health <= 3 ? "bg-red-500 shadow-[0_0_10px_#ef4444]" : "bg-cyan-500 shadow-[0_0_10px_#00f5ff]")
                          : "bg-white/5"
                        }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-mono font-bold ${team.health <= 3 ? "text-red-500 animate-pulse" : "text-gray-500"}`}>
                  {team.health}/10 HP {team.health <= 3 && "// CRITICAL_VITAL_SIGNS"}
                </span>
              </div>

              {/* Bounty Badge */}
              <div className="col-span-2 flex justify-center">
                {team.isBounty ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-yellow-500 text-black px-4 py-1 font-black font-orbitron text-sm animate-bounce shadow-[0_0_15px_#eab308]">
                      BOUNTY
                    </div>
                    <span className="text-[9px] text-yellow-500/80 font-mono font-bold tracking-tighter">50% STEAL PROTOCOL ACTIVE</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-white/20 font-mono uppercase border border-white/10 px-3 py-1">25% Standard Steal</span>
                )}
              </div>

              {/* Points */}
              <div className="col-span-2 text-right">
                <div className="text-5xl font-black font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                  {team.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-mono mt-1 tracking-widest uppercase">System Credits</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="bg-cyan-500/10 border-t border-cyan-500/30 p-4 relative z-10 overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[1, 2, 3].map(i => (
            <span key={i} className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em]">
              * NEW BOUNTY SYSTEM: 50% STEAL ON TARGETED TEAMS * 25% STEAL ON NORMAL ELIMINATION * 10 HEALTH STARTING POOL * ADMIN HAS TOTAL CONTROL * </span>
          ))}
        </div>
      </div>
    </div>
  );
}