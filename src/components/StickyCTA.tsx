import { Phone } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const StickyCTA = () => {
  const { t } = useLang();

  return (
    <>
      {/* Desktop: fixed right-side button — RED */}
      <a
        href="tel:604-818-2088"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 items-center gap-2 text-[11px] font-heading font-light tracking-[0.15em] uppercase text-white/90 bg-[#a11d2d] px-4 py-6 rounded-l transition-all duration-300 hover:bg-[#8a1826] hover:text-white active:scale-[0.97]"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <Phone className="w-3.5 h-3.5 rotate-90" />
        <span>604.818.2088</span>
      </a>

      {/* Mobile: sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[hsl(var(--surface-dark))]/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-center gap-3 py-3 px-5">
          <a
            href="tel:604-818-2088"
            className="flex-1 flex items-center justify-center gap-2 text-[13px] font-heading font-light tracking-[0.1em] text-white py-3 border border-white/20 rounded-sm transition-all hover:border-white/40 active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            {t("cta.callNow")}
          </a>
          <a
            href="/contact"
            className="flex-1 text-center font-heading font-light text-[13px] tracking-[0.1em] text-white bg-[#a11d2d] py-3 px-4 rounded-sm transition-all hover:bg-[#8a1826] active:scale-[0.97]"
          >
            {t("cta.getQuote")}
          </a>
        </div>
      </div>
    </>
  );
};

export default StickyCTA;
