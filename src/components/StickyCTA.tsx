import { Phone } from "lucide-react";

const StickyCTA = () => {
  return (
    <>
      {/* Desktop: fixed right-side button */}
      <a
        href="tel:604-818-2088"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 btn-sticky items-center gap-2 text-sm writing-mode-vertical rounded-l-lg rounded-r-none shadow-2xl"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <Phone className="w-4 h-4 rotate-90" />
        <span>Call Now — 604-818-2088</span>
      </a>

      {/* Mobile: sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[hsl(var(--primary-dark))] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-center gap-3 py-3 px-5">
          <a
            href="tel:604-818-2088"
            className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm text-center"
          >
            <Phone className="w-4 h-4" />
            Call 604-818-2088
          </a>
          <a
            href="/contact"
            className="flex-1 text-center font-heading font-bold text-sm text-primary-foreground py-3.5 px-4 border-2 border-primary-foreground/30 rounded transition-all hover:bg-primary-foreground/10 active:scale-[0.97]"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
};

export default StickyCTA;
