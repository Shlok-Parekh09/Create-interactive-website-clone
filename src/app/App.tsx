import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Timeline } from "./components/Timeline";
import { Abilities } from "./components/Abilities";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { RegistrationModal } from "./components/RegistrationModal";

// Import the components
import { FullScreenLeaderboard, TeamProps } from "./components/FullScreenLeaderboard";
import { Admin } from "./components/admin";
import { Lock, ShieldAlert, Activity } from "lucide-react"; 

const initialArenaTeams: TeamProps[] = [];

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // ── SHARED ARENA STATE ──
  const [arenaTeams, setArenaTeams] = useState<TeamProps[]>(initialArenaTeams);

  useEffect(() => {
    const docRef = doc(db, "gameState", "current");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.teams) {
          setArenaTeams(data.teams);
        }
      } else {
        // Initialize if not exists
        setDoc(docRef, { teams: initialArenaTeams });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSetTeams = (newTeams: TeamProps[]) => {
    const docRef = doc(db, "gameState", "current");
    setDoc(docRef, { teams: newTeams }, { merge: true });
    // Update local state optimistically
    setArenaTeams(newTeams);
  };

  // ── STATE ──
  const [currentView, setCurrentView] = useState<'landing' | 'leaderboard' | 'admin' | 'admin_login'>('landing');
  
  // ── SECURITY STATE ──
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeout = useRef<number | null>(null);

  // --- SECURITY LOGIN HANDLER ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "MATRIX") { 
      setCurrentView('admin');
      setPasswordInput("");
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput("");
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      console.log("Initial autoplay prevented by browser.");
    });

    let lastScrollY = window.scrollY;
    let targetTime = 0;
    let isRewinding = false;
    let animationFrameId: number;

    const smoothRewind = () => {
      if (!video || !isRewinding) return;
      video.currentTime += (targetTime - video.currentTime) * 0.1;
      if (Math.abs(targetTime - video.currentTime) < 0.01) {
        isRewinding = false;
        video.pause();
      } else {
        animationFrameId = requestAnimationFrame(smoothRewind);
      }
    };

    const handleScroll = () => {
      if (currentView !== 'landing') return;

      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (currentScrollY < 50) {
        isRewinding = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        video.play().catch(() => { });
        return;
      }

      if (deltaY > 0) {
        isRewinding = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (video.paused) video.play().catch(() => { });
      } else if (deltaY < 0) {
        video.pause();
        if (!isRewinding) {
          targetTime = video.currentTime;
          isRewinding = true;
          smoothRewind();
        }
        const rewindAmount = Math.abs(deltaY) * 0.008;
        targetTime = Math.max(0, targetTime - rewindAmount);
      }

      scrollTimeout.current = window.setTimeout(() => {
        if (!isRewinding) video.pause();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [currentView]);

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ── Fixed full-site video background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/video/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Background Overlays */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(2,2,8,0.80) 0%, rgba(5,5,24,0.72) 50%, rgba(2,2,8,0.80) 100%)", zIndex: -1 }} />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at 50% 30%, rgba(0,245,255,0.06) 0%, rgba(139,0,255,0.04) 50%, transparent 80%)", zIndex: -1 }} />

      {/* ── PUBLIC HUD TOGGLE (Floating Bottom Right) ── */}
      {(currentView === 'landing' || currentView === 'leaderboard') && (
        <div className="fixed bottom-6 right-6 z-[200]">
          <button
            onClick={() => setCurrentView(currentView === 'leaderboard' ? 'landing' : 'leaderboard')}
            className={`flex items-center gap-2 p-4 rounded-full shadow-lg font-mono text-sm hover:scale-110 transition-all uppercase font-black ${
              currentView === 'leaderboard' 
                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                : 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]'
            }`}
          >
            {currentView === 'leaderboard' ? 'Exit The Leaderboard' : (
              <>
                <Activity size={18} className="animate-pulse" /> Open The Leaderboard
              </>
            )}
          </button>
        </div>
      )}

      {/* ── CONDITIONAL VIEWS ── */}
      
      {/* 1. THE SECURITY GATEWAY */}
      {currentView === 'admin_login' ? (
        <div className="relative z-50 flex items-center justify-center min-h-screen p-6">
          <div className="bg-[#050518]/95 p-8 border-2 border-cyan-500/30 backdrop-blur-md w-full max-w-md" style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}>
            <div className="flex flex-col items-center mb-8">
              <Lock className="text-cyan-400 mb-4" size={40} />
              <h2 className="text-white font-orbitron text-2xl font-black uppercase tracking-widest">System Override</h2>
              <p className="text-gray-500 font-mono text-xs mt-2 uppercase">Enter Authorization Code</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="PASSWORD..."
                className={`w-full bg-black/50 border-b-2 text-center text-white font-mono py-3 outline-none transition-colors tracking-[0.5em] ${loginError ? "border-red-500 text-red-500" : "border-cyan-500/50 focus:border-cyan-400"}`}
                autoFocus
              />
              {loginError && (
                <div className="flex items-center justify-center gap-2 text-red-500 font-mono text-xs uppercase animate-pulse">
                  <ShieldAlert size={14} /> Access Denied
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setCurrentView('landing')} className="flex-1 py-3 text-gray-400 border border-gray-600 hover:bg-gray-800 font-mono text-xs uppercase transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-cyan-500 text-black font-bold font-mono text-xs uppercase hover:bg-cyan-400 transition">Authenticate</button>
              </div>
            </form>
          </div>
        </div>
      
      /* 2. THE FULL-SCREEN LEADERBOARD */
      ) : currentView === 'leaderboard' ? (
        <FullScreenLeaderboard teams={arenaTeams} />

      
      /* 3. THE ADMIN COMMAND CENTER */
      ) : currentView === 'admin' ? (
        <div className="relative z-10 pt-20 min-h-screen flex flex-col items-center p-8">
          <div className="max-w-6xl w-full mb-4 flex justify-end gap-4">
            <button onClick={() => setCurrentView('landing')} className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 font-mono text-xs uppercase hover:bg-red-500 hover:text-white transition">
              Logout System
            </button>
          </div>
          <Admin teams={arenaTeams} setTeams={handleSetTeams} />
        </div>
      
      /* 4. THE LANDING PAGE */
      ) : (
        <>
          {/* FIXED: Removed the Error throw and passed the correct function */}
          <Navbar 
            onRegister={() => setIsRegisterOpen(true)} 
            onOpenLeaderboard={() => setCurrentView('leaderboard')} 
          />
          <Hero onRegister={() => setIsRegisterOpen(true)} />
          <About />
          <Timeline />
          <Abilities />
          <FAQ />
          <Footer 
                  onRegister={() => setIsRegisterOpen(true)}
                  onAdminClick={() => setCurrentView('admin')} 
                  onOpenLeaderboard={() => setCurrentView('leaderboard')}        />
        </>
      )}

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}