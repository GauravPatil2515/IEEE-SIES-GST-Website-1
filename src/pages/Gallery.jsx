import React, { useState } from "react";
import { motion } from "framer-motion";

import highlight1 from "../assets/highlights/highlight1.jpg";
import highlight2 from "../assets/highlights/highlight2.jpg";
import highlight3 from "../assets/highlights/highlight3.jpg";
import highlight4 from "../assets/highlights/highlight4.jpg";
import highlight5 from "../assets/highlights/highlight5.jpg";
import highlight6 from "../assets/highlights/highlight6.jpg";
import highlight7 from "../assets/highlights/highlight7.jpg";
import highlight8 from "../assets/highlights/highlight8.jpg";
import highlight9 from "../assets/highlights/highlight9.jpg";

import IEEE1 from "../assets/IEEE1.webp";
import IEEE2 from "../assets/IEEE2.webp";
import IEEE3 from "../assets/IEEE3.webp";
import IEEE4 from "../assets/IEEE4.webp";
import IEEE5 from "../assets/IEEE5.webp";
import IEEE6 from "../assets/IEEE6.jpeg";

import Lightbox from "../components/Lightbox";

// ======================================================
// IMAGES  (order = lightbox index)
// ======================================================
const allImages = [
  highlight1, highlight2, highlight3, highlight4, highlight5,
  highlight6, highlight7, highlight8, highlight9,
  IEEE1, IEEE2, IEEE3, IEEE4, IEEE5, IEEE6,
];

// Optional caption/tag per image (edit freely — falls back to a neutral label)
const captions = {
  0: "Technical Workshop",
  1: "Flagship Event",
  2: "Guest Session",
  3: "Hands-on Lab",
  4: "Team Moments",
  5: "Awards & Felicitation",
  6: "Hackathon",
  7: "Student Podcast",
  8: "IEEE Day",
  9: "Techopedia",
  10: "Epsilon",
  11: "RF & Microwave",
  12: "Community Meetup",
  13: "Project Showcase",
  14: "Chapter Highlights",
};

// Bento span pattern (repeats). Tuned for a 4-col desktop grid.
const spanPattern = [
  "sm:col-span-2 sm:row-span-2", // hero
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2", // portrait
  "sm:col-span-2 sm:row-span-1", // panorama
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-2", // hero
  "sm:col-span-1 sm:row-span-2", // portrait
  "sm:col-span-1 sm:row-span-1",
];

// ======================================================
// BENTO IMAGE (blur-up + depth zoom + glass tag)
// ======================================================
function BentoTile({ src, index, span, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const tag = captions[index] || "IEEE SIES GST";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className={`group relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-light)] ${span}`}
      aria-label={`Open image: ${tag}`}
    >
      <img
        src={src}
        alt={`IEEE SIES GST — ${tag}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${loaded ? "blur-none opacity-100" : "scale-105 blur-lg opacity-0"
          }`}
      />

      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

      {/* glass tag on hover */}
      <span className="absolute left-3 top-3 translate-y-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {tag}
      </span>

      <span className="absolute bottom-3 left-3 text-xs font-medium uppercase tracking-widest text-white/0 transition-colors duration-300 group-hover:text-white/80">
        View
      </span>
    </motion.button>
  );
}

const CATEGORIES = [
  { id: "all", label: "All Archives" },
  { id: "flagship", label: "Flagship & Techfests" },
  { id: "workshops", label: "Workshops & Labs" },
  { id: "community", label: "Campus & Moments" },
];

const categoryMap = {
  0: "workshops",
  1: "flagship",
  2: "workshops",
  3: "workshops",
  4: "community",
  5: "community",
  6: "flagship",
  7: "community",
  8: "community",
  9: "flagship",
  10: "flagship",
  11: "workshops",
  12: "community",
  13: "workshops",
  14: "community",
};

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredImages = allImages
    .map((src, idx) => ({ src, originalIndex: idx, cat: categoryMap[idx] || "community" }))
    .filter((item) => selectedCategory === "all" || item.cat === selectedCategory);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const goToPrev = () =>
    setCurrentImageIndex((p) => (p === 0 ? allImages.length - 1 : p - 1));
  const goToNext = () =>
    setCurrentImageIndex((p) => (p === allImages.length - 1 ? 0 : p + 1));

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-title">Event Gallery</h2>
          <p className="section-subtitle">
            A visual journey through our technical symposiums, hands-on masterclasses, and the innovators who make them happen.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${selectedCategory === cat.id
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                    : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-bleed bento grid */}
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-6">
        <div className="grid auto-rows-[56vw] grid-cols-1 gap-3 sm:auto-rows-[180px] sm:grid-flow-row-dense sm:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
          {filteredImages.map((item, i) => (
            <BentoTile
              key={item.originalIndex}
              src={item.src}
              index={item.originalIndex}
              span={spanPattern[i % spanPattern.length]}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      <Lightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </section>
  );
}
