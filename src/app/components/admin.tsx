import { 
  Shield, 
  Swords, 
  Heart, 
  Zap, 
  Skull, 
  Trash2, 
  ShieldCheck, 
  UserPlus,
  RotateCcw 
} from "lucide-react";
import { useState } from "react";
import { TeamProps } from "./FullScreenLeaderboard"; // Import the type!

const COLORS = ["#00f5ff", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#3b82f6",
"#22c55e", "#eab308", "#6366f1", "#f97316", "#14b8a6", "#a855f7", "#f43f5e",
"#0ea5e9", "#84cc16", "#d946ef", "#facc15", "#38bdf8", "#fb7185", "#4ade80",
"#c084fc", "#f87171", "#67e8f9", "#bef264", "#f472b6", "#60a5fa", "#fcd34d"];

// 1. Accept teams and setTeams as props
export function Admin({ teams, setTeams }: { teams: TeamProps[], setTeams: any }) {
  const [newTeamName, setNewTeamName] = useState("");

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
        const newHistory = [...t.history, status].slice(-3);
        return { ...t, history: newHistory };
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
      history: ["safe", "safe", "safe"],
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
            <div className="flex justify-between xl:w-1/4 mb-4 xl:mb-0">
              <div>
                <span className={`text-xl font-black font-orbitron tracking-tight flex items-center gap-2 ${team.health === 0 ? "text-red-500 line-through opacity-50" : "text-white"}`}>
                  {team.name}
                  {team.isBounty && <Zap size={16} className="text-yellow-500 fill-yellow-500 animate-pulse" />}
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
            <div className="flex flex-wrap gap-2 xl:w-auto mb-4 xl:mb-0 bg-black/20 p-2 rounded items-center">
              <span className="text-[9px] text-gray-500 font-mono uppercase w-full mb-1">Log Round (Updates HUD)</span>
              <button onClick={() => updateHistory(team.id, 'safe')} className="flex-1 sm:flex-none justify-center px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-white transition rounded text-xs font-mono font-bold flex gap-1 items-center">
                <ShieldCheck size={12} /> COOP
              </button>
              <button onClick={() => updateHistory(team.id, 'hit')} className="flex-1 sm:flex-none justify-center px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition rounded text-xs font-mono font-bold flex gap-1 items-center">
                <Swords size={12} /> BETRAY
              </button>
              <button onClick={() => undoHistory(team.id)} className="flex-1 sm:flex-none justify-center px-3 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/30 hover:bg-gray-500 hover:text-white transition rounded text-xs font-mono flex gap-1 items-center" title="Undo Last Entry">
                <RotateCcw size={14} /> <span className="sm:hidden">UNDO</span>
              </button>
            </div>

            {/* 5. Danger Zone */}
            <div className="flex items-center w-full xl:w-auto mt-2 xl:mt-0 pt-4 border-t border-white/5 xl:border-none xl:pt-0">
              <button onClick={() => removeTeam(team.id)} className="w-full xl:w-auto justify-center flex items-center gap-2 p-2 text-gray-400 font-mono text-xs hover:text-red-500 hover:bg-red-500/10 rounded transition" title="Delete Team">
                <Trash2 size={16} /> <span className="xl:hidden">DELETE TEAM</span>
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