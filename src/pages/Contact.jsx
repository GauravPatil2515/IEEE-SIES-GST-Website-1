import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Mail, MapPin, Instagram, Linkedin, Github, Youtube } from "lucide-react";

export default function Contact() {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@IEEESIESGST", label: "YouTube", color: "hover:text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/20" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/20" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-white hover:bg-white/10 hover:border-white/20" }
  ];

  return (
    <footer id="contact" className="section bg-[var(--color-bg-secondary)] relative overflow-hidden pt-16 sm:pt-24 md:pt-32 pb-6 sm:pb-8 md:pb-10">
      {/* Footer Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-20">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Let's <br />
              <span className="text-[var(--color-accent-light)]">Connect.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-md mb-6 sm:mb-8">
              Have a question or want to collaborate? <br className="hidden sm:block" />
              Reach out to the IEEE SIES GST team.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 ${social.color || "hover:text-white hover:bg-white/5 hover:border-white/20"}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 sm:gap-8"
          >
            <div>
              <h4 className="font-tech text-[var(--color-accent-light)] uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">Explore</h4>
              <ul className="space-y-3 sm:space-y-4">
                {['Home', 'About', 'Events', 'Gallery', 'YouTube', 'Team'].map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    {item === 'Team' ? (
                      <NavLink to="/team" className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm sm:text-base">
                        {item}
                      </NavLink>
                    ) : (
                      <a
                        href={`#${item === 'About' ? 'aboutus' : item.toLowerCase()}`}
                        className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-tech text-[var(--color-accent-light)] uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">Contact</h4>
              <ul className="space-y-4 sm:space-y-6">
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-muted)] mt-1 flex-shrink-0" />
                  <span className="text-[var(--color-text-secondary)] text-sm sm:text-base break-all">ieee@siesgst.ac.in</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-muted)] mt-1 flex-shrink-0" />
                  <span className="text-[var(--color-text-secondary)] text-sm sm:text-base">
                    SIES Graduate School of Technology,<br />
                    Nerul, Navi Mumbai - 400706
                  </span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-white/5 pt-4 sm:pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[var(--color-text-muted)]"
        >
          <p>© 2024 IEEE SIES GST. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>

      {/* Background Graphic */}
      <div className="absolute opacity-50 -bottom-20 -right-20 w-[600px] h-[600px] bg-[var(--color-accent-deep)] rounded-full blur-[150px] pointer-events-none" />
    </footer>
  );
}
