import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Maximize2,
  Calendar,
  Users,
  User,
  FileText,
  Sparkles,
  Search,
  CheckCircle2,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// Official Event Posters & High-Resolution Flyers
import techopedia15Poster from '../assets/events/techopedia15_fest_poster.jpg';
import studyAbroadFlyer from '../assets/events/study_abroad_banner.jpg';
import lte5gFlyer from '../assets/events/lte_5g_flyer.jpg';
import aiProductFlyer from '../assets/events/ai_product_flyer.jpg';
import industrialAuditFlyer from '../assets/events/industrial_audit_flyer.jpg';
import solarAiFlyer from '../assets/events/solar_ai_flyer.jpg';
import softSkillsFlyer from '../assets/events/soft_skills_flyer.jpg';
import ragThumbnail from '../assets/rag_thumbnail.png';
import signLanguage from '../assets/sign_language.jpeg';
import epsilon from '../assets/epsilon.jpeg';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=750&fit=crop';

// ======================================================
// MAJOR EVENTS DATA (EXCLUDING TECHNICAL SERIES VIDEOS)
// ======================================================
const majorEvents = [
  {
    _id: 'techopedia15',
    eventName: 'TechoPedia 15: Annual National Technical Festival',
    eventDescription:
      'IEEE SIES GST’s premier national techfest featuring flagship hackathons, Vendetta coding championship, project showcases, robotics challenges, and innovation symposiums.',
    eventImage: { url: techopedia15Poster },
    eventType: 'Flagship Event',
    category: 'flagship',
    eventState: 'upcoming',
    date: 'October 2026',
    speaker: 'IEEE SIES GST Council',
    organization: 'SIES Graduate School of Technology',
    attendance: null,
    eventLink: 'https://techopedia-14.netlify.app/',
    reportLink: null,
  },
  {
    _id: 'studyabroad',
    eventName: 'Your Global Future: Study Abroad & Profile Building',
    eventDescription:
      'Comprehensive 2-day guidance roadmap covering international university selection, GRE/IELTS strategies, statement of purpose curation, research resume building, and scholarships.',
    eventImage: { url: studyAbroadFlyer },
    eventType: 'Career Seminar',
    category: 'seminars',
    eventState: 'previous',
    date: '18–19 Aug 2026',
    speaker: 'Ms. Tanvi Sharma',
    organization: 'Senior Counsellor, Collegepond',
    attendance: 142,
    eventLink: 'https://docs.google.com/document/d/1mvZKXfEzLEvsqr3sCauHyeB6mz89VtNk/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/1mvZKXfEzLEvsqr3sCauHyeB6mz89VtNk/edit?usp=sharing',
  },
  {
    _id: 'lte5g',
    eventName: 'Comparative Difference: LTE, 5G & 6G Architecture',
    eventDescription:
      'In-depth technical seminar covering mobile generation evolution, sub-6GHz & mmWave spectrum bands, MIMO antenna arrays, network slicing, and next-gen 6G standards.',
    eventImage: { url: lte5gFlyer },
    eventType: 'Industry Seminar',
    category: 'seminars',
    eventState: 'previous',
    date: '17 Aug 2026',
    speaker: 'Dr. Gitimayee Sahu',
    organization: 'Manager, Reliance Jio',
    attendance: 48,
    eventLink: 'https://docs.google.com/document/d/18VSoa1PFtPoi9qrn2WIV_eqDdgXQ7LY8/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/18VSoa1PFtPoi9qrn2WIV_eqDdgXQ7LY8/edit?usp=sharing',
  },
  {
    _id: 'rag',
    eventName: 'Hack Your Homework: Building an AI Study Buddy with RAG',
    eventDescription:
      'Practical hands-on bootcamp constructing custom AI study assistants using Retrieval-Augmented Generation, vector databases, LangChain, and local LLMs over study notes.',
    eventImage: { url: ragThumbnail },
    eventType: 'Hands-on Workshop',
    category: 'workshops',
    eventState: 'previous',
    date: '03–04 Aug 2026',
    speaker: 'Atharva Matale & Dakshata Dalvi',
    organization: 'IEEE CS Chapter & Tech Head',
    attendance: 65,
    eventLink: 'https://docs.google.com/document/d/1NYMxlEHPyPg7TdNKriuaY1HqzfdsI1pO/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/1NYMxlEHPyPg7TdNKriuaY1HqzfdsI1pO/edit?usp=sharing',
  },
  {
    _id: 'aiproduct',
    eventName: "AI's Impact on Modern Product Management",
    eventDescription:
      'Industry perspective on how GenAI is transforming product discovery, automated user stories, telemetry instrumentation, and agile roadmapping in high-growth startups.',
    eventImage: { url: aiProductFlyer },
    eventType: 'Industry Seminar',
    category: 'seminars',
    eventState: 'previous',
    date: '12 Aug 2026',
    speaker: 'Ms. Kritika Pandey',
    organization: 'Product Manager, India Crypto Research',
    attendance: 53,
    eventLink: 'https://docs.google.com/document/d/1caholesKh5n_Pf5zcJAu1pYuJTq-9x2S/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/1caholesKh5n_Pf5zcJAu1pYuJTq-9x2S/edit?usp=sharing',
  },
  {
    _id: 'industrial',
    eventName: 'Industrial Audit & Compliance: Pathways in Cloud Security',
    eventDescription:
      'Expert session on IT compliance frameworks, SOC 2 / ISO certifications, security auditing pipelines, and career opportunities in cloud infrastructure governance.',
    eventImage: { url: industrialAuditFlyer },
    eventType: 'Industry Seminar',
    category: 'seminars',
    eventState: 'previous',
    date: '14 Aug 2026',
    speaker: 'Mr. Sahaj Shukla',
    organization: 'Software Engineer II, BDIPlus NY',
    attendance: 50,
    eventLink: 'https://docs.google.com/document/d/1EdLArN2c4TjP6qIVoO78AClXAXIHUENU/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/1EdLArN2c4TjP6qIVoO78AClXAXIHUENU/edit?usp=sharing',
  },
  {
    _id: 'solarai',
    eventName: 'AI for Smarter Solar Energy & Grid Optimization',
    eventDescription:
      'Cutting-edge webinar focusing on predictive machine learning models for solar irradiance forecasting, maximum power point tracking (MPPT), and smart grid efficiency.',
    eventImage: { url: solarAiFlyer },
    eventType: 'Webinar',
    category: 'webinars',
    eventState: 'previous',
    date: '30 Aug 2026',
    speaker: 'Prof. Manoj Suresh Gofane',
    organization: 'Faculty, RAIT Navi Mumbai',
    attendance: 40,
    eventLink: 'https://docs.google.com/document/d/1lVqVXImcqIS0Ds0DwcTihzyw-nnZ38lb/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/1lVqVXImcqIS0Ds0DwcTihzyw-nnZ38lb/edit?usp=sharing',
  },
  {
    _id: 'softskills',
    eventName: 'Soft Skills for Engineering Success & Leadership',
    eventDescription:
      'Corporate readiness masterclass addressing professional communication, active listening, executive presentations, and collaborative problem-solving.',
    eventImage: { url: softSkillsFlyer },
    eventType: 'Webinar',
    category: 'webinars',
    eventState: 'previous',
    date: '22 Aug 2026',
    speaker: 'Ms. Tanvi Gadoya',
    organization: 'Founder, Future Vision Training',
    attendance: 58,
    eventLink: 'https://docs.google.com/document/d/17j-u1TMuD-58HJe8hHEKjTU-ZLwNaA7e/edit?usp=sharing',
    reportLink: 'https://docs.google.com/document/d/17j-u1TMuD-58HJe8hHEKjTU-ZLwNaA7e/edit?usp=sharing',
  },
  {
    _id: 'isl',
    eventName: 'Indian Sign Language Recognizer Workshop',
    eventDescription:
      'Hands-on computer vision session where students trained custom machine learning models with OpenCV and MediaPipe to detect and translate sign language in real time.',
    eventImage: { url: signLanguage },
    eventType: 'Hands-on Workshop',
    category: 'workshops',
    eventState: 'previous',
    date: 'Hands-on Session',
    speaker: 'IEEE SIES GST Technical Team',
    organization: 'SIES Graduate School of Technology',
    attendance: 50,
    eventLink: '#',
    reportLink: null,
  },
  {
    _id: 'epsilon',
    eventName: 'Epsilon 2026: National Tech Symposium',
    eventDescription:
      'Flagship national symposium fostering technical innovation through project exhibitions, research poster presentations, keynote talks, and competitive hackathons.',
    eventImage: { url: epsilon },
    eventType: 'Flagship Event',
    category: 'flagship',
    eventState: 'previous',
    date: 'National Level',
    speaker: 'IEEE SIES GST Student Branch',
    organization: 'SIES Graduate School of Technology',
    attendance: null,
    eventLink: 'https://epsilon-2026.vercel.app/',
    reportLink: null,
  },
];

