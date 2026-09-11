import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Youtube,
  Play,
  ExternalLink,
  X,
  CheckCircle2,
  Eye,
  Clock,
  Video,
  Users,
  Film,
  Sparkles,
} from 'lucide-react';
import {
  YOUTUBE_CHANNEL,
  YOUTUBE_CATEGORIES,
  YOUTUBE_VIDEOS,
} from '../data/youtubeData';

function VideoThumb({ video }) {
  const [src, setSrc] = useState(video.thumb);

  return (
    <img
      src={src}
      alt={video.title}
      loading="lazy"
      onError={() => {
        if (src !== `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`) {
          setSrc(`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`);
        }
      }}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

export default function YouTubeShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos =
    selectedCategory === 'All'
      ? YOUTUBE_VIDEOS
      : YOUTUBE_VIDEOS.filter((v) => v.category === selectedCategory);

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
      {/* Background glow ambiance */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Youtube className="h-4 w-4 fill-current text-red-500" />
            <span>Official YouTube Channel</span>
          </div>
          <h2 className="section-title">
            Watch Us On{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              YouTube
            </span>
          </h2>
          <p className="section-subtitle">
            Hands-on technical masterclasses, flagship symposium streams,
            chapter podcasts, and aftermovies directly from IEEE SIES GST.
          </p>
        </motion.div>

        {/* Real Channel Card */}
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
                <div className="relative h-18 w-18 overflow-hidden rounded-2xl border border-white/20 bg-neutral-900 p-0.5 shadow-[0_0_30px_rgba(59,130,246,0.3)] sm:h-20 sm:w-20">
                  <img
                    src={YOUTUBE_CHANNEL.avatar}
                    alt={YOUTUBE_CHANNEL.name}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full border border-neutral-900 bg-cyan-400 p-1 text-neutral-950 shadow-md">
                  <CheckCircle2 className="h-3.5 w-3.5 fill-cyan-400 text-neutral-950" />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {YOUTUBE_CHANNEL.name}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs text-white/80">
                    {YOUTUBE_CHANNEL.handle}
                  </span>
                </div>

                <p className="mb-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {YOUTUBE_CHANNEL.description}
                </p>

                {/* Real Channel Statistics Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    {YOUTUBE_CHANNEL.subscribers} Subscribers
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-300">
                    <Film className="h-3.5 w-3.5 text-purple-400" />
                    {YOUTUBE_CHANNEL.totalVideos} Uploaded Videos
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    Active Series & Podcasts
                  </span>
                </div>
              </div>
            </div>

            <a
              href={YOUTUBE_CHANNEL.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_35px_rgba(220,38,38,0.6)]"
            >
              <Youtube className="h-4 w-4 fill-current" />
              Subscribe
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>

        {/* Category Filters Bar */}
        <div className="mb-10 flex items-center justify-center">
          <div className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/60 p-1.5 backdrop-blur-lg">
            {YOUTUBE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative flex-shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeYtCategory"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              >
                {/* Thumbnail Header with Play Overlay */}
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  aria-label={`Play ${video.title}`}
                  className="relative aspect-video w-full overflow-hidden bg-neutral-950 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <VideoThumb video={video} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

                  {/* Badge top-left */}
                  <span
                    className={`absolute left-3 top-3 rounded-md border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${video.badgeColor}`}
                  >
                    {video.badge}
                  </span>

                  {/* Duration bottom-right */}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded border border-white/10 bg-black/80 px-2 py-0.5 font-mono text-xs text-white/90">
                    <Clock className="h-3 w-3 text-cyan-400" /> {video.duration}
                  </span>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </div>
                  </div>
                </button>

                {/* Content Details */}
                <div className="flex flex-grow flex-col justify-between p-5">
                  <div>
                    {/* Episode / Subtitle tag */}
                    <span className="mb-1 inline-block text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                      {video.episode}
                    </span>

                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="mb-2 line-clamp-2 cursor-pointer text-base font-bold text-white transition-colors group-hover:text-blue-300"
                    >
                      {video.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Footer: Views, Date & Watch Now CTA */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3 text-[11px] text-white/50">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3 text-blue-400/80" />{' '}
                        {video.views}
                      </span>
                      <span>{video.date}</span>
                    </div>

                    <button
                      onClick={() => setActiveVideo(video)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-white"
                    >
                      <Play className="h-3 w-3 fill-current text-blue-400" />
                      Watch Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All on YouTube Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:p-8"
        >
          <div className="mb-4 sm:mb-0 sm:text-left">
            <h4 className="text-base font-bold text-white sm:text-lg">
              Want to explore more videos and tutorials?
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] sm:text-sm">
              Discover all 140+ episodes, project demonstrations, and conference
              livestreams on our official channel.
            </p>
          </div>
          <a
            href={YOUTUBE_CHANNEL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] sm:text-sm"
          >
            <Video className="h-4 w-4" />
            Browse Full Channel
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </motion.div>
      </div>

      {/* Responsive In-Page Video Player Modal */}
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
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-neutral-950 px-5 py-4">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Youtube className="h-5 w-5 flex-shrink-0 fill-current text-red-500" />
                  <h4 className="truncate text-sm font-semibold text-white sm:text-base">
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

              {/* YouTube Responsive iFrame Player */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 bg-neutral-950 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="max-w-xl">
                  <span className="mb-0.5 inline-block text-[11px] font-semibold text-blue-400">
                    {activeVideo.episode} • {activeVideo.duration} •{' '}
                    {activeVideo.views}
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {activeVideo.description}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:from-red-500 hover:to-rose-500"
                >
                  <Youtube className="h-3.5 w-3.5 fill-current" />
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
