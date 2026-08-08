import { Link } from "react-router-dom";
import logoWhite from "@/assets/architect57-logo.svg";
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useLang();

  return (
    <footer className="bg-[hsl(var(--surface-dark))] text-white">
      {/* ── MOBILE (compact) ───────────────────────────── */}
      <div className="md:hidden container-wide pt-11 pb-8">
        <div className="mb-6">
          <img src={logoWhite} alt="Architect 57 無極建築" className="h-[48px] w-auto mb-3" />
          <p className="text-[14px] text-white leading-snug font-light">
            {t("footer.descShort")}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <p className="text-[15px] text-white font-semibold">Architect 57 Inc.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="tel:6048182088" className="text-[14px] text-white font-medium">604.818.2088</a>
            <a href="mailto:cary@architect57.com" className="text-[14px] text-white font-medium">cary@architect57.com</a>
          </div>
          <p className="text-[14px] text-white font-medium leading-snug">
            203-2680 Shell Road, Richmond, BC V6X 4C9
          </p>
        </div>

        <details className="group border-t border-white/10">
          <summary className="flex items-center justify-between cursor-pointer list-none py-[15px] text-[14px] font-bold text-white">
            {t("footer.navSummary")}
            <span aria-hidden className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="flex flex-col gap-2.5 pb-4">
            <Link to="/" className="text-[13px] text-white">{t("nav.home")}</Link>
            <Link to="/projects" className="text-[13px] text-white">{t("nav.projects")}</Link>
            <Link to="/about" className="text-[13px] text-white">{t("nav.about")}</Link>
            <Link to="/contact" className="text-[13px] text-white">{t("nav.contact")}</Link>
          </div>
        </details>

        <details className="group border-t border-b border-white/10">
          <summary className="flex items-center justify-between cursor-pointer list-none py-[15px] text-[14px] font-bold text-white">
            {t("footer.servicesSummary")}
            <span aria-hidden className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="flex flex-col gap-2.5 pb-4">
            <span className="text-[13px] text-white">{t("footer.buildingDesign")}</span>
            <span className="text-[13px] text-white">{t("footer.ipd")}</span>
            <span className="text-[13px] text-white">{t("footer.codeConsultation")}</span>
            <span className="text-[13px] text-white">{t("footer.bimServices")}</span>
            <span className="text-[13px] text-white">{t("footer.projectManagement")}</span>
          </div>
        </details>
      </div>

      {/* ── DESKTOP / TABLET (unchanged) ───────────────── */}
      <div className="hidden md:block container-wide py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 items-start">
          {/* Col 1: Logo + description */}
          <div className="md:col-span-1">
            <img src={logoWhite} alt="Architect 57 無極建築" className="h-[70px] w-auto mb-5 block" />
            <p className="text-[14px] text-white leading-relaxed max-w-xs font-light">
              {t("footer.desc")}
            </p>
          </div>

          {/* Col 2: Spacer */}
          <div className="hidden md:block" />

          {/* Col 3: Navigation */}
          <div>
            <h4 className="card-label card-label--on-dark mb-5">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-[14px] text-white hover:text-white transition-colors font-medium">{t("nav.home")}</Link>
              <Link to="/projects" className="text-[14px] text-white hover:text-white transition-colors font-medium">{t("nav.projects")}</Link>
              <Link to="/about" className="text-[14px] text-white hover:text-white transition-colors font-medium">{t("nav.about")}</Link>
              <Link to="/contact" className="text-[14px] text-white hover:text-white transition-colors font-medium">{t("nav.contact")}</Link>
            </nav>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="card-label card-label--on-dark mb-5">
              {t("footer.services")}
            </h4>
            <nav className="flex flex-col gap-3">
              <span className="text-[14px] text-white font-medium">{t("footer.buildingDesign")}</span>
              <span className="text-[14px] text-white font-medium">{t("footer.ipd")}</span>
              <span className="text-[14px] text-white font-medium">{t("footer.codeConsultation")}</span>
              <span className="text-[14px] text-white font-medium">{t("footer.bimServices")}</span>
              <span className="text-[14px] text-white font-medium">{t("footer.projectManagement")}</span>
            </nav>
          </div>

          {/* Col 5: Contact */}
          <div>
            <h4 className="card-label card-label--on-dark mb-5">
              {t("footer.contact")}
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-white font-semibold leading-relaxed">Architect 57 Inc.</p>
              <a href="tel:604-818-2088" className="text-[14px] text-white hover:text-white transition-colors font-medium">
                604.818.2088
              </a>
              <a href="mailto:cary@architect57.com" className="text-[14px] text-white hover:text-white transition-colors font-medium">
                cary@architect57.com
              </a>
              <p className="text-[14px] text-white font-medium leading-relaxed">
                203-2680 Shell Road<br />Richmond, BC V6X 4C9
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-[#a11d2d]/30" />
        <div className="container-wide py-4 md:py-5 flex flex-col md:flex-row items-center md:justify-between gap-1 text-[11px] md:text-[12px] text-white/80 font-normal text-center md:text-left">
          <span>© {year} Architect 57 Inc. All Rights Reserved.</span>
          <span>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/90 transition-colors">
              Bluluma
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
