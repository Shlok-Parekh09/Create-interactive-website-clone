import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who can participate in The Game Theory Arena?",
    a: "The tournament is open to all currently enrolled undergraduate students. Players from any branch or discipline are welcome — strategy knows no department.",
  },
  {
    q: "What is the team size and entry fee?",
    a: "Teams consist of exactly 3 players. There is a one-time entry fee of ₹60 per team (not per person). Make sure all 3 members are present and registered before the tournament begins.",
  },
  {
    q: "How does scoring work?",
    a: "Points are earned through duels using the Cooperate/Betray mechanic. Mutual cooperation gives both players +3 pts. Betraying a cooperator gives you +5 pts but the opponent 0. Mutual betrayal gives only +1 pt both. The team with the highest points at the end wins.",
  },
  {
    q: "What happens if my team's health hits zero?",
    a: "Immediate elimination.Your points will be Freezed.",
  },
  {
    q: "How do Secret Abilities work?",
    a: "Each player holds three secret ability card (Shield, Sword, Poison, Arrows, or Healing Potion), drafted so no two teams have the same setup. Abilities are one-time use per player for the entire tournament and must be declared at the same moment you reveal your Cooperate/Betray choice. Use them wisely you only get one shot.",
  },
  {
    q: "What is the Bounty System?",
    a: "After a set number of Round all the participate team can decide one team as *The bounty team* And if the boundary team is killed the team which killed it may get 50% of all points earn by the team,They get +2pt every round",
  },
  {
    q: "How many rounds are there?",
    a: "The host announces the total number of rounds before the tournament begins (typically 4). This number is fixed and visible to all participants throughout — no hidden extensions, no surprises. Every decision counts, especially in the final rounds.",
  },
  {
    q: "What's the best strategy cooperate or betray?",
    a: "That's the game. Pure betrayal burns health and invites Bounties. Pure cooperation leaves you vulnerable to Sword and Arrows. The optimal play shifts every round based on your opponents, your health, your abilities in play. Read the room and your opponents.",
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
            // INTEL BRIEFING
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
          <p
            className="text-gray-400 mt-4 text-sm"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            Knowing the rules is your first competitive advantage.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border transition-all duration-300"
              style={{
                borderColor:
                  openIndex === index
                    ? "rgba(0,245,255,0.4)"
                    : "rgba(0,245,255,0.1)",
                backgroundColor:
                  openIndex === index ? "rgba(0,245,255,0.03)" : "#080820",
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left group"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span
                  className={`transition-colors ${
                    openIndex === index
                      ? "text-cyan-400"
                      : "text-white group-hover:text-cyan-300"
                  }`}
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className={`ml-4 flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? "text-cyan-400" : "text-gray-500"
                  }`}
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
                style={{
                  maxHeight: openIndex === index ? "300px" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div
                  className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-cyan-500/10 pt-4"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.9rem",
                  }}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p
            className="text-gray-400 mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Still have questions?
          </p>
          <p
            className="text-gray-500 text-xs mb-4"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            Contact us through the email .
          </p>
        </div>
      </div>
    </section>
  );
}