import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import { useLang } from "@/contexts/LangContext";
import type { PublicProject } from "@/types/project";
import { localizedProjectTitle } from "@/utils/projectLocalization";

const DiagonalMarquee = () => {
  const { projects } = useArchitect57Projects();
  const { lang } = useLang();

  const [row1, row2] = useMemo(() => {
    const withImages = projects.filter((p) => p.featuredImageUrl).slice(0, 10);
    const half = Math.ceil(withImages.length / 2);
    return [withImages.slice(0, half), withImages.slice(half)] as const;
  }, [projects]);

  if (row1.length === 0) return null;

  const renderTile = (item: PublicProject, key: string, labelPosition: "top" | "bottom") => {
    const name = localizedProjectTitle(item, lang);
    const atTop = labelPosition === "top";
    return (
      <Link
        key={key}
        to={`/projects/${item.slug}`}
        className="flex-shrink-0 w-[344px] md:w-[482px] h-[194px] md:h-[272px] mx-3 overflow-hidden group relative block bg-[hsl(var(--surface-dark))]"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        aria-label={name}
      >
        <img
          src={item.featuredImageUrl ?? ""}
          alt={name}
          className="block w-[calc(100%+2px)] h-[calc(100%+2px)] -ml-px -mt-px object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-x-0 ${atTop ? "top-0" : "bottom-0"} h-1/4`}
          style={{
            backgroundImage: `linear-gradient(to ${atTop ? "bottom" : "top"}, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex ${atTop ? "items-start" : "items-end"} p-4`}
        >
          <span className="overlay-text text-[14px] md:text-[15px] font-heading font-bold tracking-[0.07em] uppercase">
            {name}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))] h-[290px] md:h-[430px]">
      <div className="absolute inset-0 flex flex-col justify-center gap-[18px]" style={{ transform: "rotate(-3deg) scale(1.12)", backgroundColor: "hsl(var(--surface-dark))" }}>
        {/* Row 1 - moving left (titles at the bottom) */}
        <div className="flex animate-marquee" style={{ width: "fit-content" }}>
          {[...row1, ...row1, ...row1].map((item, i) => renderTile(item, `r1-${i}`, "bottom"))}
        </div>

        {/* Row 2 - moving right (titles at the top) */}
        {row2.length > 0 && (
          <div className="flex animate-marquee-reverse" style={{ width: "fit-content" }}>
            {[...row2, ...row2, ...row2].map((item, i) => renderTile(item, `r2-${i}`, "top"))}
          </div>
        )}
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#714c90]/40 z-10" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#714c90]/40 z-10" />
    </section>
  );
};

export default DiagonalMarquee;
