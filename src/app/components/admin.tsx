import {
  Shield,
  Swords,
  Heart,
  Zap,
  Skull,
  Trash2,
  ShieldCheck,
  UserPlus,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { TeamProps } from "./FullScreenLeaderboard"; // Import the type!
const COLORS = ["#00f5ff", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#3b82f6",
  "#22c55e", "#eab308", "#6366f1", "#f97316", "#14b8a6", "#a855f7", "#f43f5e",
  "#0ea5e9", "#84cc16", "#d946ef", "#facc15", "#38bdf8", "#fb7185", "#4ade80",
  "#c084fc", "#f87171", "#67e8f9", "#bef264", "#f472b6", "#60a5fa", "#fcd34d"];

// 1. Accept teams and setTeams as props
export function Admin({ teams, setTeams, showPoints, setShowPoints }: {
  teams: TeamProps[], setTeams: any, showPoints: boolean,
  setShowPoints: (val: boolean) => void
}) {
  const [newTeamName, setNewTeamName] = useState("");
  const [expandedRosterTeamId, setExpandedRosterTeamId] = useState<number | null>(null);

  // Global Stats based on the props
  const totalScore = teams.reduce((acc, team) => acc + team.points, 0);
  const aliveTeams = teams.filter(t => t.health > 0).length;

  // --- ACTIONS ---

  const adjustPoints = (teamId: number, delta: number) => {
    setTeams(teams.map(t => t.id === teamId ? { ...t, points: Math.max(0, t.points + delta) } : t));
  };

  const adjustHealth = (teamId: number, delta: number) => {
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        const newHealth = Math.max(0, Math.min(10, t.health + delta));
        return { ...t, health: newHealth };
      }
      return t;
    }));
  };

  const toggleBounty = (teamId: number) => {
    setTeams(teams.map(t => t.id === teamId ? { ...t, isBounty: !t.isBounty } : t));
  };

  const declareDead = (teamId: number) => {
    setTeams(teams.map(t => t.id === teamId ? { ...t, health: 0, isBounty: false } : t));
  };

  const updateHistory = (teamId: number, status: "safe" | "hit") => {
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        const newHistory = [...t.history, status].slice(-6);
        return { ...t, history: newHistory };
      }
      return t;
    }));
  };

  const addPlayer = (teamId: number, playerName: string) => {
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          players: [...(t.players || []), { name: playerName, points: 0 }]
        };
      }
      return t;
    }));
  };

  const adjustPlayerPoints = (teamId: number, playerIndex: number, delta: number) => {
    setTeams(teams.map(t => {
      if (t.id === teamId && t.players) {
        const newPlayers = [...t.players];
        newPlayers[playerIndex] = {
          ...newPlayers[playerIndex],
          points: Math.max(0, newPlayers[playerIndex].points + delta)
        };
        // Also update team points to reflect player contributions? No, let's keep team points independent or just adjust both.
        // Usually, team score can be separate or sum. Let's just adjust the player's points here.
        return { ...t, players: newPlayers };
      }
      return t;
    }));
  };

  const undoHistory = (teamId: number) => {
    setTeams(teams.map(t => {
      if (t.id === teamId && t.history.length > 0) {
        const newHistory = [...t.history];
        newHistory.pop();
        return { ...t, history: newHistory };
      }
      return t;
    }));
  };

  const addTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const newTeam = {
      id: Date.now(),
      name: newTeamName.toUpperCase(),
      points: 0,
      health: 10,
      isBounty: false,
      history: [],
      color: COLORS[teams.length % COLORS.length]
    };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  const removeTeam = (teamId: number) => {
    if (confirm("WARNING: Are you sure you want to permanently delete this team?")) {
      setTeams(teams.filter(t => t.id !== teamId));
    }
  };

  return (
    <div className="p-3 sm:p-6 md:p-8 bg-[#050518]/95 border-2 border-cyan-500/20 rounded-xl font-space-grotesk max-w-6xl w-full mx-auto backdrop-blur-xl h-full overflow-y-auto overflow-x-hidden">

      {/* HEADER & GLOBAL STATS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-orbitron text-white flex items-center gap-3 font-black">
            <Shield className="text-cyan-400" /> ADMIN PROTOCOL
          </h2>
          <p className="text-gray-400 font-mono text-xs mt-2 uppercase tracking-widest">
            Override Console // Sankhya Arena
          </p>
          {/* ADDED TOGGLE BUTTON */}
          <button
            onClick={() => setShowPoints(!showPoints)}
            className={`mt-4 px-4 py-2 rounded font-mono text-xs font-bold transition-all border ${showPoints
              ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
              : "bg-gray-800 text-gray-500 border-white/10"
              }`}
          >
            {showPoints ? "● POINTS VISIBLE " : "○ POINTS HIDDEN "}
          </button>
        </div>

        <div className="flex gap-2 sm:gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-[#080820] border border-cyan-500/30 p-2 sm:p-3 rounded text-center min-w-[80px] md:min-w-[120px]">
            <div className="text-[9px] sm:text-[10px] text-cyan-500 font-mono uppercase mb-1">Total System Credits</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-white">{totalScore}</div>
          </div>
          <div className="flex-1 md:flex-none bg-[#080820] border border-green-500/30 p-2 sm:p-3 rounded text-center min-w-[80px] md:min-w-[120px]">
            <div className="text-[9px] sm:text-[10px] text-green-500 font-mono uppercase mb-1">Active Triads</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-white">{aliveTeams} / {teams.length}</div>
          </div>
        </div>
      </div>

      {/* ADD NEW TEAM FORM */}
      <form onSubmit={addTeam} className="flex flex-col sm:flex-row gap-4 mb-8 bg-[#080820] p-4 rounded-lg border border-white/5">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="ENTER NEW TEAM DESIGNATION..."
          className="w-full sm:flex-1 bg-transparent border-b-2 border-white/10 text-white font-orbitron px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors uppercase placeholder:text-gray-600"
        />
        <button type="submit" className="w-full sm:w-auto justify-center bg-cyan-500 text-black px-6 py-3 sm:py-2 font-bold font-mono text-xs uppercase flex items-center gap-2 hover:bg-cyan-400 transition-colors rounded-sm">
          <UserPlus size={16} /> Deploy Team
        </button>
      </form>

      {/* TEAM CONTROLS LIST */}
      <div className="space-y-4">
        {teams.map(team => (
          <div key={team.id} className="flex flex-col xl:flex-row xl:items-center justify-between p-3 sm:p-5 bg-[#0a0a25] border-l-4 border-y border-r border-white/5 rounded-lg transition-all overflow-hidden" style={{ borderLeftColor: team.color }}>

            {/* 1. Identity & Status */}
            <div
              className="flex justify-between xl:w-1/4 mb-4 xl:mb-0 cursor-pointer hover:bg-white/5 p-2 -ml-2 rounded transition-all group"
              onClick={() => setExpandedRosterTeamId(expandedRosterTeamId === team.id ? null : team.id)}
            >
              <div>
                <span className={`text-xl font-black font-orbitron tracking-tight flex items-center gap-2 ${team.health === 0 ? "text-red-500 line-through opacity-50" : "text-white"}`}>
                  {team.name}
                  {team.isBounty && <Zap size={16} className="text-yellow-500 fill-yellow-500 animate-pulse" />}
                  {expandedRosterTeamId === team.id ? <ChevronUp size={16} className="text-cyan-500" /> : <ChevronDown size={16} className="text-gray-500 group-hover:text-cyan-500 transition-colors" />}
                </span>
                <div className="text-xs font-mono mt-1 text-gray-400">
                  HP: <span className={team.health <= 3 ? "text-red-500" : "text-white"}>{team.health}</span> | PTS: <span className="text-cyan-400">{team.points}</span>
                </div>
              </div>
            </div>

            {/* 2. Point Adjustments (-1 Update) */}
            <div className="flex flex-wrap gap-2 xl:w-auto mb-4 xl:mb-0 bg-black/20 p-2 rounded">
              <span className="text-[9px] text-gray-500 font-mono uppercase w-full mb-1">Adjust Credits</span>
              <button onClick={() => adjustPoints(team.id, 1)} className="flex-1 sm:flex-none justify-center px-3 py-2 sm:py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition rounded text-xs font-mono font-bold">+1</button>
              <button onClick={() => adjustPoints(team.id, 3)} className="flex-1 sm:flex-none justify-center px-3 py-2 sm:py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition rounded text-xs font-mono font-bold">+3</button>
              <button onClick={() => adjustPoints(team.id, 5)} className="flex-1 sm:flex-none justify-center px-3 py-2 sm:py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition rounded text-xs font-mono font-bold">+5</button>
              <button onClick={() => adjustPoints(team.id, -1)} className="flex-1 sm:flex-none justify-center px-3 py-2 sm:py-1 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition rounded text-xs font-mono font-bold">-1</button>
            </div>

            {/* 3. Health & Combat Controls */}
            <div className="flex flex-wrap gap-2 xl:w-auto mb-4 xl:mb-0 bg-black/20 p-2 rounded">
              <span className="text-[9px] text-gray-500 font-mono uppercase w-full mb-1">Vitals & Combat</span>
              <button onClick={() => adjustHealth(team.id, -1)} className="flex-1 sm:flex-none justify-center flex p-1.5 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition rounded" title="Take Damage"><Swords size={16} /></button>
              <button onClick={() => adjustHealth(team.id, 1)} className="flex-1 sm:flex-none justify-center flex p-1.5 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-white transition rounded" title="Heal"><Heart size={16} /></button>
              <button onClick={() => toggleBounty(team.id)} className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold font-mono transition rounded border ${team.isBounty ? "bg-yellow-500 text-black border-yellow-500" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20"}`}>BOUNTY</button>
              <button onClick={() => declareDead(team.id)} className="flex-1 sm:flex-none justify-center flex p-1.5 bg-red-900/40 text-red-500 border border-red-500/50 hover:bg-red-600 hover:text-white transition rounded" title="Declare Dead"><Skull size={16} /></button>
            </div>

            {/* 4. Round History (Railroad Sync + Undo Update) */}
            <div className="flex flex-col gap-1 xl:w-auto mb-4 xl:mb-0 bg-black/20 p-2 rounded justify-center min-w-[140px]">
              <span className="text-[9px] text-gray-500 font-mono uppercase mb-1">Log Round (Updates HIDE)</span>

              <button
                onClick={() => updateHistory(team.id, 'safe')}
                className="w-full justify-center px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-white transition rounded text-[10px] font-mono font-bold flex gap-1 items-center"
              >
                <ShieldCheck size={12} /> COOP
              </button>

              <div className="flex gap-1 w-full">
                <button
                  onClick={() => updateHistory(team.id, 'hit')}
                  className="flex-1 justify-center px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition rounded text-[10px] font-mono font-bold flex gap-1 items-center"
                >
                  <Swords size={12} /> BETRAY
                </button>
                <button
                  onClick={() => undoHistory(team.id)}
                  className="w-8 justify-center py-1 bg-transparent text-gray-400 border border-white/10 hover:bg-gray-800 hover:text-white transition rounded flex items-center shrink-0"
                  title="Undo Last Entry"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* 5. Team Members / Players (Dropdown) */}
            {expandedRosterTeamId === team.id && (
              <div className="flex flex-col w-full mt-4 bg-[#080820] rounded border border-cyan-500/20 transition-all overflow-hidden text-left p-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Team Roster</span>
                  <span className="text-cyan-500 font-bold text-xs bg-cyan-500/10 px-2 py-0.5 rounded">
                    {team.players?.length || 0}/3 Members
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    {team.players?.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold border ${idx === 0 ? "bg-purple-500/10 text-purple-400 border-purple-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"}`}>
                            {idx === 0 ? "LEADER" : "MEMBER"}
                          </span>
                          <span className="text-xs font-bold text-white uppercase">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-mono text-xs w-10 text-right">{p.points} PTS</span>
                          <button onClick={() => adjustPlayerPoints(team.id, idx, 1)} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-[10px] hover:bg-cyan-500 hover:text-black font-bold transition">+1</button>
                          <button onClick={() => adjustPlayerPoints(team.id, idx, -1)} className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-[10px] hover:bg-red-500 hover:text-black font-bold transition">-1</button>
                        </div>
                      </div>
                    ))}
                    {(!team.players || team.players.length === 0) && (
                      <div className="text-gray-600 text-[10px] font-mono uppercase italic px-2">No agents active.</div>
                    )}
                  </div>

                  {(!team.players || team.players.length < 3) && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem('playerName') as HTMLInputElement;
                        if (input.value.trim()) {
                          addPlayer(team.id, input.value.trim());
                          input.value = '';
                        }
                      }}
                      className="flex gap-2 mt-2"
                    >
                      <input name="playerName" type="text" placeholder={!team.players || team.players.length === 0 ? "LEADER NAME..." : "MEMBER NAME..."} className="text-xs flex-1 bg-black/40 border border-white/10 text-white outline-none focus:border-cyan-400 p-2 rounded font-mono uppercase" />
                      <button type="submit" className="text-[10px] bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-400 transition font-bold uppercase">
                        ADD {(!team.players || team.players.length === 0) ? "LEADER" : "MEMBER"}
                      </button>
                    </form>
                  )}
                  {team.players && team.players.length >= 3 && (
                    <div className="text-green-500 text-xs font-mono uppercase text-center mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded">
                      MAXIMUM ROSTER CAPACITY REACHED
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 6. Danger Zone */}
            <div className="flex items-center w-full xl:w-auto mt-4 pt-4 border-t border-white/5">
              <button onClick={() => removeTeam(team.id)} className="w-full xl:w-auto justify-center flex items-center gap-2 p-2 text-gray-400 font-mono text-xs hover:text-red-500 hover:bg-red-500/10 rounded transition" title="Delete Team">
                <Trash2 size={16} /> <span>DELETE TEAM</span>
              </button>
            </div>

          </div>
        ))}

        {teams.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono uppercase border-2 border-dashed border-gray-800 rounded-lg">
            No Teams Deployed in the Arena.
          </div>
        )}
      </div>
    </div>
  );
}