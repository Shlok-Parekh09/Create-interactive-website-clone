const platinumSponsors = [
  { name: "TechCorp AI", abbr: "TC" },
  { name: "InnovateMind", abbr: "IM" },
];

const goldSponsors = [
  { name: "CloudSphere", abbr: "CS" },
  { name: "ByteForge", abbr: "BF" },
  { name: "DataPulse", abbr: "DP" },
];

const silverSponsors = [
  { name: "NexaLabs", abbr: "NL" },
  { name: "FutureWave", abbr: "FW" },
  { name: "CodeBridge", abbr: "CB" },
  { name: "StackNova", abbr: "SN" },
];

const communityPartners = [
  { name: "GDG Mumbai", abbr: "GDG" },
  { name: "HackClub", abbr: "HC" },
  { name: "DevFolio", abbr: "DF" },
  { name: "MLH", abbr: "MLH" },
  { name: "AWS Educate", abbr: "AWS" },
];

function SponsorLogo({ name, abbr, size, color }: { name: string; abbr: string; size: string; color: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center border bg-[#080820] hover:bg-[#0a0a30] transition-all duration-300 group cursor-default ${size}`}
      style={{
        borderColor: `${color}30`,
        clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${color}08` }} />
      <div
        className="font-bold relative z-10"
        style={{ fontFamily: "Orbitron, sans-serif", color, fontSize: "0.85rem" }}
      >
        {abbr}
      </div>
      <div
        className="text-gray-500 text-xs mt-1 relative z-10"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {name}
      </div>
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // PARTNERS
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            OUR <span style={{ color: "#00f5ff" }}>SPONSORS</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 mb-4" />
          <p className="text-gray-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Backed by industry leaders driving innovation forward.
          </p>
        </div>

        {/* Platinum */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-700" />
            <span
              className="text-xs tracking-widest px-3"
              style={{ fontFamily: "Share Tech Mono, monospace", color: "#e2e8f0" }}
            >
              ✦ PLATINUM SPONSORS ✦
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-700" />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {platinumSponsors.map((s) => (
              <SponsorLogo key={s.name} {...s} size="w-48 h-24" color="#e2e8f0" />
            ))}
          </div>
        </div>

        {/* Gold */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-900/50" />
            <span
              className="text-xs tracking-widest px-3"
              style={{ fontFamily: "Share Tech Mono, monospace", color: "#ffd700" }}
            >
              ✦ GOLD SPONSORS ✦
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-900/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {goldSponsors.map((s) => (
              <SponsorLogo key={s.name} {...s} size="w-40 h-20" color="#ffd700" />
            ))}
          </div>
        </div>

        {/* Silver */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-700/50" />
            <span
              className="text-xs tracking-widest px-3"
              style={{ fontFamily: "Share Tech Mono, monospace", color: "#a8b4c0" }}
            >
              ✦ SILVER SPONSORS ✦
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-700/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {silverSponsors.map((s) => (
              <SponsorLogo key={s.name} {...s} size="w-32 h-16" color="#a8b4c0" />
            ))}
          </div>
        </div>

        {/* Community Partners */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-900/50" />
            <span
              className="text-xs tracking-widest px-3"
              style={{ fontFamily: "Share Tech Mono, monospace", color: "#00f5ff" }}
            >
              ✦ COMMUNITY PARTNERS ✦
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-900/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {communityPartners.map((s) => (
              <SponsorLogo key={s.name} {...s} size="w-28 h-14" color="#00f5ff" />
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <div
          className="mt-16 p-8 border border-cyan-500/20 bg-[#080820]/50 text-center"
          style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
        >
          <h3
            className="text-white mb-3"
            style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
          >
            INTERESTED IN <span style={{ color: "#00f5ff" }}>SPONSORING</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Partner with NeoFuture to connect with 500+ talented developers, designers, and innovators. Get brand visibility and access to top talent.
          </p>
          <a
            href="mailto:sponsors@neofuture.slrtce.in"
            className="inline-block px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
}
