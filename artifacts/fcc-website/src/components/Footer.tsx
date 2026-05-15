import { Link } from "wouter";
import { Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_May_14,_2026,_11_06_01_PM_1778796680823.png";

const divisions = [
  "Construction & Engineering",
  "Real Estate & Property",
  "Facility & Property Management",
  "Interior & Finishing",
  "Workforce & Equipment",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/projects", label: "Projects" },
  { href: "/properties", label: "Properties" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { Icon: Facebook, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--clr-bg-footer)", borderColor: "rgba(255,255,255,0.08)" }}>
      {/* Gradient accent line */}
      <div className="h-1 w-full" style={{ background: "var(--clr-gradient-accent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoImg} alt="FCC Fore-City Construction" className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              One company. Endless possibilities. Building cities and creating futures across Africa with world-class construction, real estate, and infrastructure solutions.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  data-testid={`social-icon-${i}`}
                  className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">Our Divisions</h3>
            <ul className="space-y-3">
              {divisions.map((d) => (
                <li key={d} className="text-sm flex items-center gap-2 cursor-default transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--clr-accent)" }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    <span className="w-0 h-px transition-all duration-300 group-hover:w-4" style={{ background: "var(--clr-accent)" }} />
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">Contact</h3>
            <ul className="space-y-4">
              {[
                { Icon: Globe, text: "www.forecityconstruction.com" },
                { Icon: Mail, text: "info@forecityconstruction.com" },
                { Icon: Phone, text: "+234 800 100 0001" },
                { Icon: MapPin, text: "Lagos | Abuja | Port Harcourt\n10+ Cities Across Nigeria" },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--clr-accent)" }} />
                  <span className="whitespace-pre-line">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 border rounded-sm" style={{ borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)" }}>
              <div className="text-red-400 text-xs font-black tracking-widest uppercase mb-1">Emergency Line</div>
              <a href="tel:+2348001000099" className="text-white text-sm font-bold hover:text-red-400 transition-colors">+234 800 100 0099</a>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>24/7 Site Emergency</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            &copy; {new Date().getFullYear()} FCC Fore-City Construction. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <span key={t} className="text-xs cursor-pointer transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.25)" }}>{t}</span>
            ))}
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>
              Building Cities. Creating Futures.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
