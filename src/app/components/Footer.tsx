import { Zap, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface FooterLink {
  label: string;
  href?: string;
  action?: string;
  icon?: React.ReactNode;
}

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Abilities", href: "#abilities" },
    { label: "Leaderboard", action: "open_leaderboard" }, // Fixed the double comma here!
    { label: "FAQ", href: "#faq" }
  ],
  "Contact": [
    { label: "sbmpcemaths@gmail.com", href: "mailto:sbmpcemaths@gmail.com", icon: <Mail className="w-3.5 h-3.5" /> },
    { label: "+91 9137143315", href: "tel:+919137143315", icon: <Phone className="w-3.5 h-3.5" /> },
    { label: "Irla, N. R. G. Marg, opp. Cooper Hospital, Navpada, Suvarna Nagar, Vile Parle, Mumbai - 400056", href: "https://maps.google.com/?q=Irla,NRG+Marg,Opposite+Cooper+Hospital,Vile+Parle,Mumbai,400056", icon: <MapPin className="w-3.5 h-3.5" /> },
  ],
};

const socials = [
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/sbmpce_math?igsh=MWd4NnZkY3dlZTVqdg==", label: "Instagram" },
];

// Added onOpenLeaderboard to the interface!
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
    <footer
      className="relative border-t border-cyan-500/10 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <span
                className="text-white"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
              >
                The <span className="text-cyan-400">MATRIX</span>
              </span>
            </div>
            <p
              className="text-gray-500 text-sm mb-6 leading-relaxed"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              SANKHYA's Premier Game Theory Arena. Negotiate. Betray. Survive the Matrix. A high-stakes tournament where 10 Health is your only currency and every alliance has a price.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-cyan-500/20 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/60 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-white mb-4"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {/* Routing logic added here to check for the action! */}
                    {"action" in link && link.action === "open_leaderboard" ? (
                      <button
                        onClick={onOpenLeaderboard}
                        className="text-gray-500 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {"icon" in link && link.icon}
                        {link.label}
                      </button>
                    ) : "href" in link && (link.href as string).startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(link.href as string)}
                        className="text-gray-500 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {"icon" in link && link.icon}
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href as string}
                        className="text-gray-500 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {"icon" in link && link.icon}
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}

                {/* 2. THE SECURITY BACKDOOR */}
                {/* This only renders under the "Quick Links" section */}
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

          {/* CTA */}
          <div>
            <h4
              className="text-white mb-4"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              GET INVOLVED
            </h4>
            <p className="text-gray-500 text-sm mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Don't miss out. Registration closes April 20, 2026.
            </p>
            <button
              onClick={onRegister}
              className="w-full px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 text-sm mb-3"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              REGISTER NOW
            </button>
            <p className="text-white-600 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
              Participation: Students only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyan-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
            © 2026 The Martrix, SANKHYA. All rights reserved.
          </p>
          <p className="text-white-600 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
            Irla, N. R. G. Marg, Opposite Cooper Hospital, Navpada, Suvarna Nagar, Vile Parle, Mumbai, Maharashtra 400056
          </p>
        </div>
      </div>
    </footer>
  );
}