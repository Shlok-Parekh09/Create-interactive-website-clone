import { useState, useEffect } from "react";
import {
  X, CheckCircle, User, Mail, Phone, GraduationCap, Users,
  ChevronDown, CreditCard, Copy, Check, Shield, LogIn,
  LayoutDashboard, Users2, TrendingUp, ChevronRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface TeamRecord {
  id: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  year: string;
  teamName: string;
  teamSize: string;
  linkedIn: string;
  github: string;
  txnId: string;
  registeredAt: string;
}

interface FormData {
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  year: string;
  teamName: string;
  teamSize: string;
  linkedIn: string;
  github: string;
  txnId: string;
  agreeTerms: boolean;
}

const ADMIN_EMAIL = "yugshah197@gmail.com";
const STORAGE_KEY = "neofuture_registered_teams";

const getRegisteredTeams = (): TeamRecord[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveTeam = (data: FormData) => {
  const teams = getRegisteredTeams();
  const newTeam: TeamRecord = {
    id: Date.now().toString(),
    leaderName: data.leaderName,
    leaderEmail: data.leaderEmail,
    leaderPhone: data.leaderPhone,
    college: data.college,
    year: data.year,
    teamName: data.teamName,
    teamSize: data.teamSize,
    linkedIn: data.linkedIn,
    github: data.github,
    txnId: data.txnId,
    registeredAt: new Date().toLocaleString("en-IN"),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...teams, newTeam]));
};

const teamSizes = ["2 Members", "3 Members", "4 Members"];
const UPI_ID = "yugshah197@upi";

