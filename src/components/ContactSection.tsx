import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import BookingForm from "@/components/BookingForm";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = formRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section id="contact" className="section-padding bg-navy" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ transformPerspective: 1200 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-orange font-body mb-3">Get In Touch</p>
            <h2 className="font-heading font-800 text-4xl md:text-5xl text-primary-foreground mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-primary-foreground/70 text-lg font-body mb-10 leading-relaxed">
              Whether you need a full-scale production, a social media strategy, or a brand refresh — 
              we'd love to hear from you. Book an appointment or reach out directly.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="https://www.instagram.com/chs_media_digital.solution/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-orange text-secondary-foreground rounded-full font-heading font-600 text-sm uppercase tracking-wider hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
              >
                <Instagram size={16} />
                Follow Us
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <div
              id="book-appointment"
              className="bg-background rounded-3xl p-8 shadow-[var(--shadow-elevated)]"
              style={{ transform: "translateZ(20px)" }}
            >
              <h3 className="font-heading font-700 text-xl text-foreground mb-6">Book an Appointment</h3>
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
