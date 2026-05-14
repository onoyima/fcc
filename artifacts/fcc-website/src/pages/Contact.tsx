import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Globe, MessageCircle, Send, Clock } from "lucide-react";

const offices = [
  { city: "Lagos (HQ)", address: "Victoria Island, Lagos, Nigeria", phone: "+234 800 100 0001" },
  { city: "Abuja", address: "Central Business District, Abuja, Nigeria", phone: "+234 800 100 0002" },
  { city: "Port Harcourt", address: "GRA Phase 2, Port Harcourt, Nigeria", phone: "+234 800 100 0003" },
];

const services = [
  "Construction & Engineering",
  "Real Estate & Property",
  "Facility & Property Management",
  "Interior & Finishing",
  "Workforce & Equipment",
  "General Enquiry",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B38] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Contact Us</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl">
            Let's Build<br /><span className="text-[#C9A84C]">Something</span><br />Together
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
            Whether you have a project in mind or just want to explore what FCC can do for you — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-10">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-black text-[#0D1B38] mb-8">Get in Touch</h2>

                <div className="space-y-6">
                  <a href="https://www.forecityconstruction.com" target="_blank" rel="noreferrer" data-testid="link-website" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] flex-shrink-0 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38] transition-all duration-300">
                      <Globe size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase mb-1">Website</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">www.forecityconstruction.com</div>
                    </div>
                  </a>

                  <a href="mailto:info@forecityconstruction.com" data-testid="link-email" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] flex-shrink-0 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38] transition-all duration-300">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase mb-1">Email</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">info@forecityconstruction.com</div>
                    </div>
                  </a>

                  <a href="tel:+2348001000001" data-testid="link-phone" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] flex-shrink-0 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38] transition-all duration-300">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase mb-1">Phone</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">+234 800 100 0001</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/2348001000001"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-whatsapp"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-sm bg-green-600 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-green-500 transition-all duration-300">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase mb-1">WhatsApp</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">Chat with us instantly</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase mb-1">Business Hours</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">Mon – Fri: 8AM – 6PM</div>
                      <div className="text-gray-400 text-xs mt-1">Sat: 9AM – 2PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Offices */}
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <h3 className="text-xl font-black text-[#0D1B38] mb-6">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} data-testid={`office-${o.city.toLowerCase().replace(/\s+/g, "-")}`} className="p-5 bg-[#F5F7FA] rounded-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-[#C9A84C]" />
                        <span className="font-black text-[#0D1B38] text-sm">{o.city}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{o.address}</p>
                      <p className="text-[#C9A84C] text-xs font-semibold mt-2">{o.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-24">
                  <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-8">
                    <Send size={32} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="text-3xl font-black text-[#0D1B38] mb-4">Message Received!</h3>
                  <p className="text-gray-500 max-w-sm leading-relaxed">
                    Thank you for reaching out to FCC Fore-City Construction. Our team will contact you within 24 business hours.
                  </p>
                  <button
                    data-testid="btn-send-another"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-8 py-3 bg-[#0D1B38] text-white font-bold rounded text-sm tracking-wide hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-[#F5F7FA] rounded-sm p-10">
                  <h2 className="text-2xl font-black text-[#0D1B38] mb-8">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          data-testid="input-name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Adeyemi"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          data-testid="input-email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          data-testid="input-phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+234 800 000 0000"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Company / Organization</label>
                        <input
                          type="text"
                          name="company"
                          data-testid="input-company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company Ltd"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Service Interested In</label>
                      <select
                        name="service"
                        data-testid="select-service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0D1B38] tracking-wide mb-2 uppercase">Your Message *</label>
                      <textarea
                        name="message"
                        data-testid="textarea-message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project, timeline, and requirements..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      data-testid="btn-submit-form"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#0D1B38] text-white font-black rounded text-sm tracking-wide transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0D1B38] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(13,27,56,0.25)]"
                    >
                      Send Message <Send size={16} />
                    </button>
                  </form>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-[#0D1B38] relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <MapPin size={40} className="text-[#C9A84C] mx-auto mb-4" />
          <p className="text-white/50 text-sm">10+ Office Locations Across Nigeria</p>
          <p className="text-white/30 text-xs mt-2">Lagos | Abuja | Port Harcourt | Kano | Ibadan | Benin | Enugu | Ogun | And more</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
