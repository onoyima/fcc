import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { Building2, Home, Shield, Wrench, Users, ArrowRight, CheckCircle } from "lucide-react";

const divisions = [
  {
    icon: <Building2 size={40} />,
    title: "Construction & Engineering",
    subtitle: "From Foundation to Skyline",
    description: "We deliver comprehensive construction and engineering services across residential, commercial, industrial, and government sectors. Our team of seasoned engineers, architects, and project managers ensures every project is built to the highest international standards.",
    services: [
      "Residential building construction",
      "Commercial complex construction",
      "Estate development",
      "Road & bridge construction",
      "Industrial projects",
      "School & hospital construction",
      "Warehouse development",
      "Smart home construction",
      "Building renovation & remodeling",
      "Structural & electrical engineering",
      "Project supervision & site inspections",
      "Government contracts",
    ],
  },
  {
    icon: <Home size={40} />,
    title: "Real Estate & Property",
    subtitle: "Your Property, Our Expertise",
    description: "Our real estate division connects buyers, sellers, investors, and renters with premium properties across Nigeria. From land acquisition to luxury estate sales, we provide comprehensive property solutions backed by deep market knowledge.",
    services: [
      "Land sales & property sales",
      "House rentals & office leasing",
      "Shortlet apartments",
      "Luxury property sales",
      "Estate agency services",
      "Property verification & documentation",
      "Property investment consulting",
      "Property flipping",
      "Property inspections & valuation",
    ],
  },
  {
    icon: <Shield size={40} />,
    title: "Facility & Property Management",
    subtitle: "Seamless Estate Operations",
    description: "We take the complexity out of estate and property management. From tenant onboarding to maintenance coordination, our technology-powered management platform ensures every property under our care performs optimally.",
    services: [
      "Tenant onboarding & screening",
      "Lease agreement management",
      "Rent collection & reminders",
      "Maintenance requests & dispatch",
      "Landlord reporting & analytics",
      "Utility management",
      "Security & CCTV coordination",
      "Cleaning & waste management",
      "Service charge management",
      "Visitor management systems",
    ],
  },
  {
    icon: <Wrench size={40} />,
    title: "Interior & Finishing",
    subtitle: "Spaces That Inspire",
    description: "Our interior design and finishing division transforms raw structures into exceptional living and working environments. From concept to completion, we deliver aesthetics that match the ambition of every client.",
    services: [
      "Interior design consultation",
      "Full-space fit-out & furnishing",
      "POP installation & ceiling design",
      "Tiling & flooring solutions",
      "Painting & wall finishing",
      "Kitchen & bathroom design",
      "Lighting design & installation",
      "Custom furniture & joinery",
      "Smart home integration",
    ],
  },
  {
    icon: <Users size={40} />,
    title: "Workforce & Equipment",
    subtitle: "Skilled Hands. Powerful Machines.",
    description: "We maintain Africa's most comprehensive database of skilled construction artisans and a fleet of heavy equipment — connecting projects with the right people and machinery through our digital labor management platform.",
    services: [
      "Skilled artisan database & deployment",
      "Site supervisor & engineer staffing",
      "Payroll & attendance management",
      "Equipment inventory tracking",
      "Maintenance scheduling",
      "Fuel & logistics management",
      "Equipment rental system",
      "GPS tracking for heavy machinery",
      "Excavator & concrete mixer management",
      "Truck fleet management",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B38] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Our Services</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl">
            Five Divisions.<br /><span className="text-[#C9A84C]">One Integrated</span><br />Platform.
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
            Every service you need, from ground-breaking to final handover — delivered by one trusted partner with the scale to match your ambition.
          </p>
        </div>
      </section>

      {/* Division Cards Overview */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {divisions.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 0.08}>
                <a href={`#division-${i}`} className="group block text-center p-6 bg-white rounded-sm border border-gray-100 hover:border-[#C9A84C]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="text-[#0D1B38] group-hover:text-[#C9A84C] transition-colors duration-300 flex justify-center mb-3">
                    {d.icon}
                  </div>
                  <p className="text-xs font-bold text-[#0D1B38] leading-tight">{d.title}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Divisions */}
      {divisions.map((d, i) => (
        <section
          key={d.title}
          id={`division-${i}`}
          className={`py-28 ${i % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}>
              <ScrollReveal direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                  <div className="w-20 h-20 bg-[#0D1B38] rounded-sm flex items-center justify-center text-[#C9A84C] mb-8">
                    {d.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-12 bg-[#C9A84C]" />
                    <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase">{d.subtitle}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38] mb-6">{d.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-10">{d.description}</p>
                  <Link
                    href="/contact"
                    data-testid={`btn-service-cta-${i}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#0D1B38] text-white font-bold rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:bg-[#C9A84C] hover:text-[#0D1B38] hover:shadow-lg"
                  >
                    Request a Quote <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction={i % 2 === 0 ? "right" : "left"} delay={0.15}>
                <div className={`bg-[#0D1B38] rounded-sm p-10 ${i % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <h3 className="text-[#C9A84C] font-bold text-xs tracking-widest uppercase mb-8">Services Include</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {d.services.map((s) => (
                      <div key={s} className="flex items-start gap-3">
                        <CheckCircle size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-[#C9A84C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38] mb-6">Not Sure Which Service You Need?</h2>
            <p className="text-[#0D1B38]/70 text-lg mb-10 max-w-xl mx-auto">
              Our expert consultants will assess your project and recommend the perfect combination of FCC services.
            </p>
            <Link
              href="/contact"
              data-testid="btn-services-cta"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#0D1B38] text-white font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,27,56,0.4)]"
            >
              Speak to a Consultant <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
