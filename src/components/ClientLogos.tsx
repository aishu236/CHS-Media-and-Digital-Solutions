import { motion } from "framer-motion";

import conflkt from "@/assets/clients/conflkt.png";
import wellversed from "@/assets/clients/wellversed.png";
import ananthabhyas from "@/assets/clients/ananthabhyas.png";
import icn from "@/assets/clients/icn.png";
import polam from "@/assets/clients/polam.png";
import intaa from "@/assets/clients/intaa.png";
import nonu from "@/assets/clients/nonu.png";
import deeraj from "@/assets/clients/deeraj.png";
import sniva from "@/assets/clients/sniva.png";

const clients = [
  { name: "Conflkt", logo: conflkt },
  { name: "Wellversed", logo: wellversed },
  { name: "Ananthabhyas", logo: ananthabhyas },
  { name: "ICN", logo: icn },
  { name: "Polam", logo: polam },
  { name: "Intaa Interiors", logo: intaa },
  { name: "Nonu", logo: nonu },
  { name: "Deeraj", logo: deeraj },
  { name: "Sniva", logo: sniva },
];

const ClientLogos = () => {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
          Trusted By Leading Brands
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
          }}
        >
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex items-center justify-center px-10 py-4 shrink-0">
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 md:h-16 w-auto object-contain brightness-110"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
