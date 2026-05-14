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
    <footer className="bg-[#070F1F] text-white/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoImg} alt="FCC Fore-City Construction" className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-6">
              One company. Endless possibilities. Building cities and creating futures across Africa with world-class construction, real estate, and infrastructure solutions.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  data-testid={`social-icon-${i}`}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-xs tracking-widest uppercase">Our Divisions</h3>
            <ul className="space-y-3">
              {divisions.map((d) => (
                <li key={d} className="text-sm hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-xs tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#C9A84C] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 text-xs tracking-widest uppercase">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Globe size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>www.forecityconstruction.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>info@forecityconstruction.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>+234 800 100 0001</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>Lagos | Abuja | Port Harcourt<br />10+ Cities Across Nigeria</span>
              </li>
            </ul>

            {/* Emergency */}
            <div className="mt-6 p-4 border border-red-500/20 rounded-sm bg-red-500/5">
              <div className="text-red-400 text-xs font-black tracking-widest uppercase mb-1">Emergency Line</div>
              <a href="tel:+2348001000099" className="text-white text-sm font-bold hover:text-red-400 transition-colors">+234 800 100 0099</a>
              <div className="text-white/30 text-xs mt-0.5">24 / 7 Site Emergency</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} FCC Fore-City Construction. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-xs hover:text-white/40 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-white/20 text-xs hover:text-white/40 transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-[#C9A84C] text-xs font-black tracking-widest uppercase">Building Cities. Creating Futures.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
