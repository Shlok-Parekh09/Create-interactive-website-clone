import { Calendar, Users, Swords, Zap, Trophy, Shield } from "lucide-react";

const events = [
  {
    icon: <Calendar className="w-5 h-5" />,
    date: "April 10, 2026",
    time: "10:00 AM",
    title: "THE DRAFT BEGINS",
    desc: "Registration portal opens. Recruit your Triad—1 Leader and 2 Members—and prepare for the Arena.",
    color: "#00f5ff",
  },
  {
    icon: <Users className="w-5 h-5" />,
    date: "April 22, 2026",
    time: "11:59 PM",
    title: "DRAFT DEADLINE",
    desc: "Final call for team submissions. Ensure your 3-player roster is locked before the System boots.",
    color: "#8b5cf6",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    date: "April 23, 2026",
    time: "09:00 PM",
    title: "SECRET ABILITY REVEAL",
    desc: "Teams assigned three one-time tactical cards: Shield, Sword, or Poison. Study your edge.",
    color: "#f59e0b",
  },
  {
    icon: <Swords className="w-5 h-5" />,
    date: "April 23, 2026",
    time: "10:00 AM",
    title: "ARENA SYSTEM BOOT",
    desc: "Round-robin duels commence. 10 Health assigned per team. Strategy is everything.",
    color: "#00f5ff",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    date: "April 23, 2026",
    time: "11:00 AM",
    title: "MID-GAME EVALUATION",
    desc: "Bounty Systems active.",
    color: "#8b5cf6",
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    date: "April 23, 2026",
    time: "03:00 PM",
    title: "FINAL TALLY & REWARDS",
    desc: "Tournament conclusion. Score evaluation, prize distribution, and certificates for all survivors.",
    color: "#f59e0b",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="relative py-20 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-3 font-mono">
            // OPERATIONAL_SCHEDULE_V3.0 //
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-black font-orbitron">
            EVENT <span className="text-cyan-400">TIMELINE</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mt-6 shadow-[0_0_15px_rgba(0,245,255,0.5)]" />
        </div>

        <div className="relative">
          {/* Enhanced Visibility Vertical Line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(180deg, transparent, #00f5ff, #8b5cf6, transparent)",
              transform: "md:translateX(-50%)",
            }}
          />

          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.title}
                className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8 pl-12 md:pl-0`}
              >
                {/* Tactical Icon Node */}
                <div
                  className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center -translate-y-1 md:-translate-x-1/2 z-20 bg-[#050518]"
                  style={{
                    borderColor: event.color,
                    boxShadow: `0 0 20px ${event.color}`,
                    color: event.color,
                  }}
                >
                  {event.icon}
                </div>

                {/* Readable Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}>
                  <div
                    className="relative p-6 border-2 bg-[#050518]/90 backdrop-blur-xl hover:border-white/40 transition-all duration-300 group"
                    style={{
                      borderColor: `${event.color}40`,
                      clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-cyan-400 font-mono text-sm font-bold tracking-wider">
                        {event.date}
                      </span>
                      <span className="text-gray-400 font-mono text-xs">
                        [{event.time}]
                      </span>
                    </div>

                    <h3 className="text-white text-xl font-black mb-3 font-orbitron tracking-tight">
                      {event.title}
                    </h3>

                    {/* High-Contrast Description */}
                    <p className="text-gray-100 text-base leading-relaxed font-medium font-space-grotesk opacity-100">
                      {event.desc}
                    </p>

                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: event.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}