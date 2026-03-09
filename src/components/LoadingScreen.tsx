import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/chs-icon.png";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="perspective-container mb-8"
          >
            <img src={logo} alt="CHS Media" className="w-64 md:w-80 loader-pulse" />
          </motion.div>

          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-muted-foreground font-body tracking-widest uppercase"
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
