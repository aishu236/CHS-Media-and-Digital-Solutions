import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowDown, Instagram, Camera, Hash, Heart, Share2, BarChart3, Megaphone, TrendingUp, MessageCircle, Youtube, Palette } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const floatingIcons = [
  { Icon: Camera, top: "8%", left: "5%", size: 28, color: "orange" },
  { Icon: Hash, top: "15%", left: "85%", size: 24, color: "navy" },
  { Icon: Heart, top: "70%", left: "8%", size: 22, color: "orange" },
  { Icon: Share2, top: "25%", left: "92%", size: 26, color: "navy" },
  { Icon: BarChart3, top: "80%", left: "88%", size: 30, color: "orange" },
  { Icon: Megaphone, top: "45%", left: "3%", size: 32, color: "navy" },
  { Icon: TrendingUp, top: "60%", left: "93%", size: 24, color: "orange" },
  { Icon: MessageCircle, top: "88%", left: "45%", size: 22, color: "navy" },
  { Icon: Youtube, top: "12%", left: "42%", size: 26, color: "orange" },
  { Icon: Palette, top: "75%", left: "30%", size: 28, color: "navy" },
];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Parallax background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--navy)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--navy)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Floating digital marketing icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, top, left, size, color }, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-2xl backdrop-blur-sm"
            style={{
              width: `${size * 2.2}px`,
              height: `${size * 2.2}px`,
              top,
              left,
              background: color === "orange"
                ? "linear-gradient(135deg, hsl(var(--orange) / 0.15), hsl(var(--orange) / 0.04))"
                : "linear-gradient(135deg, hsl(var(--navy) / 0.12), hsl(var(--navy) / 0.03))",
              border: `1.5px solid hsl(var(--${color}) / 0.2)`,
              y: useTransform(scrollYProgress, [0, 1], [0, 40 + i * 25]),
            }}
            animate={{
              y: [0, -18 - i * 3, 0],
              rotate: [0, i % 2 === 0 ? 8 : -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Icon
              size={size}
              className={color === "orange" ? "text-orange" : "text-navy"}
              style={{ opacity: 0.5 }}
            />
          </motion.div>
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--orange)), transparent 70%)",
            top: "20%",
            right: "10%",
            y: useTransform(scrollYProgress, [0, 1], [0, 120]),
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--navy)), transparent 70%)",
            bottom: "10%",
            left: "5%",
            y: useTransform(scrollYProgress, [0, 1], [0, 80]),
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-container"
        >
          <h1 className="font-heading font-900 text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            <span className="text-navy">CHS</span>{" "}
            <span className="text-gradient">Media</span>
            <br />
            <motion.span
              className="text-foreground/80 text-3xl md:text-5xl lg:text-6xl font-600 inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              & Digital Solutions
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          Turning ideas into powerful brand experiences through creative digital marketing, 
          content direction, and strategic media solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.08, rotateZ: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("works")}
            className="group flex items-center gap-3 px-8 py-4 bg-navy text-primary-foreground rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
          >
            <Play size={18} />
            View Our Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, rotateZ: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("book-appointment")}
            className="flex items-center gap-3 px-8 py-4 border-2 border-navy text-navy rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:bg-navy hover:text-primary-foreground transition-all duration-300"
          >
            Get In Touch
          </motion.button>
          <motion.a
            href="https://www.instagram.com/chs_media_digital.solution/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, rotateZ: 1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-orange text-secondary-foreground rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-glow)] transition-all duration-300"
          >
            <Instagram size={18} />
            Follow Us
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
      >
        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
