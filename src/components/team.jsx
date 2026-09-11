import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import { Linkedin } from "lucide-react";

const LoadingCard = () => (
  <div className="animate-pulse bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-2 sm:p-4">
    <div className="w-full h-40 sm:h-60 md:h-80 lg:h-96 bg-gray-300/20 rounded-md"></div>
    <div className="w-full px-2 pt-4">
      <div className="h-4 bg-gray-300/20 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
    </div>
  </div>
);

function getInitials(name = "") {
  const parts = name
    .replace(/^Prof\.\s+/i, "")
    .replace(/^Dr\.\s+/i, "")
    .trim()
    .split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const TeamMemberCard = React.memo(({ member, index }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const isUiAvatar =
    !member.photo?.url ||
    member.photo.url.includes("ui-avatars.com") ||
    imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between"
    >
      {/* Photo / Avatar Area */}
      <div className="relative w-full aspect-[4/4.2] overflow-hidden rounded-xl bg-neutral-900/80 border border-white/5 mb-4">
        {isUiAvatar ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0a1128] to-slate-950 p-4 select-none relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute w-32 h-32 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />

            {/* Initials Circle */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {getInitials(member.name)}
              </span>
            </div>

            <span className="relative z-10 mt-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Council Member
            </span>
          </div>
        ) : (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800/50 animate-pulse" />
            )}
            <img
              className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              src={member.photo.url}
              alt={member.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </>
        )}
      </div>

      {/* Member Details */}
      <div className="text-center flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors mb-1">
            {member.name}
          </h3>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/25 text-sky-300 mb-3">
            {member.team}
          </span>
        </div>

        {member.linkedin && (
          <div className="pt-2 border-t border-white/5 flex justify-center">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>Connect</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
});

const TeamGrid = ({ members }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {(members || []).map((member, idx) => (
      <TeamMemberCard key={member._id} member={member} index={idx} />
    ))}
  </div>
);

function TeamSection({ members }) {
  const loaderMembers = useLoaderData();
  const teamMembers = members ?? loaderMembers ?? [];

  return (
    <section className="py-8">
      <Suspense fallback={<LoadingCard />}>
        <TeamGrid members={teamMembers} />
      </Suspense>
    </section>
  );
}

export default TeamSection;