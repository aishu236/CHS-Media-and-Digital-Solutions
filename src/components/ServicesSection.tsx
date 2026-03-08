import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { Megaphone, Palette, Video, Film, PenTool, Globe, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Megaphone, title: "Digital Marketing", items: ["Social Media Management", "Performance & Meta Ads", "Influencer Collaborations", "Content Strategy & Campaign Planning"] },
  { icon: Palette, title: "Creative Direction", items: ["Brand Identity & Visual Strategy", "Campaign Concepts & Storyboarding", "Art Direction & Set Design"] },
  { icon: Video, title: "Production & Direction", items: ["Music Videos", "Commercial & Ad Films", "Event & Show Coverage", "Brand Films & Corporate Videos", "Fashion & Lifestyle Shoots"] },
  { icon: Film, title: "Post-Production", items: ["Video Editing", "VFX & Motion Graphics", "Color Grading", "Sound Design & Mixing"] },
  { icon: PenTool, title: "Content Creation", items: ["Reels & Short-Form Content", "Product Shoots", "Promotional Visuals", "Behind-the-Scenes & Documentary"] },
  { icon: Globe, title: "Web & Digital Design", items: ["Website Design & Development", "Portfolio & Landing Pages", "UI/UX for Creative Projects"] },
];

const ServiceCard = ({ service, i, isInView }: { service: typeof services[0]; i: number; isInView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 10);
    rotateY.set(x * 10);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      className="relative h-full p-8 rounded-2xl bg-background border border-border hover:border-orange/30 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 group cursor-pointer"
    >
      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-5 group-hover:bg-navy/20 transition-colors"
        style={{ transform: "translateZ(25px)" }}
        animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <service.icon className="text-navy" size={24} />
      </motion.div>

      {/* Title with arrow */}
      <div className="flex items-center gap-2 mb-4" style={{ transform: "translateZ(15px)" }}>
        <h3 className="font-heading font-700 text-lg text-foreground">{service.title}</h3>
        <motion.div
          animate={isHovered ? { x: 3, y: -3, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ArrowUpRight size={16} className="text-orange" />
        </motion.div>
      </div>

      {/* List items */}
      <ul className="space-y-2" style={{ transform: "translateZ(10px)" }}>
        {service.items.map((item, j) => (
          <motion.li
            key={item}
            className="text-sm text-muted-foreground font-body flex items-start gap-2"
            initial={{ opacity: 0, x: -5 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: i * 0.06 + j * 0.03 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>


      {/* Bottom glow on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-orange/0 via-orange to-orange/0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <section id="services" className="section-padding bg-muted/30 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
          style={{ y: headerY, transformPerspective: 1200 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-body mb-3">What We Do</p>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-foreground">
            Services We <span className="text-gradient">Offer</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
