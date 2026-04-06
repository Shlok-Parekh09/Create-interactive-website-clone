import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Abilities", href: "#abilities" },
  { label: "Leaderboard", action: "open_leaderboard" },
  { label: "FAQ", href: "#faq" },
];

interface NavbarProps {
  onRegister: () => void;
  onOpenLeaderboard: () => void; // 1. Added the prop here
}

export function Navbar({ onRegister, onOpenLeaderboard }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#050510]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <img src="/sankhya-logo.png" alt="Sankhya" className="w-8 h-8 object-contain" />
              <div className="absolute inset-0 blur-sm bg-cyan-400/30 group-hover:bg-cyan-300/40 transition-colors rounded-full" />
            </div>
            <span
              className="text-white group-hover:text-cyan-300 transition-colors"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
            >
              The<span className="text-cyan-400">Matrix</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label} // 2. Changed key to label since href might be undefined
                onClick={() => {
                  // 3. Routing Logic: Action vs Href
                  if (link.action === "open_leaderboard") {
                    onOpenLeaderboard();
                  } else if (link.href) {
                    handleNavClick(link.href);
                  }
                }}
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm relative group"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={onRegister}
              className="ml-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 text-sm relative overflow-hidden group"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <span className="relative z-10">REGISTER</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-[#050510]/98 backdrop-blur-md border-b border-cyan-500/20 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label} // 2. Changed key to label
              onClick={() => {
                // 3. Routing Logic for Mobile
                if (link.action === "open_leaderboard") {
                  setIsOpen(false);
                  onOpenLeaderboard();
                } else if (link.href) {
                  handleNavClick(link.href);
                }
              }}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm text-left py-2 border-b border-gray-800"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setIsOpen(false); onRegister(); }}
            className="mt-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 text-sm w-full"
            style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700 }}
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}