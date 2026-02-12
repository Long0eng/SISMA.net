import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Paesaggio sismico italiano" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Seismic line animation */}
      <div className="absolute bottom-32 left-0 right-0 h-px bg-seismic-line/20 overflow-hidden">
        <div className="h-full w-1/3 bg-seismic-line/60 animate-seismic" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/60 mb-4 font-body">
            Monitoraggio Sismico Accessibile
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight mb-6">
            SISMA<span className="text-gradient">.net</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/70 font-body leading-relaxed mb-10">
            Un sismografo Arduino open-source per proteggere la tua comunità.
            Installabile in luoghi pubblici e privati, con notifiche in tempo reale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#prodotto"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Scopri il Prodotto
            </a>
            <a
              href="#chi-siamo"
              className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Chi Siamo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
