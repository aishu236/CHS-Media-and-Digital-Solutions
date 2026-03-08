import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import { Sparkles, TrendingUp, Eye } from "lucide-react";
import { useMotionValue, useSpring } from "framer-motion";

const pillars = [
  { icon: Sparkles, title: "Creative Thinking", desc: "Bold ideas that break through the noise" },
  { icon: TrendingUp, title: "Data-Driven", desc: "Strategies backed by real insights" },
  { icon: Eye, title: "Visual Excellence", desc: "Designs that captivate and convert" },
];

const TiltCard = ({ pillar, i, isInView }: { pillar: typeof pillars[0]; i: number; isInView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-orange/30 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 cursor-default"
    >
      <motion.div
        className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-5 group-hover:bg-orange/20 transition-colors"
        style={{ transform: "translateZ(30px)" }}
      >
        <pillar.icon className="text-orange" size={26} />
      </motion.div>
      <h3 className="font-heading font-700 text-xl text-foreground mb-2" style={{ transform: "translateZ(20px)" }}>{pillar.title}</h3>
      <p className="text-muted-foreground font-body" style={{ transform: "translateZ(10px)" }}>{pillar.desc}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: -8 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{ y: parallaxY, transformPerspective: 1200 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-body mb-3">Who We Are</p>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-foreground mb-6">
            Let's Create Something<br />
            <span className="text-gradient">Awesome Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed font-body">
            At CHS Media, we're a creative digital marketing and media agency focused on turning 
            ideas into powerful brand experiences. We specialize in social media marketing, content 
            direction, and digital strategy — helping businesses connect authentically with their 
            audiences and stand out in the digital world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {pillars.map((pillar, i) => (
            <TiltCard key={pillar.title} pillar={pillar} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
