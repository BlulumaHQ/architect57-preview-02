import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-xl tracking-tight text-foreground">
            Architect 57
          </span>
          <span className="font-heading text-xs font-medium text-muted-foreground tracking-widest uppercase">
            Inc.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-heading text-sm font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:604-818-2088" className="btn-primary flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            604-818-2088
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 py-3 font-heading text-sm font-semibold tracking-wide uppercase transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-accent"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-4">
              <a href="tel:604-818-2088" className="btn-primary flex items-center justify-center gap-2 text-sm w-full">
                <Phone className="w-4 h-4" />
                604-818-2088
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
