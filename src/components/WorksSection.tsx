import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { Music, Trophy, Shirt, Palette, ExternalLink, Play, Instagram, FolderOpen } from "lucide-react";
import makeupBrushes from "@/assets/makeup-brushes.png";
import snivaLogo from "@/assets/clients/sniva-logo.png";
import snivaCover from "@/assets/clients/sniva-cover.png";
import wellversedLogo from "@/assets/clients/wellversed.png";
import wellversedDay1 from "@/assets/clients/wellversed-day1.png";
import wellversedDay2 from "@/assets/clients/wellversed-day2.png";
import wellversedDay3 from "@/assets/clients/wellversed-day3.png";
import conflktLogo from "@/assets/clients/conflkt.png";
import conflktReel1 from "@/assets/clients/conflkt-reel1.png";
import conflktReel2 from "@/assets/clients/conflkt-reel2.png";
import conflktReel3 from "@/assets/clients/conflkt-reel3.png";
import ananthabhyasLogo from "@/assets/clients/ananthabhyas.png";
import nonuLogo from "@/assets/clients/nonu.png";
import namasteGrocery from "@/assets/clients/namaste-grocery.png";

// Helper to extract YouTube video ID
const getYouTubeId = (url: string) => {
  const match = url.match(/(?:v=|\/)([\w-]{11})(?:\?|&|$)/);
  return match ? match[1] : null;
};

// Helper to determine link type
const getLinkType = (url: string): "youtube" | "instagram" | "drive" | "other" => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("drive.google.com")) return "drive";
  return "other";
};

