import { X, CheckCircle, ExternalLink } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(2, 2, 8, 0.95)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative w-full max-w-lg bg-[#080820] border border-cyan-500/30 p-8 text-center"
        style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-cyan-400" />
            <div className="absolute inset-0 blur-2xl bg-cyan-400/20 rounded-full" />
          </div>
        </div>

        {/* Main Text */}
        <h2
          className="text-white mb-4"
          style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "1px" }}
        >
          REGISTERED <span style={{ color: "#00f5ff" }}>SUCCESSFULLY!</span>
        </h2>

        <p className="text-gray-300 text-lg mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Welcome to <span className="text-cyan-400 font-bold">THE MATRIX</span>
        </p>

        <p className="text-gray-400 text-sm mb-8 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Your presence has been recorded. We are currently finalizing the registration portal.
          Official Google Form links and further instructions will be shared shortly.
        </p>

        {/* Footer Button */}
        <button
          onClick={handleClose}
          className="px-10 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-300 group"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            boxShadow: "0 0 20px rgba(0,245,255,0.3)",
          }}
        >
          <span className="flex items-center gap-2">
            RETURN TO HOME
          </span>
        </button>
      </div>
    </div>
  );
}