import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowDown, Instagram } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Simple grid background — no parallax on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--navy)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--navy)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={isMobile ? undefined : { y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-heading font-900 text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            <span className="text-navy">CHS</span>{" "}
            <span className="text-gradient">Media</span>
            <br />
            <span className="text-foreground/80 text-3xl md:text-5xl lg:text-6xl font-600 inline-block">
              Marketing & Digital Solutions
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          Turning ideas into powerful brand experiences through creative digital marketing, 
          content direction, and strategic media solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("works")}
            className="group flex items-center gap-3 px-8 py-4 bg-navy text-primary-foreground rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
          >
            <Play size={18} />
            View Our Work
          </button>
          <button
            onClick={() => scrollToSection("book-appointment")}
            className="flex items-center gap-3 px-8 py-4 border-2 border-navy text-navy rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:bg-navy hover:text-primary-foreground transition-all duration-300"
          >
            Get In Touch
          </button>
          <a
            href="https://www.instagram.com/chs_media_digital.solution/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-orange text-secondary-foreground rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-glow)] transition-all duration-300"
          >
            <Instagram size={18} />
            Follow Us
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