// ─── Main Component ───────────────────────────────────────────────────────────

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [adminTeams, setAdminTeams] = useState<TeamRecord[]>([]);

  const [form, setForm] = useState<FormData>({
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    college: "",
    year: "",
    teamName: "",
    teamSize: "",
    linkedIn: "",
    github: "",
    txnId: "",
    agreeTerms: false,
  });

  // Refresh admin teams when entering admin mode
  useEffect(() => {
    if (isAdmin) {
      setAdminTeams(getRegisteredTeams());
    }
  }, [isAdmin]);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  // ─── Google OAuth (mock flow — real Google OAuth requires backend/client ID) ──
  const handleGoogleLogin = () => {
    // We use window.open with Google OAuth prompt. For a pure frontend demo,
    // we simulate fetching profile info. In production, plug in your Google Client ID.
    const mockProfiles: Record<string, GoogleUser> = {
      [ADMIN_EMAIL]: {
        name: "Yug Shah",
        email: ADMIN_EMAIL,
        picture: `https://ui-avatars.com/api/?name=Yug+Shah&background=00f5ff&color=000&size=80`,
      },
    };

    // Show a small prompt asking for email to simulate Google pick-account screen
    const email = window.prompt(
      "Google Sign-In Simulation\n\nEnter your Google email address:",
      ""
    );
    if (!email) return;

    const lower = email.trim().toLowerCase();

    // Check if admin
    if (lower === ADMIN_EMAIL.toLowerCase()) {
      setGoogleUser(mockProfiles[ADMIN_EMAIL]);
      setIsAdmin(true);
      return;
    }

    // Regular user — pre-fill form fields
    const namePart = lower.split("@")[0].replace(/[._]/g, " ")
      .split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    const user: GoogleUser = {
      name: namePart,
      email: lower,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(namePart)}&background=00f5ff&color=000&size=80`,
    };

    setGoogleUser(user);
    setForm(f => ({
      ...f,
      leaderName: user.name,
      leaderEmail: user.email,
    }));
  };

  // ─── Validation ────────────────────────────────────────────────────────────

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.leaderName.trim()) e.leaderName = "Required";
    if (!form.leaderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.leaderEmail))
      e.leaderEmail = "Valid email required";
    if (!form.leaderPhone.trim() || !/^\d{10}$/.test(form.leaderPhone))
      e.leaderPhone = "10-digit phone required";
    if (!form.college.trim()) e.college = "Required";
    if (!form.year) e.year = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.teamName.trim()) e.teamName = "Required";
    if (!form.teamSize) e.teamSize = "Required";
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!form.txnId.trim() || form.txnId.trim().length < 6)
      e.txnId = "Enter a valid transaction ID (min 6 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      saveTeam(form);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setErrors({});
      setGoogleUser(null);
      setIsAdmin(false);
      setCopiedUPI(false);
      setForm({
        leaderName: "", leaderEmail: "", leaderPhone: "", college: "",
        year: "", teamName: "", teamSize: "",
        linkedIn: "", github: "", txnId: "", agreeTerms: false,
      });
    }, 300);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).catch(() => {});
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  if (!isOpen) return null;

  // ─── Render: Admin Portal ──────────────────────────────────────────────────
  if (isAdmin) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(2,2,8,0.97)", backdropFilter: "blur(12px)" }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#080820] border border-cyan-500/30"
          style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Admin Header */}
          <div className="flex items-center justify-between p-6 border-b border-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={googleUser?.picture} alt="admin" className="w-10 h-10 rounded-full" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Shield className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
              <div>
                <h2
                  className="text-white"
                  style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1rem", fontWeight: 700 }}
                >
                  ADMIN <span style={{ color: "#00f5ff" }}>PORTAL</span>
                </h2>
                <p className="text-gray-500 text-xs" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                  {googleUser?.email}
                </p>
              </div>
            </div>
            <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-cyan-500/10">
            {[
              { icon: <Users2 className="w-5 h-5" />, label: "Total Teams", value: adminTeams.length },
              {
                icon: <TrendingUp className="w-5 h-5" />, label: "Total Revenue",
                value: `₹${adminTeams.length * 40}`
              },
              {
                icon: <LayoutDashboard className="w-5 h-5" />, label: "Avg Team Size",
                value: adminTeams.length
                  ? Math.round(
                    adminTeams.reduce((acc, t) => acc + parseInt(t.teamSize.charAt(0) || "0"), 0) / adminTeams.length
                  ) + " members"
                  : "—"
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="p-4 border border-cyan-500/15 bg-cyan-500/5"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
              >
                <div className="flex items-center gap-2 mb-1" style={{ color: "#00f5ff" }}>
                  {icon}
                  <span className="text-xs text-gray-400" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                    {label}
                  </span>
                </div>
                <p className="text-white text-xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Teams Table */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm text-gray-400 tracking-widest uppercase"
                style={{ fontFamily: "Share Tech Mono, monospace" }}
              >
                Registered Teams
              </h3>
              <button
                onClick={() => setAdminTeams(getRegisteredTeams())}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                style={{ fontFamily: "Share Tech Mono, monospace" }}
              >
                ↻ REFRESH
              </button>
            </div>

            {adminTeams.length === 0 ? (
              <div className="text-center py-12 text-gray-600" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                NO TEAMS REGISTERED YET
              </div>
            ) : (
              <div className="space-y-3">
                {adminTeams.map((team, idx) => (
                  <div
                    key={team.id}
                    className="p-4 border border-cyan-500/15 bg-[#050518] hover:border-cyan-500/30 transition-colors"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs text-cyan-500"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-white font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {team.teamName}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                            {team.teamSize} · {team.college}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-300" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {team.leaderName}
                        </p>
                        <p className="text-xs text-gray-500">{team.leaderEmail}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-500/10 flex items-center justify-between">
                      <span className="text-xs text-gray-600" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                        TXN: <span className="text-cyan-600">{team.txnId}</span>
                      </span>
                      <span className="text-xs text-green-500" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                        ₹40 PAID · {team.registeredAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Regular Registration Flow ────────────────────────────────────
  const totalSteps = 3;
  const stepLabels = ["PERSONAL INFO", "TEAM DETAILS", "PAYMENT"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(2, 2, 8, 0.95)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#080820] border border-cyan-500/30"
        style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
      >
        {/* Top accent */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/10">
          <div>
            <h2
              className="text-white"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
            >
              REGISTER FOR <span style={{ color: "#00f5ff" }}>NEOFUTURE</span>
            </h2>
            {!submitted && (
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                STEP {step} OF {totalSteps} — {stepLabels[step - 1]}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress */}
        {!submitted && (
          <div className="flex gap-1 px-6 pt-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 transition-all duration-300"
                style={{
                  background: i + 1 <= step ? "#00f5ff" : "rgba(0,245,255,0.15)",
                  boxShadow: i + 1 <= step ? "0 0 8px rgba(0,245,255,0.5)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            /* ─── Success Page ─────────────────────────────────────────── */
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-cyan-400" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full" />
                </div>
              </div>
              <h3
                className="text-cyan-400 mb-3"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.3rem", fontWeight: 707 }}
              >
                REGISTRATION SUCCESSFUL!
              </h3>
              <p className="text-gray-300 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Welcome to NeoFuture 2026, <span className="text-white">{form.leaderName}</span>!
              </p>
              <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                A confirmation will be sent to{" "}
                <span className="text-cyan-400">{form.leaderEmail}</span>.
                We'll notify you about shortlisting by April 22, 2026.
              </p>
              <div
                className="p-4 border border-cyan-500/20 bg-cyan-500/5 mb-6 text-left"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
              >
                <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                  REGISTRATION SUMMARY
                </p>
                <div className="space-y-1 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  <p><span className="text-gray-400">Team:</span> <span className="text-white">{form.teamName}</span></p>
                  <p><span className="text-gray-400">Size:</span> <span className="text-white">{form.teamSize}</span></p>
                  <p><span className="text-gray-400">Payment:</span> <span className="text-green-400">₹40 — TXN {form.txnId}</span></p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                CLOSE
              </button>
            </div>
          ) : (
            <div>
              {/* ─── Step 1: Personal Info ────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Google Login Button */}
                  {!googleUser ? (
                    <div className="mb-2">
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-cyan-500/20 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-200 text-sm text-white"
                        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
                      >
                        {/* Google icon SVG */}
                        <svg width="18" height="18" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 3.5 29.6 1.5 24 1.5 14.8 1.5 7 7.2 3.7 15.1l7 5.4C12.4 14 17.7 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-10 6.8-16.9z"/>
                          <path fill="#FBBC05" d="M10.7 28.5L3.7 33.9C7 41.8 14.8 47.5 24 47.5c5.6 0 10.3-1.9 13.8-5.1l-7.4-5.7c-1.8 1.2-4 2-6.4 2-6.3 0-11.6-4.5-13.3-10.2z"/>
                          <path fill="#34A853" d="M3.7 15.1C2.6 17.7 2 20.5 2 23.5s.6 5.8 1.7 8.4l7-5.4c-.2-.9-.4-1.9-.4-3s.1-2.1.4-3l-7-5.4z"/>
                        </svg>
                        Continue with Google
                      </button>
                      <div className="flex items-center gap-2 my-4">
                        <div className="flex-1 h-px bg-cyan-500/10" />
                        <span className="text-xs text-gray-600" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                          OR FILL MANUALLY
                        </span>
                        <div className="flex-1 h-px bg-cyan-500/10" />
                      </div>
                    </div>
                  ) : (
                    /* Google user pill */
                    <div className="flex items-center gap-3 p-3 border border-cyan-500/25 bg-cyan-500/5 mb-4"
                      style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                    >
                      <img src={googleUser.picture} alt={googleUser.name} className="w-9 h-9 rounded-full" />
                      <div>
                        <p className="text-sm text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{googleUser.name}</p>
                        <p className="text-xs text-cyan-400" style={{ fontFamily: "Share Tech Mono, monospace" }}>{googleUser.email}</p>
                      </div>
                      <button
                        onClick={() => { setGoogleUser(null); setForm(f => ({ ...f, leaderName: "", leaderEmail: "" })); }}
                        className="ml-auto text-gray-600 hover:text-gray-400 text-xs"
                        style={{ fontFamily: "Share Tech Mono, monospace" }}
                      >
                        CHANGE
                      </button>
                    </div>
                  )}

                  <FormField label="Full Name *" icon={<User className="w-4 h-4" />} type="text"
                    placeholder="John Doe" value={form.leaderName}
                    onChange={(v) => update("leaderName", v)} error={errors.leaderName} />
                  <FormField label="Email Address *" icon={<Mail className="w-4 h-4" />} type="email"
                    placeholder="john@example.com" value={form.leaderEmail}
                    onChange={(v) => update("leaderEmail", v)} error={errors.leaderEmail} />
                  <FormField label="Phone Number *" icon={<Phone className="w-4 h-4" />} type="tel"
                    placeholder="9876543210" value={form.leaderPhone}
                    onChange={(v) => update("leaderPhone", v)} error={errors.leaderPhone} />
                  <FormField label="College / University *" icon={<GraduationCap className="w-4 h-4" />} type="text"
                    placeholder="SLRTCE, Mumbai" value={form.college}
                    onChange={(v) => update("college", v)} error={errors.college} />
                  <SelectField label="Year of Study *" value={form.year}
                    onChange={(v) => update("year", v)}
                    options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"]}
                    placeholder="Select year..." error={errors.year} />
                </div>
              )}

              {/* ─── Step 2: Team Details ─────────────────────────────── */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Set up your team details below.
                  </p>
                  <FormField label="Team Name *" icon={<Users className="w-4 h-4" />} type="text"
                    placeholder="Team Nexus" value={form.teamName}
                    onChange={(v) => update("teamName", v)} error={errors.teamName} />
                  <SelectField label="Team Size *" value={form.teamSize}
                    onChange={(v) => update("teamSize", v)}
                    options={teamSizes} placeholder="Select team size..." error={errors.teamSize} />
                  <FormField label="LinkedIn Profile (optional)" icon={<User className="w-4 h-4" />} type="url"
                    placeholder="https://linkedin.com/in/..." value={form.linkedIn}
                    onChange={(v) => update("linkedIn", v)} />
                  <FormField label="GitHub Profile (optional)" icon={<User className="w-4 h-4" />} type="url"
                    placeholder="https://github.com/..." value={form.github}
                    onChange={(v) => update("github", v)} />

                  {/* Terms */}
                  <div className="flex items-start gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => update("agreeTerms", !form.agreeTerms)}
                      className="mt-0.5 w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-all"
                      style={{
                        borderColor: form.agreeTerms ? "#00f5ff" : "rgba(0,245,255,0.3)",
                        backgroundColor: form.agreeTerms ? "rgba(0,245,255,0.1)" : "transparent",
                      }}
                    >
                      {form.agreeTerms && <span style={{ color: "#00f5ff", fontSize: "0.7rem" }}>✓</span>}
                    </button>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      I agree to the{" "}
                      <span className="text-cyan-400 cursor-pointer hover:underline">Terms & Conditions</span>{" "}
                      and{" "}
                      <span className="text-cyan-400 cursor-pointer hover:underline">Code of Conduct</span>{" "}
                      for NeoFuture 2026.
                    </p>
                  </div>
                  {errors.agreeTerms && (
                    <span className="text-xs text-red-400 block" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>
              )}

              {/* ─── Step 3: Payment ──────────────────────────────────── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="text-center">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-500/5 mb-1"
                      style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 font-bold" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem" }}>
                        ₹40.00
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-2" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                      ONE-TIME REGISTRATION FEE
                    </p>
                  </div>

                  {/* QR Code */}
                  <div
                    className="flex flex-col items-center p-5 border border-cyan-500/20 bg-[#050518]"
                    style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                  >
                    <p className="text-xs text-gray-500 mb-3 tracking-widest" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                      SCAN TO PAY VIA UPI
                    </p>
                    <div className="relative mb-4" style={{ boxShadow: "0 0 30px rgba(0,245,255,0.15)" }}>
                      <img
                        src="/upi_qr.png"
                        alt="UPI QR Code"
                        className="w-48 h-48 object-contain"
                        style={{ border: "2px solid rgba(0,245,255,0.3)" }}
                      />
                      <div className="absolute -inset-1 blur-md bg-cyan-400/5" />
                    </div>

                    {/* UPI ID Copy Row */}
                    <div
                      className="flex items-center gap-2 px-4 py-2 border border-cyan-500/20 bg-[#080820] w-full justify-between"
                      style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500" style={{ fontFamily: "Share Tech Mono, monospace" }}>UPI ID:</span>
                        <span className="text-sm text-cyan-400" style={{ fontFamily: "Share Tech Mono, monospace" }}>{UPI_ID}</span>
                      </div>
                      <button
                        onClick={copyUPI}
                        className="text-gray-500 hover:text-cyan-400 transition-colors p-1"
                        title="Copy UPI ID"
                      >
                        {copiedUPI ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <ol className="space-y-2 text-xs text-gray-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {[
                      "Open any UPI app (GPay, PhonePe, Paytm, etc.)",
                      "Scan the QR above or pay to the UPI ID",
                      "Enter amount ₹40 and complete payment",
                      "Copy your Transaction ID and paste below",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs"
                          style={{ borderColor: "rgba(0,245,255,0.4)", color: "#00f5ff" }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  {/* Transaction ID input */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
                      style={{ fontFamily: "Share Tech Mono, monospace" }}>
                      Transaction / UTR ID *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="e.g. 412836501234"
                        value={form.txnId}
                        onChange={(e) => update("txnId", e.target.value)}
                        className="w-full bg-[#050518] border text-white text-sm py-3 pr-3 pl-10 outline-none transition-colors placeholder-gray-600"
                        style={{
                          fontFamily: "Share Tech Mono, monospace",
                          borderColor: errors.txnId ? "#ef4444" : "rgba(0,245,255,0.2)",
                          letterSpacing: "0.05em",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.6)")}
                        onBlur={(e) => (e.target.style.borderColor = errors.txnId ? "#ef4444" : "rgba(0,245,255,0.2)")}
                      />
                    </div>
                    {errors.txnId && (
                      <span className="text-xs text-red-400 mt-1 block" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                        {errors.txnId}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 text-center" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                    Payment will be verified manually. Registration is confirmed on payment verification.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-5 py-3 border border-cyan-500/30 text-gray-400 hover:text-white hover:border-cyan-500/60 transition-all text-sm"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 700,
                      clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    }}
                  >
                    BACK
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 text-sm relative overflow-hidden group"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    boxShadow: "0 0 20px rgba(0,245,255,0.2)",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {step === 3 ? (
                      <><CheckCircle className="w-4 h-4" /> CONFIRM PAYMENT & REGISTER</>
                    ) : (
                      <>NEXT STEP <ChevronRight className="w-4 h-4" /></>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Sub-components ─────────────────────────────────────────────────

function FormField({
  label, icon, type, placeholder, value, onChange, error,
}: {
  label: string;
  icon?: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
        style={{ fontFamily: "Share Tech Mono, monospace" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#050518] border text-white text-sm py-3 pr-3 outline-none transition-colors placeholder-gray-600"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            paddingLeft: icon ? "2.5rem" : "0.75rem",
            borderColor: error ? "#ef4444" : "rgba(0,245,255,0.2)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = error ? "#ef4444" : "rgba(0,245,255,0.2)")}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 mt-1 block" style={{ fontFamily: "Share Tech Mono, monospace" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder, error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
        style={{ fontFamily: "Share Tech Mono, monospace" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#050518] border text-sm py-3 px-3 pr-10 outline-none transition-colors appearance-none cursor-pointer"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            borderColor: error ? "#ef4444" : "rgba(0,245,255,0.2)",
            color: value ? "white" : "#4b5563",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = error ? "#ef4444" : "rgba(0,245,255,0.2)")}
        >
          <option value="" disabled style={{ color: "#4b5563", background: "#050518" }}>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#050518", color: "white" }}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
      {error && (
        <span className="text-xs text-red-400 mt-1 block" style={{ fontFamily: "Share Tech Mono, monospace" }}>
          {error}
        </span>
      )}
    </div>
  );
}