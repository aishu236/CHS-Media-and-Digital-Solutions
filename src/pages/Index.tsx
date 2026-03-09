import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SkeletonPage from "@/components/SkeletonPage";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowSkeleton(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSkeleton) {
      const timer = setTimeout(() => setContentReady(true), 300);
      return () => clearTimeout(timer);
    }
  }, [showSkeleton]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && !contentReady && <SkeletonPage />}
      {contentReady && (
        <>
          <Navbar />
          <HeroSection />
          <ClientLogos />
          <AboutSection />
          <ServicesSection />
          <WorksSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
