import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PublicProjectImage } from "@/types/project";
import { localizedImageAlt } from "@/utils/projectLocalization";
import { useLang } from "@/contexts/LangContext";

const AUTO_MS = 5500;
const RESUME_MS = 12000;

interface Props {
  images: PublicProjectImage[];
  title: string;
}

const ProjectGallery = ({ images, title }: Props) => {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);

  const count = images.length;
  const multi = count > 1;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  const interact = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  useEffect(() => {
    if (!multi || paused || lightbox || reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), AUTO_MS);
    return () => window.clearInterval(id);
  }, [multi, paused, lightbox, reduced, count]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight" && multi) go(1);
      if (e.key === "ArrowLeft" && multi) go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, multi, go]);

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  if (count === 0) return null;

  const current = images[Math.min(active, count - 1)];
  const alt = (img: PublicProjectImage, i: number) =>
    localizedImageAlt(img, lang, `${title} — view ${i + 1}`);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-sm bg-muted cursor-zoom-in"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setLightbox(true)}
      >
        <div className="aspect-[3/2] w-full">
          {images.map((img, i) => (
            <img
              key={img.id}
              src={img.url}
              alt={alt(img, i)}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {multi && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-sm bg-black/55 text-white text-[11px] tracking-[0.08em] font-medium">
            {active + 1} / {count}
          </div>
        )}
      </div>

      {multi && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`${title} ${i + 1}`}
              onClick={() => {
                setActive(i);
                interact();
              }}
              className={`relative w-[72px] h-[52px] md:w-[92px] md:h-[64px] overflow-hidden rounded-sm border-2 transition-colors ${
                i === active ? "border-[#714C90]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt={alt(img, i)} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/98 flex items-center justify-center"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null || !multi) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {multi && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-2 md:left-6 p-3 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-2 md:right-6 p-3 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
          <img
            src={current.url}
            alt={alt(current, active)}
            className="max-w-[92vw] max-h-[85vh] object-contain"
          />
          {multi && (
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-[12px] tracking-[0.1em]">
              {active + 1} / {count}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
