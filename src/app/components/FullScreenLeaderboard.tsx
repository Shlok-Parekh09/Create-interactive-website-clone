import { CheckCircle, XCircle } from "lucide-react";

// 1. Pure SVG Pixel Heart (Full) - Automatically uses Team Color!
const PixelHeartFull = ({ className, color }: { className?: string, color: string }) => (
  <svg viewBox="0 0 9 10" xmlns="http://www.w3.org/2000/svg" className={className} style={{ shapeRendering: "crispEdges", filter: `drop-shadow(0 0 6px ${color})` }}>
    {/* Inner fill */}
    <path fill={color} d="M2 1h2v1H2zM5 1h2v1H5zM1 2h7v3H1zM2 5h5v1H2zM3 6h3v1H3zM4 7h1v1H4z" />
    {/* White Outer Border */}
    <path fill="#ffffff" d="M2 0h2v1H2zM5 0h2v1H5zM1 1h1v1H1zM4 1h1v1H4zM7 1h1v1H7zM0 2h1v3H0zM8 2h1v3H8zM1 5h1v1H1zM7 5h1v1H7zM2 6h1v1H2zM6 6h1v1H6zM3 7h1v1H3zM5 7h1v1H5zM4 8h1v2H4z" />
  </svg>
);

// 2. Pure SVG Pixel Heart (Empty)
const PixelHeartEmpty = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 9 10" xmlns="http://www.w3.org/2000/svg" className={className} style={{ shapeRendering: "crispEdges" }}>
    {/* Dark Gray Inner Fill */}
    <path fill="#414141" d="M2 1h2v1H2zM5 1h2v1H5zM1 2h7v3H1zM2 5h5v1H2zM3 6h3v1H3zM4 7h1v1H4z" />
    {/* White Outer Border */}
    <path fill="#ffffff" d="M2 0h2v1H2zM5 0h2v1H5zM1 1h1v1H1zM4 1h1v1H4zM7 1h1v1H7zM0 2h1v3H0zM8 2h1v3H8zM1 5h1v1H1zM7 5h1v1H7zM2 6h1v1H2zM6 6h1v1H6zM3 7h1v1H3zM5 7h1v1H5zM4 8h1v2H4z" />
  </svg>
);

export type TeamProps = {
  id: number;
  name: string;
  health: number;
  points: number;
  isBounty: boolean;
  history: string[];
  color: string;
};

export function FullScreenLeaderboard({ teams }: { teams: TeamProps[] }) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="fixed inset-0 z-[100] bg-transparent flex flex-col font-space-grotesk overflow-hidden">

      {/* Cinematic Header */}
      <div className="relative z-10 px-4 py-4 md:px-8 md:py-6 border-b border-white/5 bg-[#050518]/80 backdrop-blur-xl flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping flex-shrink-0" />
          <h1 className="text-white font-orbitron text-lg md:text-2xl font-black tracking-tighter uppercase truncate">
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
      <div className="flex-1 relative z-10 px-3 py-6 md:px-6 md:py-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">

          {/* ── EMPTY STATE ── */}
          {sortedTeams.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 border-2 border-dashed border-white/10 bg-black/40 backdrop-blur-sm mx-2 md:mx-0">
              <span className="text-cyan-500/50 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.5em] uppercase animate-pulse text-center px-4">
                The leader board will be live During the event.
              </span>
            </div>
          ) : (
            /* ── TEAM ROWS ── */
            sortedTeams.map((team, index) => (
              <div key={team.id} className="w-full">

                <div
                  className="relative p-4 md:p-6 border-2 bg-[#050518]/70 backdrop-blur-xl hover:border-white/40 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between"
                  style={{
                    borderColor: team.isBounty ? "#eab308" : `${team.color}40`,
                    clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                    boxShadow: team.isBounty ? "0 0 20px rgba(234, 179, 8, 0.15) inset" : "none"
                  }}
                >
                  {/* Team Rank & Name */}
                  <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0 w-full md:w-1/3">
                    <span className="font-orbitron text-2xl md:text-3xl font-black opacity-40 transition-opacity group-hover:opacity-100 min-w-[2rem]" style={{ color: team.color }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-lg md:text-2xl font-black font-orbitron uppercase tracking-tight transition-transform group-hover:translate-x-1 truncate">
                        {team.name}
                      </h3>
                      {team.isBounty && (
                        <div className="mt-1 inline-block bg-yellow-500 text-black text-[8px] md:text-[9px] font-black px-2 py-0.5 font-orbitron shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                          BOUNTY: 50% STEAL
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SVG Heart Vitals */}
                  <div className="flex items-center gap-1 md:gap-1.5 justify-center flex-1 mb-4 md:mb-0">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                        {i < team.health ? (
                          <PixelHeartFull
                            color={team.color}
                            className={`w-full h-full object-contain ${team.health <= 3 ? "animate-pulse" : ""}`}
                          />
                        ) : (
                          <PixelHeartEmpty
                            className="w-full h-full object-contain opacity-40"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Round History */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-1/4 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                    <div className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest md:mb-2">
                      Last 3 Rounds
                    </div>
                    <div className="flex gap-2 md:gap-3">
                      {team.history.map((status, i) => (
                        <div key={i} className="relative">
                          {status === 'safe' ? (
                            <CheckCircle className="w-4 h-4 md:w-[18px] md:h-[18px] text-green-500 drop-shadow-[0_0_8px_#22c55e]" />
                          ) : (
                            <XCircle className="w-4 h-4 md:w-[18px] md:h-[18px] text-red-600 opacity-60" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Right Corner Accent */}
                  <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2" style={{ borderColor: team.isBounty ? "#eab308" : team.color }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cinematic Bottom Ticker */}
      <div className="bg-[#050518]/80 backdrop-blur-md border-t border-white/5 p-3 md:p-4 relative z-10 overflow-hidden">
        <div className="flex items-center gap-8 md:gap-16 animate-marquee whitespace-nowrap">
          {[1, 2, 3].map(i => (
            <span key={i} className="text-gray-500 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">
              * SYSTEM ALERT: <span className="text-yellow-500">BOUNTY PROTOCOL ACTIVE (50%)</span> * 0 HP RESULTS IN IMMEDIATE VOID * ALL ABILITIES ARE ONE-TIME USE * TRACK YOUR VITALS * </span>
          ))}
        </div>
      </div>
    </div>
  );
}