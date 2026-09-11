import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from "../assets/siesLogo.webp"
import csLogo from "../assets/cs.webp"
import mttsLogo from "../assets/mtts.webp"
import wieLogo from "../assets/wie.webp"

gsap.registerPlugin(ScrollToPlugin)

const Hero = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for active section detection
    const sections = document.querySelectorAll('section[id], footer[id]')
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach(section => observer.observe(section))

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link, .scroll-indicator')
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power2.inOut"
          })
        }
      }
    }
    navLinks.forEach(link => link.addEventListener('click', handleNavClick))

    // Simple reliable animation for hero content
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate title container
    tl.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )

    // Animate Student Branch
    tl.fromTo('.student-branch',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    )

    // Animate tagline
    tl.fromTo('.hero-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    )

    // Animate buttons
    tl.fromTo('.hero-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    )

    // Animate scroll indicator
    tl.fromTo('.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick))
      observer.disconnect()
    }
  }, [])

  // Helper to check if nav item is active
  const isActive = (sectionId) => activeSection === sectionId

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-3 z-50 group">
            <img src={logo} alt="IEEE SIES GST" className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-300 transition-colors">
                IEEE SIES GST
              </span>
              <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-white/15">
                <img src={csLogo} alt="Computer Society" title="IEEE Computer Society" className="h-5 w-auto max-w-[48px] object-contain opacity-85 hover:opacity-100 hover:scale-105 transition-all" />
                <img src={mttsLogo} alt="MTT-S" title="IEEE MTT-S Society" className="h-5 w-auto object-contain opacity-85 hover:opacity-100 hover:scale-105 transition-all" />
                <span className="h-5 w-5 rounded bg-white/95 p-0.5 inline-flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-105 transition-all shadow-sm">
                  <img src={wieLogo} alt="Women in Engineering" title="IEEE Women in Engineering" className="h-full w-full object-contain" />
                </span>
              </div>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <ul className="nav-menu hidden md:flex">
            <li><a href="#home" className={`nav-link ${isActive('home') ? 'active' : ''}`}>Home</a></li>
            <li><a href="#aboutus" className={`nav-link ${isActive('aboutus') ? 'active' : ''}`}>About</a></li>
            <li><a href="#events" className={`nav-link ${isActive('events') ? 'active' : ''}`}>Events</a></li>
            <li><a href="#gallery" className={`nav-link ${isActive('gallery') ? 'active' : ''}`}>Gallery</a></li>
            <li><a href="#youtube" className={`nav-link ${isActive('youtube') ? 'active' : ''}`}>YouTube</a></li>
            <li><a href="#faqs" className={`nav-link ${isActive('faqs') ? 'active' : ''}`}>FAQs</a></li>
            <li><a href="#contact" className={`nav-link ${isActive('contact') ? 'active' : ''}`}>Contact</a></li>
          </ul>

          <div className="flex items-center gap-4">
            <NavLink
              to="/team"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all duration-200 hover:border-white/30 hover:scale-[1.02] shadow-sm"
            >
              Our Team
            </NavLink>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-24 pb-8 overflow-y-auto transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <ul className="flex flex-col items-center gap-6 text-lg">
              {['Home', 'About Us', 'Events', 'Gallery', 'YouTube', 'FAQs', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-white/80 hover:text-[var(--color-accent-light)] transition-colors py-2 px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <NavLink
                  to="/team"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Team
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-container relative overflow-hidden" id="home">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-[var(--color-accent-deep)] opacity-[0.12] rounded-full blur-[100px] pointer-events-none" />

        {/* Secondary glow for depth - very subtle */}
        <div className="absolute top-1/3 right-1/4 w-[25vw] h-[25vw] max-w-[250px] max-h-[250px] bg-[#00b5e2] opacity-[0.06] rounded-full blur-[80px] pointer-events-none" />

        <div className="hero-content relative z-10 max-w-5xl mx-auto flex flex-col items-center px-4 pt-12 sm:pt-16 pb-20">

          {/* Luminous Pre-Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md text-xs font-mono text-sky-300 mb-6 sm:mb-8 shadow-lg shadow-sky-950/20">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>IEEE SIES GST • STB99061</span>
          </div>

          {/* Sculpted Display Typography */}
          <h1 className="hero-title flex flex-col items-center leading-[1.06] text-center">
            <span className="font-display font-extrabold text-[clamp(2.5rem,8vw,6.25rem)] tracking-[-0.04em] text-white">
              IEEE <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">SIES GST</span>
            </span>
            <span className="student-branch font-mono text-xs sm:text-sm text-sky-400 tracking-[0.24em] uppercase mt-4 font-semibold inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block animate-pulse" />
              Student Branch • 2026–2027
            </span>
          </h1>

          <p className="hero-tagline font-normal mt-6 sm:mt-7 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto leading-relaxed text-slate-300 px-3">
            Advancing technological innovation and academic excellence at SIES Graduate School of Technology. Where student passion meets global engineering standards.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center w-full max-w-md sm:max-w-none mt-7 sm:mt-8">
            <a
              href="#events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-500/40"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </a>
            <NavLink
              to="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            >
              Meet the Council
            </NavLink>
          </div>

          {/* Understated Glass Metrics Strip */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-8 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-400 font-mono max-w-full">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-white font-bold font-display tabular-nums">150+</span> Members
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-white font-bold font-display tabular-nums">3</span> Chapters
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-white font-bold font-display tabular-nums">20+</span> Annual Events
            </div>
          </div>
        </div>

        {/* Minimalist Apple-Style Scroll Indicator */}
        <a
          href="#aboutus"
          className="scroll-indicator absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 group cursor-pointer flex flex-col items-center gap-2"
          aria-label="Scroll to about us"
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/20 group-hover:border-white/50 flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
            Scroll
          </span>
        </a>
      </section>
    </>
  )
}

export default Hero