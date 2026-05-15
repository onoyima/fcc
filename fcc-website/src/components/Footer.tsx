import { Link } from "wouter";
import { Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LanguageContext";
import yeloowLogo from "@assets/yeloow_logo.png";
import blueYellowLogo from "@assets/blue_yellow.png";
import blueYelllowWhiteLogo from "@assets/blue_yelllow_white.png";

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/100083161541044/?http_ref=eyJ0cyI6MTc3ODg1NjM1NzAwMCwiciI6IiJ9" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
];

const logoMap: Record<string, string> = {
  navy: blueYellowLogo,
  orange: yeloowLogo,
  brown: yeloowLogo,
  emerald: yeloowLogo,
  purple: blueYelllowWhiteLogo,
  rose: yeloowLogo,
  teal: blueYelllowWhiteLogo,
};

export default function Footer() {
  const { t } = useLang();
  const { theme } = useTheme();
  const logoSrc = logoMap[theme] || blueYellowLogo;

  const divisions = t.services.divisionNames;

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/projects", label: t.nav.projects },
    { href: "/properties", label: t.nav.properties },
    { href: "/careers", label: t.nav.careers },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t" style={{ background: "var(--clr-bg-footer)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="h-1 w-full" style={{ background: "var(--clr-gradient-accent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoSrc} alt="FCC Fore-City Construction" className="h-12 w-auto object-contain mb-6" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.footer.tagline}
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
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">{t.common.ourDivisions}</h3>
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
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">{t.common.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`footer-link-${link.href.replace("/", "") || "home"}`}
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
            <h3 className="font-black mb-6 text-xs tracking-widest uppercase text-white">{t.nav.contact}</h3>
            <ul className="space-y-4">
              {[
                { Icon: Globe, text: "www.forecityconstruction.com" },
                { Icon: Mail, text: "info@forecityconstruction.com" },
                { Icon: Phone, text: "+234 806 851 5179" },
                { Icon: MapPin, text: "Lagos | Abuja | Port Harcourt\n10+ Cities Across Nigeria" },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--clr-accent)" }} />
                  <span className="whitespace-pre-line">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 border rounded-sm" style={{ borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)" }}>
              <div className="text-red-400 text-xs font-black tracking-widest uppercase mb-1">{t.common.emergencyLine}</div>
              <a href="tel:+2348001000099" className="text-white text-sm font-bold hover:text-red-400 transition-colors">+234 800 100 0099</a>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>24/7 Site Emergency</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            &copy; {new Date().getFullYear()} FCC Fore-City Construction. {t.common.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            {[t.common.privacyPolicy, t.common.termsOfService].map((label) => (
              <span key={label} className="text-xs cursor-pointer transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.25)" }}>{label}</span>
            ))}
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>
              {t.common.buildingCities}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
