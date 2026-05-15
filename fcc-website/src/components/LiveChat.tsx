import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, MinusCircle } from "lucide-react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

const initialBotMessage =
  "Hello! Welcome to FCC Fore-City Construction. How can we help you today? You can ask about our services, properties, projects, or anything else.";

const responses: Record<string, string> = {
  services:
    "We offer five core divisions: Construction & Engineering, Real Estate & Property, Facility & Property Management, Interior & Finishing, and Workforce & Equipment Solutions. Which area interests you?",
  construction:
    "Our Construction & Engineering division handles residential, commercial, industrial, and government projects. We also offer road construction, bridge and drainage systems, and smart home construction.",
  realestate:
    "Our Real Estate division connects buyers, investors, and developers to opportunities in Nigeria's fastest-growing cities. We handle land sales, property sales, leasing, and investment advisory.",
  property: "We have premium properties for sale and rent across Lagos, Abuja, Port Harcourt, and more. Visit our Properties page to browse current listings!",
  pricing: "Our pricing varies by project scope and requirements. Please use the Contact form to request a customized quote, or call us at +234 800 100 0001.",
  location: "We have offices in Lagos (HQ), Abuja, and Port Harcourt. Visit our Contact page for full details and directions.",
  careers:
    "We're hiring! Check our Careers page for open positions across Engineering, Construction, Real Estate, Technology, and more. We also welcome artisan and contractor registrations.",
  timing: "Our team typically responds to enquiries within 24 hours. For urgent matters, call our emergency line at +234 800 100 0099.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("service") || lower.includes("division")) return responses.services;
  if (lower.includes("construction") || lower.includes("build") || lower.includes("engineering"))
    return responses.construction;
  if (lower.includes("real estate") || lower.includes("buy") || lower.includes("invest"))
    return responses.realestate;
  if (lower.includes("property") || lower.includes("house") || lower.includes("apartment") || lower.includes("rent") || lower.includes("lease"))
    return responses.property;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("quote"))
    return responses.pricing;
  if (lower.includes("location") || lower.includes("office") || lower.includes("address") || lower.includes("where"))
    return responses.location;
  if (lower.includes("career") || lower.includes("job") || lower.includes("work") || lower.includes("apply") || lower.includes("hire"))
    return responses.careers;
  if (lower.includes("time") || lower.includes("hour") || lower.includes("when") || lower.includes("emergency"))
    return responses.timing;
  return "Thank you for reaching out! For specific enquiries, please use our Contact form or call +234 800 100 0001. A team member will get back to you shortly.";
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "bot", text: initialBotMessage }]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(text) }]);
    }, 600);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-80 sm:w-96 rounded-lg overflow-hidden shadow-2xl border flex flex-col"
          style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)", height: "440px" }}
        >
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: "var(--clr-primary)" }}>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-white" />
              <span className="text-sm font-black text-white">FCC Live Chat</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <MinusCircle size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "var(--clr-bg-alt)" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user" ? "text-white" : ""
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "var(--clr-primary)" }
                      : { background: "var(--clr-card)", color: "var(--clr-text)" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t flex gap-2" style={{ borderColor: "var(--clr-border)", background: "var(--clr-card)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border rounded outline-none"
              style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 rounded text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--clr-primary)" }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{ background: "var(--clr-primary)" }}
        aria-label="Toggle live chat"
      >
        {open ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
      </button>
    </div>
  );
}
