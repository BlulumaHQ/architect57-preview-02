import marquee1 from "@/assets/marquee-1.jpg";
import marquee2 from "@/assets/marquee-2.jpg";
import marquee3 from "@/assets/marquee-3.jpg";
import marquee4 from "@/assets/marquee-4.jpg";
import marquee5 from "@/assets/marquee-5.jpg";
import marquee6 from "@/assets/marquee-6.jpg";

const row1 = [marquee1, marquee2, marquee3, marquee4, marquee5, marquee6];
const row2 = [marquee4, marquee6, marquee1, marquee5, marquee3, marquee2];

const DiagonalMarquee = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))] py-28 md:py-40">
      <div className="absolute inset-0 flex flex-col justify-center gap-6" style={{ transform: "rotate(-5deg) scale(1.3)" }}>
        {/* Row 1 - moving left */}
        <div className="flex animate-marquee" style={{ width: "fit-content" }}>
          {[...row1, ...row1].map((img, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 w-[320px] md:w-[420px] h-[200px] md:h-[260px] mx-3 rounded-sm overflow-hidden"
            >
              <img
                src={img}
                alt={`Architecture project ${(i % row1.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - moving right */}
        <div className="flex animate-marquee-reverse" style={{ width: "fit-content" }}>
          {[...row2, ...row2].map((img, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 w-[320px] md:w-[420px] h-[200px] md:h-[260px] mx-3 rounded-sm overflow-hidden"
            >
              <img
                src={img}
                alt={`Architecture project ${(i % row2.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay text */}
      <div className="relative z-10 container-wide text-center">
        <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/50 mb-4">
          Selected Work
        </p>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[0.95]">
          Portfolio
        </h2>
      </div>
    </section>
  );
};

export default DiagonalMarquee;
