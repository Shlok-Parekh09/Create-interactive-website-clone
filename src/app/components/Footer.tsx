import { Zap, Instagram, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface FooterLink {
  label: string;
  href: string;
  action?: string;
  icon?: React.ReactNode;
}

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Abilities", href: "#abilities" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "FAQ", href: "#faq" }
  ],
  "Contact": [
    { label: "sbmpcemaths@gmail.com", href: "mailto:sbmpcemaths@gmail.com", icon: <Mail className="w-3.5 h-3.5" /> },
    { label: "Irla, N. R. G. Marg, opp. Cooper Hospital, Navpada, Suvarna Nagar, Vile Parle, Mumbai - 400056", href: "https://maps.google.com/?q=Irla,NRG+Marg,Opposite+Cooper+Hospital,Vile+Parle,Mumbai,400056", icon: <MapPin className="w-3.5 h-3.5" /> },
  ],
};

const socials = [
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/sbmpce_math", label: "Instagram" },
];

interface FooterProps {
  onRegister: () => void;
  onAdminClick: () => void;
  onOpenLeaderboard: () => void;
}

export function Footer({ onRegister, onAdminClick, onOpenLeaderboard }: FooterProps) {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-cyan-500/10 overflow-hidden bg-transparent">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <span className="text-white" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}>
                The <span className="text-cyan-400">MATRIX</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              SANKHYA's Premier Game Theory Arena. Negotiate. Betray. Survive the Matrix.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/60 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links Mapping */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white mb-4 uppercase tracking-widest" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem", fontWeight: 700 }}>
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-start gap-2 text-left"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {link.icon && <span className="shrink-0 mt-[3px]">{link.icon}</span>}
                        <span className="leading-relaxed">{link.label}</span>
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-start gap-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {link.icon && <span className="shrink-0 mt-[3px]">{link.icon}</span>}
                        <span className="leading-relaxed">{link.label}</span>
                      </a>
                    )}
                  </li>
                ))}

                {/* Admin Portal "Backdoor" */}
                {section === "Quick Links" && (
                  <li>
                    <button
                      onClick={onAdminClick}
                      className="text-gray-600 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 mt-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Admin Portal
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* CTA Section */}
          <div>
            <h4 className="text-white mb-4 uppercase tracking-widest" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem", fontWeight: 700 }}>
              GET INVOLVED
            </h4>
            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Don't miss out. Registration closes April 20, 2026.
            </p>
            <button
              onClick={onRegister}
              className="w-full px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 text-sm font-bold mb-3"
              style={{
                fontFamily: "Orbitron, sans-serif",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              REGISTER NOW
            </button>
            <p className="text-cyan-400/60 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
              Participation: Students only.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}