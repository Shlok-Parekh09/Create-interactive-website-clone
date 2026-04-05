import { Zap, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

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
    { label: "Irla, Vile Parle, Mumbai - 400056", href: "#", icon: <MapPin className="w-3.5 h-3.5" /> },
  ],
};

const socials = [
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/sbmpce_math", label: "Instagram" },
];

// 1. Added onAdminClick to the interface
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
              <span
                className="text-white"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
              >
                The <span className="text-cyan-400">MARTRIX</span>
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
                    {"href" in link && (link.href as string).startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 text-left"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {link.icon && link.icon}
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {link.icon && link.icon}
                        {link.label}
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

          {/* Bottom bar */}
          <div className="border-t border-cyan-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white-600 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
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