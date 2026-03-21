import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
          {/* Col 1: Logo + description */}
          <div className="md:col-span-1">
            <span className="font-heading font-extrabold text-xl tracking-tight block mb-4">
              Architect 57 Inc.
            </span>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Specializing in integrated building design, code consultation, and sustainable architecture in Richmond, BC.
            </p>
          </div>

          {/* Col 2: Spacer */}
          <div className="hidden md:block" />

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Home</Link>
              <Link to="/projects" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Projects</Link>
              <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">About</Link>
              <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">
              Services
            </h4>
            <nav className="flex flex-col gap-2.5">
              <span className="text-sm text-primary-foreground/70">Building Design</span>
              <span className="text-sm text-primary-foreground/70">Code Consultation</span>
              <span className="text-sm text-primary-foreground/70">Project Management</span>
              <span className="text-sm text-primary-foreground/70">BIM Services</span>
            </nav>
          </div>

          {/* Col 5: Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:604-818-2088" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                604-818-2088
              </a>
              <a href="mailto:cary@architect57.com" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                cary@architect57.com
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                203-2680 Shell Road<br />Richmond, BC V6X 4C9
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-center gap-1 text-xs text-primary-foreground/50">
          <span>© {year} Architect 57 Inc. All rights reserved.</span>
          <span className="hidden md:inline mx-1">|</span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              Bluluma
            </a>
            {" "}| Powered by{" "}
            <a href="https://swiftlift.app" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              SwiftLift
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
