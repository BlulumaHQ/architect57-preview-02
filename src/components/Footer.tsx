import { Link } from "react-router-dom";
import logoAsset from "@/assets/architect57-logo.svg.asset.json";
const logoWhite = logoAsset.url;
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useLang();

  return (
    <footer className="bg-[hsl(var(--surface-dark))] text-white">
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
          {/* Col 1: Logo + description */}
          <div className="md:col-span-1">
            <img src={logoWhite} alt="Architect 57 無極建築" className="h-[70px] w-auto mb-5" />
            <p className="text-[13px] text-white/50 leading-relaxed max-w-xs font-light">
              {t("footer.desc")}
            </p>
          </div>

          {/* Col 2: Spacer */}
          <div className="hidden md:block" />

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">{t("nav.home")}</Link>
              <Link to="/projects" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">{t("nav.projects")}</Link>
              <Link to="/about" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">{t("nav.about")}</Link>
              <Link to="/contact" className="text-[13px] text-white/60 hover:text-white transition-colors font-light">{t("nav.contact")}</Link>
            </nav>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              {t("footer.services")}
            </h4>
            <nav className="flex flex-col gap-3">
              <span className="text-[13px] text-white/60 font-light">{t("footer.buildingDesign")}</span>
              <span className="text-[13px] text-white/60 font-light">{t("footer.codeConsultation")}</span>
              <span className="text-[13px] text-white/60 font-light">{t("footer.projectManagement")}</span>
              <span className="text-[13px] text-white/60 font-light">{t("footer.bimServices")}</span>
            </nav>
          </div>

          {/* Col 5: Contact */}
          <div>
            <h4 className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] mb-5 text-white/40">
              {t("footer.contact")}
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
      <div className="border-t border-white/10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-[#a11d2d]/30" />
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-center gap-1 text-[11px] text-white/30 font-light">
          <span>© {year} Architect 57 無極建築 Inc. All rights reserved.</span>
          <span className="hidden md:inline mx-1">|</span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Bluluma
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
