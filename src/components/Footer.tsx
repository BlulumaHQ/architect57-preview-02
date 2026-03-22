import { Link } from "react-router-dom";
import logoWhite from "@/assets/architect57-logo-white.svg";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--surface-dark))] text-white">
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
          {/* Col 1: Logo + description */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="font-heading font-light text-xl tracking-[0.02em] uppercase">
                Architect
              </span>
              <span className="font-heading font-light text-xl tracking-[0.02em] text-[hsl(var(--gold-accent))]">
                57
              </span>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-xs font-light">
              Integrated building design, code consultation, and sustainable architecture in Richmond, BC.
            </p>
          </div>

          {/* Col 2: Spacer */}
          <div className="hidden md:block" />

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">Home</Link>
              <Link to="/projects" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">Projects</Link>
              <Link to="/about" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">About</Link>
              <Link to="/contact" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">Contact</Link>
            </nav>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              <span className="text-[13px] text-white/60 font-light">Building Design</span>
              <span className="text-[13px] text-white/60 font-light">Code Consultation</span>
              <span className="text-[13px] text-white/60 font-light">Project Management</span>
              <span className="text-[13px] text-white/60 font-light">BIM Services</span>
            </nav>
          </div>

          {/* Col 5: Contact */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:604-818-2088" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">
                604.818.2088
              </a>
              <a href="mailto:cary@architect57.com" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">
                cary@architect57.com
              </a>
              <p className="text-[13px] text-white/60 font-light leading-relaxed">
                203-2680 Shell Road<br />Richmond, BC V6X 4C9
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-center gap-1 text-[11px] text-white/30 font-light">
          <span>© {year} Architect 57 Inc. All rights reserved.</span>
          <span className="hidden md:inline mx-1">|</span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Bluluma
            </a>
            {" "}| Powered by{" "}
            <a href="https://swiftlift.app" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              SwiftLift
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
