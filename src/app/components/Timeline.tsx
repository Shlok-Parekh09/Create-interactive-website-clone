import { Calendar, Users, Code, Search, Flag, Award } from "lucide-react";

const events = [
  {
    icon: <Calendar className="w-5 h-5" />,
    date: "April 1, 2026",
    time: "12:00 AM",
    title: "Registrations Open",
    desc: "Team registrations open on the official portal. Form your team of 2–4 members and register.",
    color: "#00f5ff",
  },
  {
    icon: <Users className="w-5 h-5" />,
    date: "April 20, 2026",
    time: "11:59 PM",
    title: "Registrations Close",
    desc: "Last date to register. Finalize your team, submit your initial abstract and choose your track.",
    color: "#8b5cf6",
  },
  {
    icon: <Search className="w-5 h-5" />,
    date: "April 22, 2026",
    time: "05:00 PM",
    title: "Shortlisting Announced",
    desc: "Selected teams will be notified via email. Top 100 teams move to the on-site hackathon.",
    color: "#f59e0b",
  },
  {
    icon: <Code className="w-5 h-5" />,
    date: "April 25, 2026",
    time: "09:00 AM",
    title: "Hackathon Begins",
    desc: "36 hours of non-stop hacking begins! Attend the opening ceremony, meet mentors, and start building.",
    color: "#00f5ff",
  },
  {
    icon: <Flag className="w-5 h-5" />,
    date: "April 26, 2026",
    time: "09:00 AM",
    title: "Mid-Evaluation",
    desc: "Mentors review your progress at the midpoint. Get feedback, iterate, and push harder.",
    color: "#8b5cf6",
  },
  {
    icon: <Award className="w-5 h-5" />,
    date: "April 27, 2026",
    time: "09:00 AM",
    title: "Final Submission & Results",
    desc: "Final demos presented to jury panel. Winners announced at the closing ceremony.",
    color: "#f59e0b",
  },
];

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // SCHEDULE
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            EVENT <span style={{ color: "#00f5ff" }}>TIMELINE</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, transparent, #00f5ff50, #8b5cf650, transparent)",
              transform: "md:translateX(-50%)",
            }}
          />

          <div className="space-y-10">
            {events.map((event, index) => (
              <div
                key={event.title}
                className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8 pl-12 md:pl-0`}
              >
                {/* Dot on line */}
                <div
                  className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center -translate-y-1 md:-translate-x-1/2"
                  style={{
                    borderColor: event.color,
                    backgroundColor: "#050518",
                    boxShadow: `0 0 12px ${event.color}60`,
                    color: event.color,
                  }}
                >
                  {event.icon}
                </div>

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <div
                    className="relative p-5 border bg-[#080820]/60 hover:bg-[#0a0a30]/60 transition-colors group"
                    style={{
                      borderColor: `${event.color}30`,
                      clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${event.color}05, transparent)` }}
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs tracking-wider"
                        style={{ fontFamily: "Share Tech Mono, monospace", color: event.color }}
                      >
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <h3
                      className="text-white mb-2"
                      style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {event.desc}
                    </p>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${event.color}60` }} />
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
