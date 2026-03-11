import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, TrendingUp, Eye } from "lucide-react";

const pillars = [
  { icon: Sparkles, title: "Creative Thinking", desc: "Bold ideas that break through the noise" },
  { icon: TrendingUp, title: "Data-Driven", desc: "Strategies backed by real insights" },
  { icon: Eye, title: "Visual Excellence", desc: "Designs that captivate and convert" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
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

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-orange/30 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-5 group-hover:bg-orange/20 transition-colors">
                <pillar.icon className="text-orange" size={26} />
              </div>
              <h3 className="font-heading font-700 text-xl text-foreground mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground font-body">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
