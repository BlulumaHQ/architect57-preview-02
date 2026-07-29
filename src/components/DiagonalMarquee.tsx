import { Link } from "react-router-dom";
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

type MarqueeItem = { img: string; slug: string; name: string };

const row1: MarqueeItem[] = [
  { img: m1, slug: "54th-ave-condo-4", name: "54th Ave Condo" },
  { img: m2, slug: "austin-high-rise", name: "Austin High-Rise" },
  { img: m3, slug: "bridgeport-office", name: "Bridgeport Office Building" },
  { img: m4, slug: "chen-residence", name: "Chen Residence" },
  { img: m5, slug: "collingwood", name: "Collingwood" },
];
const row2: MarqueeItem[] = [
  { img: m6, slug: "fletcher-townhouses", name: "Fletcher Townhouses" },
  { img: m7, slug: "rayacom-super-print-factory", name: "Rayacom Super Print Factory" },
  { img: m8, slug: "torake-japanese-cuisine", name: "Torake Japanese Cuisine" },
  { img: m9, slug: "vanguard-fitness", name: "Vanguard Fitness" },
  { img: m10, slug: "wellington-mixed-use", name: "Wellington Mixed-Use" },
];

const DiagonalMarquee = () => {
  const renderTile = (item: MarqueeItem, key: string) => (
    <Link
      key={key}
      to={`/projects/${item.slug}`}
      className="flex-shrink-0 w-[320px] md:w-[420px] h-[200px] md:h-[260px] mx-3 rounded-sm overflow-hidden group relative block"
      aria-label={item.name}
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
        <span className="text-white text-[12px] font-heading tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.name}
        </span>
      </div>
    </Link>
  );

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))] py-28 md:py-40">
      <div className="absolute inset-0 flex flex-col justify-center gap-6" style={{ transform: "rotate(-5deg) scale(1.3)" }}>
        {/* Row 1 - moving left */}
        <div className="flex animate-marquee" style={{ width: "fit-content" }}>
          {[...row1, ...row1, ...row1].map((item, i) => renderTile(item, `r1-${i}`))}
        </div>

        {/* Row 2 - moving right */}
        <div className="flex animate-marquee-reverse" style={{ width: "fit-content" }}>
          {[...row2, ...row2, ...row2].map((item, i) => renderTile(item, `r2-${i}`))}
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#714c90]/40 z-10" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#714c90]/40 z-10" />
    </section>
  );
};

export default DiagonalMarquee;
