import { Heart, HeartOff, CheckCircle, XCircle } from "lucide-react";

const arenaTeams = [
  { id: 1, name: "NEO CYPHERS", health: 8, isBounty: true, history: ["safe", "hit", "safe"], color: "#00f5ff" },
  { id: 2, name: "VOID RUNNERS", health: 10, isBounty: false, history: ["safe", "safe", "safe"], color: "#8b5cf6" },
  { id: 3, name: "STATIC TRIAD", health: 3, isBounty: false, history: ["hit", "hit", "safe"], color: "#f59e0b" },
  { id: 4, name: "REBIRTH 404", health: 5, isBounty: false, history: ["safe", "hit", "hit"], color: "#ef4444" },
  { id: 5, name: "GHOST PROTOCOL", health: 1, isBounty: false, history: ["hit", "hit", "hit"], color: "#10b981" },
];

export function FullScreenLeaderboard() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#02020a] flex flex-col font-space-grotesk overflow-hidden">
      
      {/* Cinematic Header */}
      <div className="relative z-10 px-8 py-6 border-b border-white/5 bg-[#050518]/95 backdrop-blur-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          <h1 className="text-white font-orbitron text-2xl font-black tracking-tighter uppercase">
            The <span className="text-cyan-400">Leaderboard</span> 
          </h1>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                <span>// 10_HP_MAX</span>
                <span>// BOUNTY_50_PCT</span>
                <span>// NORMAL_25_PCT</span>
            </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 relative z-10 px-6 py-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {arenaTeams.map((team, index) => (
            <div key={team.id} className="w-full">
              
              {/* THE TIMELINE-STYLE BOX */}
              <div 
                className="relative p-6 border-2 bg-[#050518]/90 backdrop-blur-xl hover:border-white/40 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between"
                style={{ 
                  borderColor: team.isBounty ? "#eab308" : `${team.color}40`,
                  clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                  boxShadow: team.isBounty ? "0 0 20px rgba(234, 179, 8, 0.15) inset" : "none"
                }}
              >
                
                {/* Team Rank & Name */}
                <div className="flex items-center gap-6 mb-6 md:mb-0 w-full md:w-1/3">
                  <span className="font-orbitron text-3xl font-black opacity-40 transition-opacity group-hover:opacity-100" style={{ color: team.color }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-black font-orbitron uppercase tracking-tight transition-transform group-hover:translate-x-1">
                      {team.name}
                    </h3>
                    {team.isBounty && (
                      <div className="mt-1 inline-block bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 font-orbitron shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                        BOUNTY: 50% STEAL
                      </div>
                    )}
                  </div>
                </div>

                {/* Heart Vitals */}
                <div className="flex items-center gap-1.5 justify-start md:justify-center flex-1 mb-6 md:mb-0 px-2 md:px-0">
                  {[...Array(10)].map((_, i) => (
                    <span key={i}>
                      {i < team.health ? (
                        <Heart 
                          size={24} 
                          style={{ color: team.color, fill: team.color }}
                          className={`${team.health <= 3 ? "animate-pulse" : ""} drop-shadow-[0_0_5px_currentColor]`} 
                        />
                      ) : (
                        <HeartOff size={18} className="text-white/10" />
                      )}
                    </span>
                  ))}
                </div>

                {/* Round History (Icon Circles) */}
                <div className="flex flex-col items-start md:items-end w-full md:w-1/4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                    Last 3 Rounds
                  </div>
                  <div className="flex gap-3">
                    {team.history.map((status, i) => (
                      <div key={i} className="relative">
                        {status === 'safe' ? (
                          <CheckCircle 
                            size={18} 
                            className="text-green-500 drop-shadow-[0_0_8px_#22c55e]"
                          />
                        ) : (
                          <XCircle 
                            size={18} 
                            className="text-red-600 opacity-60"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Right Corner Accent from your Timeline design */}
                <div 
                  className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" 
                  style={{ borderColor: team.isBounty ? "#eab308" : team.color }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Bottom Ticker */}
      <div className="bg-[#050518] border-t border-white/5 p-4 relative z-10 overflow-hidden">
         <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
            {[1, 2].map(i => (
              <span key={i} className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em]">
                * SYSTEM ALERT: <span className="text-yellow-500">BOUNTY PROTOCOL ACTIVE (50%)</span> * 0 HP RESULTS IN IMMEDIATE VOID * ALL ABILITIES ARE ONE-TIME USE * TRACK YOUR VITALS * </span>
            ))}
         </div>
      </div>
    </div>
  );
}