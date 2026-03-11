import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Megaphone, Palette, Video, Film, PenTool, Globe } from "lucide-react";

const services = [
  { icon: Megaphone, title: "Digital Marketing", items: ["Social Media Management", "Performance & Meta Ads", "Influencer Collaborations", "Content Strategy & Campaign Planning"] },
  { icon: Palette, title: "Creative Direction", items: ["Brand Identity & Visual Strategy", "Campaign Concepts & Storyboarding", "Art Direction & Set Design"] },
  { icon: Video, title: "Production & Direction", items: ["Music Videos", "Commercial & Ad Films", "Event & Show Coverage", "Brand Films & Corporate Videos", "Fashion & Lifestyle Shoots"] },
  { icon: Film, title: "Post-Production", items: ["Video Editing", "VFX & Motion Graphics", "Color Grading", "Sound Design & Mixing"] },
  { icon: PenTool, title: "Content Creation", items: ["Reels & Short-Form Content", "Product Shoots", "Promotional Visuals", "Behind-the-Scenes & Documentary"] },
  { icon: Globe, title: "Web & Digital Design", items: ["Website Design & Development", "Portfolio & Landing Pages", "UI/UX for Creative Projects"] },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-muted/30 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-body mb-3">What We Do</p>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-foreground">
            Services We <span className="text-gradient">Offer</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative h-full p-8 rounded-2xl bg-background border border-border hover:border-orange/30 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-5 group-hover:bg-navy/20 transition-colors">
                <service.icon className="text-navy" size={24} />
              </div>
              <h3 className="font-heading font-700 text-lg text-foreground mb-4">{service.title}</h3>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground font-body flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
