import m1 from "@/assets/marquee/54th_ave_condo-03_result-3.webp";
import m2 from "@/assets/marquee/austin_high-rise-01_result-3.webp";
import m3 from "@/assets/marquee/bridgeport_office_building-01_result-3.webp";
import m4 from "@/assets/marquee/chen-residence-03_result-3.webp";
import m5 from "@/assets/marquee/collingwood-01_result-4.webp";
import m6 from "@/assets/marquee/fletcher_townhouses-01_result-5.webp";
import m7 from "@/assets/marquee/rayacom_super_print_factory02_result-3.webp";
import m8 from "@/assets/marquee/tarake-japanese-cuisine-01_result-3.webp";
import m9 from "@/assets/marquee/vanguard_fitness-01_result-4.webp";
import m10 from "@/assets/marquee/wellington_mix-use-01_result-4.webp";

const row1 = [m1, m2, m3, m4, m5];
const row2 = [m6, m7, m8, m9, m10];

const DiagonalMarquee = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))] py-28 md:py-40">
      <div className="absolute inset-0 flex flex-col justify-center gap-6" style={{ transform: "rotate(-5deg) scale(1.3)" }}>
        {/* Row 1 - moving left */}
        <div className="flex animate-marquee" style={{ width: "fit-content" }}>
          {[...row1, ...row1, ...row1].map((img, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 w-[320px] md:w-[420px] h-[200px] md:h-[260px] mx-3 rounded-sm overflow-hidden"
            >
              <img
                src={img}
                alt={`Architecture project ${(i % row1.length) + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - moving right */}
        <div className="flex animate-marquee-reverse" style={{ width: "fit-content" }}>
          {[...row2, ...row2, ...row2].map((img, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 w-[320px] md:w-[420px] h-[200px] md:h-[260px] mx-3 rounded-sm overflow-hidden"
            >
              <img
                src={img}
                alt={`Architecture project ${(i % row2.length) + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#a11d2d]/20 z-10" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#a11d2d]/20 z-10" />
    </section>
  );
};

export default DiagonalMarquee;
