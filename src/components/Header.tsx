import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/architect57-logo-white.svg";
import { useLang } from "@/contexts/LangContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { label: t("nav.projects"), to: "/projects" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[hsl(var(--surface-dark))]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex items-center">
          <img src={logoWhite} alt="Architect 57 無極建築" className="h-[36px] md:h-[42px] w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-heading text-[13px] font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Language Toggle */}
          <div className="flex items-center gap-1 text-[12px] font-heading font-light tracking-wider">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors duration-300 ${lang === "en" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang("zh")}
              className={`transition-colors duration-300 ${lang === "zh" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              繁中
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile language toggle */}
          <div className="flex items-center gap-1 text-[11px] font-heading font-light">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors ${lang === "en" ? "text-white" : "text-white/40"}`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLang("zh")}
              className={`transition-colors ${lang === "zh" ? "text-white" : "text-white/40"}`}
            >
              繁中
            </button>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <a
          href="tel:604-818-2088"
          className="hidden md:inline-flex font-heading text-[13px] font-light tracking-[0.1em] text-white/60 hover:text-white transition-colors duration-300"
        >
          604.818.2088
        </a>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[hsl(var(--surface-dark))] border-t border-white/10">
          <nav className="flex flex-col py-6">
            <Link
              to="/"
              className="px-6 py-3 font-heading text-[13px] font-light tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
            >
              {t("nav.home")}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 py-3 font-heading text-[13px] font-light tracking-[0.15em] uppercase transition-colors ${
                  location.pathname === link.to
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-4">
              <a
                href="tel:604-818-2088"
                className="font-heading text-[13px] font-light tracking-[0.1em] text-[hsl(var(--gold-accent))]"
              >
                604.818.2088
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
