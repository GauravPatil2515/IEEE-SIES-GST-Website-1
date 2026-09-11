import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLoaderData } from "react-router-dom";
import { ArrowLeft, Search, Users } from "lucide-react";
import logo from "../assets/siesLogo.webp";
import TeamSection from "./team";

export default function Teams() {
  const members = useLoaderData() || [];
  const [selectedCouncil, setSelectedCouncil] = useState("Senior Council");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (member.council !== selectedCouncil) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = member.name?.toLowerCase().includes(q);
        const matchesRole = member.team?.toLowerCase().includes(q);
        if (!matchesName && !matchesRole) return false;
      }
      return true;
    });
  }, [members, selectedCouncil, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="grid-bg" />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </NavLink>

          <div className="flex items-center gap-2.5">
            <img src={logo} alt="IEEE SIES GST" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold text-sm hidden sm:inline">
              IEEE SIES GST
            </span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h1 className="section-title">Leadership & Council</h1>
            <p className="section-subtitle">
              Meet the passionate student leaders and technical mentors steering IEEE SIES GST for the 2026–2027 term.
            </p>

            {/* Controls: Segmented Pill & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              {/* Apple-style Segmented Control */}
              <div className="inline-flex p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
                {["Senior Council", "Junior Council"].map((council) => (
                  <button
                    key={council}
                    onClick={() => setSelectedCouncil(council)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${selectedCouncil === council
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                        : "text-slate-400 hover:text-white"
                      }`}
                  >
                    {council}
                  </button>
                ))}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search council..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Team Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCouncil}-${searchQuery}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TeamSection members={filteredMembers} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}