import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const PHONE = "2348001000001";
const MESSAGE = "Hello! I'm interested in FCC Fore-City Construction services.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShowBubble(true), 3000);
      return () => clearTimeout(t);
    }
    setShowBubble(false);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showBubble && (
        <div
          className="relative px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in"
          style={{ background: "var(--clr-card)", color: "var(--clr-text)" }}
        >
          <div
            className="absolute -bottom-1.5 right-5 w-3 h-3 rotate-45"
            style={{ background: "var(--clr-card)" }}
          />
          Chat with us on WhatsApp
        </div>
      )}

      <a
        href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="white" color="white" />
      </a>
    </div>
  );
}
