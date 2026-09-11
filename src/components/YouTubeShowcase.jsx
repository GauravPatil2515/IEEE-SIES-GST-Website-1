import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Play, ExternalLink, X, CheckCircle2, Eye, Clock } from 'lucide-react';

import ragThumbnail from '../assets/rag_thumbnail.png';

const videos = [
  {
    id: 'f9gL6K6b-6w',
    title: 'Hands-on Git & GitHub Architecture | Technical Series',
    category: 'Technical Series',
    description:
      'Production-grade version control workflows — branch strategies, merge conflict resolution, and open source collaboration.',
    duration: '24:15',
    views: '1.4K views',
    date: 'Aug 2026',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    fallbackThumb: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'tcqEUSF4hEc',
    title: 'Building an AI Study Buddy with RAG & Local LLMs',
    category: 'AI Masterclass',
    description:
      'Hands-on retrieval-augmented generation: vector databases, LangChain pipelines, and intelligent semantic search over study notes.',
    duration: '28:40',
    views: '2.1K views',
    date: 'Aug 2026',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    fallbackThumb: ragThumbnail,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'TechoPedia 14: National Technical Symposium Highlights',
    category: 'Flagship Event',
    description:
      'Recap of IEEE SIES GST’s premier national techfest featuring 1,200+ participants, hackathons, and project expositions.',
    duration: '03:45',
    views: '3.8K views',
    date: 'Oct 2026',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    fallbackThumb: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
  },
];

const CHANNEL_URL = 'https://www.youtube.com/@IEEESIESGST';
const isPlaceholder = () => false;

// maxres → hq thumbnail with graceful fallback
function VideoThumb({ video }) {
  const [src, setSrc] = useState(
    video.fallbackThumb || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  );
  return (
    <img
      src={src}
      alt={video.title}
      loading="lazy"
      onError={() => {
        if (video.fallbackThumb && src !== video.fallbackThumb) {
          setSrc(video.fallbackThumb);
        } else {
          setSrc(`https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&fit=crop`);
        }
      }}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

export default function YouTubeShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e) => e.key === 'Escape' && setActiveVideo(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  return (
    <section
      id="youtube"
      className="section relative overflow-hidden bg-black/40 py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Youtube className="h-4 w-4 fill-current" />
            <span>Official YouTube Channel</span>
          </div>
          <h2 className="section-title">
            Watch Us On{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              YouTube
            </span>
          </h2>
          <p className="section-subtitle">
            Technical series, hands-on workshops, student podcasts, and
            aftermovies from IEEE SIES GST.
          </p>
        </motion.div>

        {/* Channel card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-neutral-900/90 via-neutral-900/80 to-blue-950/30 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 sm:p-8"
        >
          <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <div className="relative flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] sm:h-20 sm:w-20">
                  <Youtube className="h-10 w-10 fill-current" />
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full border border-white/20 bg-neutral-900 p-0.5">
                  <CheckCircle2 className="h-4 w-4 fill-cyan-400 text-neutral-900" />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    IEEE SIESGST
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs text-white/80">
                    @IEEESIESGST
                  </span>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Technical masterclasses, project showcases, podcast episodes,
                  and event highlights — new videos every month.
                </p>
              </div>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
            >
              <Youtube className="h-4 w-4 fill-current" />
              Subscribe
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>

        {/* Video cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {videos.map((video, index) => {
            const placeholder = isPlaceholder(video.id);
            return (
              <motion.div
                key={video.id + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              >
                <button
                  type="button"
                  disabled={placeholder}
                  onClick={() => !placeholder && setActiveVideo(video)}
                  className="relative aspect-video w-full overflow-hidden bg-neutral-950 disabled:cursor-not-allowed"
                >
                  {placeholder ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/40">
                      <Youtube className="h-8 w-8" />
                      <span className="px-4 text-center text-[11px] font-medium">
                        Add a real video id in <br /> YouTubeShowcase.jsx
                      </span>
                    </div>
                  ) : (
                    <VideoThumb video={video} />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

                  <span
                    className={`absolute left-3 top-3 rounded-md border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${video.badgeColor}`}
                  >
                    {video.category}
                  </span>

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded border border-white/10 bg-black/80 px-2 py-0.5 font-mono text-xs text-white/90">
                    <Clock className="h-3 w-3" /> {video.duration}
                  </span>

                  {!placeholder && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </div>
                    </div>
                  )}
                </button>

                <div className="flex flex-grow flex-col justify-between p-5">
                  <div>
                    <h3
                      onClick={() => !placeholder && setActiveVideo(video)}
                      className="mb-2 line-clamp-2 cursor-pointer text-base font-bold text-white transition-colors group-hover:text-blue-300"
                    >
                      {video.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3 text-[11px] text-white/50">
                      {video.views && (
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {video.views}
                        </span>
                      )}
                      {video.date && <span>{video.date}</span>}
                      {!video.views && !video.date && (
                        <span className="text-white/30">IEEE SIES GST</span>
                      )}
                    </div>
                    <button
                      onClick={() => !placeholder && setActiveVideo(video)}
                      disabled={placeholder}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-white disabled:opacity-40"
                    >
                      <Play className="h-3.5 w-3.5 fill-current text-blue-400" />
                      Watch Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Player modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-neutral-950 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 fill-current text-blue-400" />
                  <h4 className="max-w-md truncate text-sm font-semibold text-white sm:max-w-xl">
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close modal"
                  className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 bg-neutral-950 p-4 sm:flex-row sm:items-center sm:p-5">
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {activeVideo.description}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:from-blue-500 hover:to-cyan-500"
                >
                  Open on YouTube <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
