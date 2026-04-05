import { useState } from "react";
import { X, CheckCircle, User, Mail, Phone, GraduationCap, Users, ChevronDown } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tracks = [
  "AI & Machine Learning",
  "Blockchain & Web3",
  "IoT & Embedded Systems",
  "HealthTech",
  "FinTech",
  "Open Innovation",
];

const teamSizes = ["2 Members", "3 Members", "4 Members"];

interface FormData {
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  year: string;
  teamName: string;
  teamSize: string;
  track: string;
  linkedIn: string;
  github: string;
  projectIdea: string;
  agreeTerms: boolean;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    college: "",
    year: "",
    teamName: "",
    teamSize: "",
    track: "",
    linkedIn: "",
    github: "",
    projectIdea: "",
    agreeTerms: false,
  });

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => { const n = {...e}; delete n[field]; return n; });
  };

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
    if (!form.track) e.track = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!form.projectIdea.trim() || form.projectIdea.length < 50)
      e.projectIdea = "Please describe your idea (min 50 characters)";
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setErrors({});
      setForm({
        leaderName: "", leaderEmail: "", leaderPhone: "", college: "",
        year: "", teamName: "", teamSize: "", track: "",
        linkedIn: "", github: "", projectIdea: "", agreeTerms: false,
      });
    }, 300);
  };

  if (!isOpen) return null;

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
                STEP {step} OF 3 — {step === 1 ? "PERSONAL INFO" : step === 2 ? "TEAM DETAILS" : "PROJECT IDEA"}
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
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1 transition-all duration-300"
                style={{
                  background: s <= step ? "#00f5ff" : "rgba(0,245,255,0.15)",
                  boxShadow: s <= step ? "0 0 8px rgba(0,245,255,0.5)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-cyan-400" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full" />
                </div>
              </div>
              <h3
                className="text-cyan-400 mb-3"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}
              >
                REGISTRATION SUCCESSFUL!
              </h3>
              <p className="text-gray-300 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Welcome to NeoFuture 2026, <span className="text-white">{form.leaderName}</span>!
              </p>
              <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                A confirmation email has been sent to <span className="text-cyan-400">{form.leaderEmail}</span>.
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
                  <p><span className="text-gray-400">Track:</span> <span className="text-cyan-400">{form.track}</span></p>
                  <p><span className="text-gray-400">Size:</span> <span className="text-white">{form.teamSize}</span></p>
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
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Enter the team leader's personal information.
                  </p>
                  <FormField
                    label="Full Name *"
                    icon={<User className="w-4 h-4" />}
                    type="text"
                    placeholder="John Doe"
                    value={form.leaderName}
                    onChange={(v) => update("leaderName", v)}
                    error={errors.leaderName}
                  />
                  <FormField
                    label="Email Address *"
                    icon={<Mail className="w-4 h-4" />}
                    type="email"
                    placeholder="john@example.com"
                    value={form.leaderEmail}
                    onChange={(v) => update("leaderEmail", v)}
                    error={errors.leaderEmail}
                  />
                  <FormField
                    label="Phone Number *"
                    icon={<Phone className="w-4 h-4" />}
                    type="tel"
                    placeholder="9876543210"
                    value={form.leaderPhone}
                    onChange={(v) => update("leaderPhone", v)}
                    error={errors.leaderPhone}
                  />
                  <FormField
                    label="College / University *"
                    icon={<GraduationCap className="w-4 h-4" />}
                    type="text"
                    placeholder="SLRTCE, Mumbai"
                    value={form.college}
                    onChange={(v) => update("college", v)}
                    error={errors.college}
                  />
                  <SelectField
                    label="Year of Study *"
                    value={form.year}
                    onChange={(v) => update("year", v)}
                    options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"]}
                    placeholder="Select year..."
                    error={errors.year}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Set up your team and choose your preferred track.
                  </p>
                  <FormField
                    label="Team Name *"
                    icon={<Users className="w-4 h-4" />}
                    type="text"
                    placeholder="Team Nexus"
                    value={form.teamName}
                    onChange={(v) => update("teamName", v)}
                    error={errors.teamName}
                  />
                  <SelectField
                    label="Team Size *"
                    value={form.teamSize}
                    onChange={(v) => update("teamSize", v)}
                    options={teamSizes}
                    placeholder="Select team size..."
                    error={errors.teamSize}
                  />
                  <SelectField
                    label="Preferred Track *"
                    value={form.track}
                    onChange={(v) => update("track", v)}
                    options={tracks}
                    placeholder="Select a track..."
                    error={errors.track}
                  />
                  <FormField
                    label="LinkedIn Profile (optional)"
                    icon={<User className="w-4 h-4" />}
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={form.linkedIn}
                    onChange={(v) => update("linkedIn", v)}
                  />
                  <FormField
                    label="GitHub Profile (optional)"
                    icon={<User className="w-4 h-4" />}
                    type="url"
                    placeholder="https://github.com/..."
                    value={form.github}
                    onChange={(v) => update("github", v)}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Briefly describe your project idea. Don't worry — it can change during the hackathon.
                  </p>
                  <div>
                    <label
                      className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
                      style={{ fontFamily: "Share Tech Mono, monospace" }}
                    >
                      Project Idea / Abstract *
                    </label>
                    <textarea
                      value={form.projectIdea}
                      onChange={(e) => update("projectIdea", e.target.value)}
                      placeholder="Describe your project idea briefly... (minimum 50 characters)"
                      rows={5}
                      className="w-full bg-[#050518] border text-white text-sm p-3 outline-none resize-none transition-colors placeholder-gray-600"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        borderColor: errors.projectIdea ? "#ef4444" : "rgba(0,245,255,0.2)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,255,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.projectIdea ? "#ef4444" : "rgba(0,245,255,0.2)")}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.projectIdea && (
                        <span className="text-xs text-red-400" style={{ fontFamily: "Share Tech Mono, monospace" }}>
                          {errors.projectIdea}
                        </span>
                      )}
                      <span className={`text-xs ml-auto ${form.projectIdea.length >= 50 ? "text-cyan-400" : "text-gray-500"}`}
                        style={{ fontFamily: "Share Tech Mono, monospace" }}>
                        {form.projectIdea.length}/50 min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mt-4">
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
                  <span className="relative z-10">
                    {step === 3 ? "SUBMIT REGISTRATION" : "NEXT STEP →"}
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

function FormField({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  error,
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
      <label
        className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
        style={{ fontFamily: "Share Tech Mono, monospace" }}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
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
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
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
      <label
        className="text-xs text-gray-400 block mb-2 tracking-wider uppercase"
        style={{ fontFamily: "Share Tech Mono, monospace" }}
      >
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
          <option value="" disabled style={{ color: "#4b5563", background: "#050518" }}>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#050518", color: "white" }}>
              {opt}
            </option>
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