// ======================================================
// STATUS BADGE
// ======================================================
const StatusBadge = ({ state }) => {
  const isUpcoming = state?.toLowerCase() === 'upcoming';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${isUpcoming
          ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.35)]'
          : 'border-white/15 bg-black/60 text-slate-300'
        }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isUpcoming ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
      {isUpcoming ? 'Upcoming' : 'Completed'}
    </span>
  );
};

// ======================================================
// EVENT CARD (BALANCED & PROPORTIONAL)
// ======================================================
const EventCard = ({ event, index, isCarousel = false, onQuickView }) => {
  const cardRef = useRef(null);
  const isUpcoming = event.eventState?.toLowerCase() === 'upcoming';
  const hasReport = !!event.reportLink;

  // Cursor-tracked soft glow
  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070e1b]/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(6,182,212,0.12)] ${isCarousel ? 'w-[85vw] max-w-[350px] flex-shrink-0' : 'h-full'
        }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: isCarousel ? 0 : index * 0.05 }}
    >
      {/* Dynamic cursor highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.1), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="flex flex-col">
        {/* UNIFORM POSTER BANNER CONTAINER */}
        <button
          type="button"
          onClick={() => onQuickView(event)}
          className="relative block w-full h-56 sm:h-60 overflow-hidden bg-gradient-to-b from-[#0a1120] to-[#040813] border-b border-white/[0.08] text-left cursor-pointer"
          aria-label={`View full poster for ${event.eventName}`}
        >
          {/* Ambient blurred backdrop — fills any aspect ratio difference seamlessly */}
          <img
            src={event.eventImage?.url || FALLBACK_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-35 scale-125 transition-transform duration-700 group-hover:scale-150"
          />

          {/* Crisp foreground flyer image */}
          <img
            src={event.eventImage?.url || FALLBACK_IMG}
            alt={event.eventName}
            className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />

          {/* Vignette gradients */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

          {/* Header badges */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold text-cyan-200 backdrop-blur-md shadow-md">
              {event.eventType}
            </span>
            <StatusBadge state={event.eventState} />
          </div>

          {/* Footer badges over image */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            {event.attendance ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <Users className="h-3 w-3" />
                {event.attendance} Attendees
              </span>
            ) : (
              <span />
            )}

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition-all group-hover:bg-cyan-500 group-hover:text-black">
              <Maximize2 className="h-3 w-3" />
              View Flyer
            </span>
          </div>
        </button>

        {/* CARD CONTENT (STRUCTURED WITH BALANCED HEIGHTS & POLISHED TYPOGRAPHY) */}
        <div className="p-5 flex flex-col flex-1">
          {/* Speaker / Host row */}
          <div className="h-5 mb-2 flex items-center gap-1.5 text-xs font-medium text-cyan-300/90 tracking-tight truncate">
            <User className="h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
            <span className="truncate">
              {event.speaker}
              {event.organization ? ` • ${event.organization}` : ''}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="h-14 mb-2 flex items-start font-display text-base sm:text-[1.05rem] font-bold leading-snug tracking-tight text-white group-hover:text-cyan-200 transition-colors line-clamp-2">
            {event.eventName}
          </h3>

          {/* Date & Location metadata */}
          <div className="h-5 mb-3 flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              {event.date || 'SIES GST'}
            </span>
            <span className="inline-flex items-center gap-1.5 font-sans">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              SIES GST
            </span>
          </div>

          {/* Description snippet */}
          <p className="h-10 text-xs sm:text-[0.8125rem] leading-relaxed text-slate-300/90 line-clamp-2">
            {event.eventDescription}
          </p>
        </div>
      </div>

      {/* CARD FOOTER (PINNED TO BOTTOM) */}
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] px-5 py-3.5 bg-black/25">
        <button
          type="button"
          onClick={() => onQuickView(event)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Full Flyer
        </button>

        <div className="flex items-center gap-3">
          {hasReport && (
            <a
              href={event.reportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Official Event Report"
            >
              <FileText className="h-3.5 w-3.5" />
              Report
            </a>
          )}

          <a
            href={event.eventLink}
            target={event.eventLink !== '#' ? '_blank' : undefined}
            rel={event.eventLink !== '#' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 transition-colors hover:text-white"
          >
            {isUpcoming ? 'Register' : 'Details'}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ======================================================
// QUICK-VIEW LIGHTBOX MODAL
// ======================================================
const QuickViewModal = ({ event, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!event) return null;
  const hasLink = event.eventLink && event.eventLink !== '#';
  const hasReport = !!event.reportLink;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl md:grid-cols-[1.1fr_1fr]"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 z-20 rounded-full bg-black/70 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-white hover:text-black cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Full uncropped flyer display */}
        <div className="relative flex items-center justify-center bg-black/95 p-4 md:p-6 max-h-[45vh] md:max-h-[90vh] overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={event.eventImage?.url || FALLBACK_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-30 scale-125"
          />
          <img
            src={event.eventImage?.url || FALLBACK_IMG}
            alt={event.eventName}
            className="relative z-10 max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        </div>

        {/* Event dossier & Action CTAs */}
        <div className="flex flex-col gap-4 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              {event.eventType}
            </span>
            <StatusBadge state={event.eventState} />
            {event.attendance && (
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {event.attendance} Attendees
              </span>
            )}
          </div>

          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white">
            {event.eventName}
          </h3>

          {/* Speaker Spotlight */}
          {event.speaker && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5 flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300 flex-shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Resource Person / Host
                </div>
                <div className="text-sm font-bold text-white truncate">{event.speaker}</div>
                {event.organization && (
                  <div className="text-xs text-white/70 truncate">{event.organization}</div>
                )}
              </div>
            </div>
          )}

          {/* Date & Venue Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/50">Date</span>
                <span className="font-medium text-white">{event.date || 'TBA'}</span>
              </div>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/50">Venue</span>
                <span className="font-medium text-white">SIES GST, Navi Mumbai</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
              Event Overview
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {event.eventDescription}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
            {hasReport && (
              <a
                href={event.reportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-black shadow-lg"
              >
                <FileText className="h-4 w-4" />
                View Official Report (Doc)
              </a>
            )}

            {hasLink && (
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20"
              >
                Visit Event Portal <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ======================================================
// EVENTS SECTION COMPONENT
// ======================================================
const Events = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickView, setQuickView] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const filteredEvents = majorEvents.filter((event) => {
    // Filter pill matching
    let matchesTab = true;
    if (filter === 'upcoming') {
      matchesTab = event.eventState.toLowerCase() === 'upcoming';
    } else if (filter !== 'all') {
      matchesTab = event.category.toLowerCase() === filter.toLowerCase();
    }

    // Search query matching
    const q = searchQuery.toLowerCase().trim();
    let matchesSearch = true;
    if (q) {
      matchesSearch =
        event.eventName.toLowerCase().includes(q) ||
        (event.eventDescription && event.eventDescription.toLowerCase().includes(q)) ||
        (event.speaker && event.speaker.toLowerCase().includes(q)) ||
        (event.organization && event.organization.toLowerCase().includes(q));
    }

    return matchesTab && matchesSearch;
  });

  // Calculate counts for badges
  const getCount = (cat) => {
    if (cat === 'all') return majorEvents.length;
    if (cat === 'upcoming') return majorEvents.filter((e) => e.eventState === 'upcoming').length;
    return majorEvents.filter((e) => e.category === cat).length;
  };

  return (
    <section
      id="events"
      className="relative scroll-mt-28 pt-24 sm:pt-32 pb-24 border-t border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* TIER 1: CENTERED BALANCED SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium tracking-wide text-cyan-300 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles className="h-3.5 w-3.5" />
            IEEE SIES GST • Flagship Calendar
          </div>
          <h2 className="section-title">
            Major Events & Workshops
          </h2>
          <p className="section-subtitle">
            Flagship technical festivals, expert industry seminars, hands-on bootcamps, and national symposiums organized by IEEE SIES GST.
          </p>
        </motion.div>

        {/* TIER 2: SYMMETRICAL CONTROLS & FILTER TOOLBAR */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl border border-white/10 bg-[#070e1b]/70 backdrop-blur-xl shadow-xl">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'flagship', label: 'Flagship' },
              { id: 'workshops', label: 'Workshops' },
              { id: 'seminars', label: 'Seminars' },
              { id: 'webinars', label: 'Webinars' },
              { id: 'upcoming', label: 'Upcoming' },
            ].map((tab) => {
              const count = getCount(tab.id);
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event, speaker, topic..."
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-black/60 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & User Guide */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredEvents.length}</strong> major events
          </span>
          <span className="hidden sm:inline text-slate-500">
            Click any poster to view full uncropped flyer & official report
          </span>
        </div>

        {/* Desktop / Tablet Grid */}
        {filteredEvents.length > 0 ? (
          <div className="max-w-6xl mx-auto hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                index={index}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-400">
            <p className="mb-2 text-white font-semibold">No major events found</p>
            <p className="text-xs">Try clearing the search query or changing the filter.</p>
          </div>
        )}

        {/* Mobile Embla Carousel */}
        {filteredEvents.length > 0 && (
          <div className="relative md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 pb-4">
                {filteredEvents.map((event, index) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    index={index}
                    isCarousel
                    onQuickView={setQuickView}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={scrollPrev}
                aria-label="Previous event"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/15 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next event"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/15 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Swipe horizontally to browse through events
            </p>
          </div>
        )}
      </div>

      {/* Lightbox / Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <QuickViewModal event={quickView} onClose={() => setQuickView(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
