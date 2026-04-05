import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who can participate in NeoFuture 2026?",
    a: "NeoFuture is open to all currently enrolled undergraduate and postgraduate students from any college in India. Students from any branch or discipline are welcome to participate.",
  },
  {
    q: "What is the team size?",
    a: "Teams can have a minimum of 2 members and a maximum of 4 members. Solo registrations are not allowed. All team members must be registered students.",
  },
  {
    q: "Is there a registration fee?",
    a: "No! NeoFuture 2026 is completely free to participate. There is no registration fee for participants. Food, accommodation (on campus), and other necessities will be provided during the event.",
  },
  {
    q: "Do I need to have a project idea before registering?",
    a: "You can register with or without an idea. However, teams will need to submit a brief abstract and problem statement of their planned project after shortlisting. Problem statements will also be revealed at the time of the event.",
  },
  {
    q: "What should I bring to the hackathon?",
    a: "Bring your laptop, charger, college ID, and any hardware components you plan to use. Venue WiFi will be provided. You're allowed to bring your own hardware (Raspberry Pi, Arduino, sensors, etc.) based on your track.",
  },
  {
    q: "Are there mentors available during the hackathon?",
    a: "Yes! We have 50+ industry mentors from leading tech companies who will be available throughout the 36 hours to guide, review, and provide technical support for your projects.",
  },
  {
    q: "How are projects judged?",
    a: "Projects are judged based on Innovation (30%), Technical Implementation (30%), Impact & Scalability (20%), Presentation & Demo (20%). A panel of industry experts and academia will evaluate all final submissions.",
  },
  {
    q: "Can I use existing code or frameworks?",
    a: "You can use open-source frameworks, libraries, APIs, and tools. However, the core logic and solution must be built during the hackathon. Using pre-built templates or submitting existing projects is not allowed.",
  },
  {
    q: "Will there be workshops and activities?",
    a: "Yes! Alongside hacking, there will be tech talks, workshops on AI/ML, blockchain, and cloud, fun activities, networking sessions, and midnight surprises to keep the energy high.",
  },
  {
    q: "How will I know if my team is shortlisted?",
    a: "Shortlisted teams will be notified via email by April 22, 2026. Keep an eye on your registered email and also follow our social media channels for updates.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-24 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="text-cyan-400 text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            // QUERIES
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            FREQUENTLY ASKED <span style={{ color: "#00f5ff" }}>QUESTIONS</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border transition-all duration-300"
              style={{
                borderColor: openIndex === index ? "rgba(0,245,255,0.4)" : "rgba(0,245,255,0.1)",
                backgroundColor: openIndex === index ? "rgba(0,245,255,0.03)" : "#080820",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span
                  className={`transition-colors ${openIndex === index ? "text-cyan-400" : "text-white group-hover:text-cyan-300"}`}
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", fontWeight: 500 }}
                >
                  {faq.q}
                </span>
                <span
                  className={`ml-4 flex-shrink-0 transition-all duration-300 ${openIndex === index ? "text-cyan-400 rotate-0" : "text-gray-500 rotate-0"}`}
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === index ? "300px" : "0px", opacity: openIndex === index ? 1 : 0 }}
              >
                <div
                  className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-cyan-500/10 pt-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem" }}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Still have questions?
          </p>
          <a
            href="mailto:neofuture@slrtce.in"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            neofuture@slrtce.in
          </a>
        </div>
      </div>
    </section>
  );
}
