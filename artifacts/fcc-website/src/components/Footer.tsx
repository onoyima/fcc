import { Link } from "wouter";
import { Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
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
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070F1F] text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoImg} alt="FCC Fore-City Construction" className="h-14 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-6">
              One company. Endless possibilities. Building cities and creating futures across Africa with world-class construction, real estate, and infrastructure solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-icon-${i}`}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Our Divisions</h3>
            <ul className="space-y-3">
              {divisions.map((d) => (
                <li key={d} className="text-sm hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="text-sm hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Globe size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>www.forecityconstruction.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>info@forecityconstruction.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span>Nigeria &amp; Across Africa<br />10+ Cities &amp; Growing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} FCC Fore-City Construction. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">Building Cities. Creating Futures.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
