import { allProjects } from "@/data/portfolio";
import { useMemo } from "react";

// Select a diverse set of real project images for the marquee
const getMarqueeImages = () => {
  // Prioritize "-01" feature images, use all unique project thumbnails
  const images = allProjects.map((p) => p.img);
  // Shuffle deterministically per session
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled;
};

const DiagonalMarquee = () => {
  const allImages = useMemo(getMarqueeImages, []);

  // Split into two rows
  const row1 = allImages.slice(0, Math.ceil(allImages.length / 2));
  const row2 = allImages.slice(Math.ceil(allImages.length / 2));

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

      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#a11d2d]/20 z-10" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#a11d2d]/20 z-10" />
    </section>
  );
};

export default DiagonalMarquee;