const LinkPreviewCard = ({ link }: { link: { label: string; url: string; customThumbnail?: string } }) => {
  const type = getLinkType(link.url);
  const ytId = type === "youtube" ? getYouTubeId(link.url) : null;
  const ytThumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
  const thumbnail = link.customThumbnail || ytThumbnail;
  const isReel = type === "instagram";
  const isVideo = type === "youtube" || isReel;
  const [isHovered, setIsHovered] = useState(false);

  // 16:9 for YouTube, 9:16 for Instagram reels, square for others
  const isPortrait = isReel;
  const cardWidth = isPortrait ? "w-40" : "w-48";
  const thumbHeight = isPortrait ? "h-56" : "h-28";

  const platformLabel = type === "youtube" ? "Watch on YouTube" : type === "instagram" ? "View on Instagram" : type === "drive" ? "Open in Google Drive" : "Open Link";

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-muted/40 hover:border-orange/40 hover:shadow-[var(--shadow-card)] transition-all duration-200 ${cardWidth} shrink-0`}
      whileHover={{ scale: 1.06, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail area with correct aspect ratio */}
      <div className={`relative w-full ${thumbHeight} bg-navy/5 overflow-hidden flex items-center justify-center`}>
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt={link.label}
              className={`w-full h-full group-hover:scale-110 transition-transform duration-300 ${
                ytThumbnail ? "object-cover" : "object-contain p-3"
              }`}
              loading="lazy"
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0)" }}
            >
              {isVideo && (
                <motion.div 
                  className="w-10 h-10 rounded-full bg-orange/90 flex items-center justify-center shadow-lg"
                  animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Play size={18} className="text-secondary-foreground ml-0.5" fill="currentColor" />
                </motion.div>
              )}
            </motion.div>
          </>
        ) : type === "instagram" ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange/20 flex items-center justify-center">
            <motion.div animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 0.5 }}>
              <Instagram size={28} className="text-orange/70" />
            </motion.div>
          </div>
        ) : type === "drive" ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center">
            <FolderOpen size={28} className="text-navy/50" />
          </div>
        ) : (
          <div className="w-full h-full bg-navy/5 flex items-center justify-center">
            <ExternalLink size={24} className="text-muted-foreground/40" />
          </div>
        )}

        {/* Platform badge */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.12 }}
              className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-navy/80 text-primary-foreground text-[10px] font-body backdrop-blur-sm"
            >
              {type === "youtube" ? "YouTube" : type === "instagram" ? "Instagram" : type === "drive" ? "Drive" : "Link"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label area */}
      <div className="px-3 py-2.5 flex items-center gap-2">
        <span className="text-[11px] font-medium text-foreground line-clamp-2 flex-1 font-body leading-tight">{link.label}</span>
        <motion.div animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }} transition={{ duration: 0.15 }}>
          <ExternalLink size={12} className="text-muted-foreground shrink-0 group-hover:text-orange transition-colors" />
        </motion.div>
      </div>
    </motion.a>
  );
};
const works = [
  {
    icon: Music,
    title: "Songs Production",
    description: "From concept to completion, our team handled the entire production of rap music videos — including pre-production planning, shooting, editing, and VFX. We crafted dynamic visuals and seamless post-production effects to deliver high-quality and visually engaging final outputs.",
    color: "orange",
    links: [
      { label: "Dhoorangundu - DEVA", url: "https://www.youtube.com/watch?v=nhIMW1szms8" },
      { label: "Choostu Undu - Lady Skavya", url: "https://www.youtube.com/watch?v=jO_CHsaHpA8" },
      { label: "Maryaada Remix - Lady Skavya FT. Sherni", url: "https://www.youtube.com/watch?v=M15ZRysNIv0" },
    ],
  },
  {
    icon: Trophy,
    title: "Wellversed ICN 3 Days Production",
    description: "We managed the complete production of the national-level ICN Fitness Competition, covering three days of high-intensity events. Our team handled everything from multi-camera coverage to on-ground coordination, live editing and post-production.",
    color: "navy",
    links: [
      { label: "Registration Day", url: "https://www.instagram.com/reel/DNq3Y-Hz5i9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: wellversedDay1 },
      { label: "Show Day 1", url: "https://www.instagram.com/reel/DNu7C1PZoOR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: wellversedDay2 },
      { label: "Show Day 2", url: "https://www.instagram.com/reel/DNxn9IIZl_8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: wellversedDay3 },
    ],
  },
  {
    icon: Shirt,
    title: "ConflktMagazine Fashion Shows Production",
    description: 'From concept to curtain call, we executed the entire "Nothing Can Save This" fashion show — handling everything from creative direction, stage design, and visual storytelling to full production and post-editing.',
    color: "orange",
    links: [
      { label: "NCST Ep.1 - Privilege vs Persona", url: "https://www.youtube.com/watch?v=XvRnD0FJSbw" },
      { label: "NCST Ep.2 - Privilege vs Persona", url: "https://www.youtube.com/watch?v=7T693LlgKtM" },
      { label: "Hotmess Express Ep.2", url: "https://www.youtube.com/watch?v=phh57G6fYBI" },
      { label: "NCST Episode 1", url: "https://www.instagram.com/p/DKKZLVfSVVc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: conflktReel1 },
      { label: "The Runway", url: "https://www.instagram.com/reel/DMNUSRAxrwe/?utm_source=ig_embed&ig_rid=6d8fa8a9-429d-4b2c-9aae-db41753358ea", customThumbnail: conflktReel2 },
      { label: "Fashion Experiment", url: "https://www.instagram.com/reel/DKkGj-YJeRW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: conflktReel3 },
    ],
  },
  {
    image: makeupBrushes,
    title: "Sniva Studio & Academy",
    description: "Collaborated with Sniva Studio on creative visual productions, delivering stunning photography and video content that captures brand essence and engages audiences across digital platforms.",
    color: "orange",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/sniva_studio?igsh=dXZ2ZHo5d25mc3dz", customThumbnail: snivaCover },
    ],
  },
  {
    icon: Palette,
    title: "Other Productions & Edits",
    description: "A collection of our diverse creative work including brand collaborations, social media content, graphic designs, and thumbnail creations for various clients.",
    color: "orange",
    links: [
      { label: "Namaste Grocery", url: "https://www.instagram.com/reel/C7k6ZjzM3Am/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D", customThumbnail: namasteGrocery },
      { label: "Ananthabhyas", url: "https://www.instagram.com/ananthabhyas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D", customThumbnail: ananthabhyasLogo },
      { label: "Nonu Care", url: "https://www.instagram.com/nonucare?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D", customThumbnail: nonuLogo },
      { label: "Designs", url: "https://drive.google.com/drive/folders/1zQLYwhzigNy9tFXFzMi5LgS8m4vySE9r" },
      { label: "Thumbnails", url: "https://drive.google.com/drive/folders/14LrGzlb7ahLYl_SSTM8-Hg0j6d3cwb-g" },
    ],
  },
];

const WorkCard = ({ work, i }: { work: typeof works[0]; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 6);
    rotateY.set(x * 6);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`relative p-8 md:p-12 rounded-3xl border border-border hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 overflow-hidden ${
          i % 2 === 0 ? "bg-muted/30" : "bg-background"
        }`}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, hsl(var(--orange) / 0.12), transparent 60%)`,
          }}
        />


        <div className="relative flex flex-col md:flex-row items-start gap-6" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${
              work.color === "orange" ? "bg-orange/10" : "bg-navy/10"
            }`}
            initial={{ rotate: -10, scale: 0 }}
            animate={isInView ? { rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.08 + 0.1, type: "spring", stiffness: 200 }}
            style={{ transform: "translateZ(35px)" }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          >
            {"image" in work && work.image ? (
              <img src={work.image} alt={work.title} className="w-12 h-12 object-contain" />
            ) : (
              "icon" in work && work.icon && <work.icon className={work.color === "orange" ? "text-orange" : "text-navy"} size={30} />
            )}
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h3
              className="font-heading font-700 text-2xl text-foreground mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
            >
              {work.title}
            </motion.h3>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed mb-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 + 0.15 }}
            >
              {work.description}
            </motion.p>

            {/* Thumbnail link preview cards */}
            <motion.div
              className="flex flex-wrap gap-3 items-end"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
            >
              {work.links.map((link, index) => (
                <LinkPreviewCard key={index} link={link} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-orange/0 via-orange to-orange/0"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

const WorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section id="works" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
          style={{ y: headerY, transformPerspective: 1200 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-body mb-3">Portfolio</p>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-foreground">
            Our <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {works.map((work, i) => (
            <WorkCard key={work.title} work={work} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
