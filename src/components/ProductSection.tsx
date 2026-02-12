import { motion } from "framer-motion";
import { Cpu, Wifi, BarChart3, Bell, Zap, Shield } from "lucide-react";
import productImg from "@/assets/seismograph-product.jpg";

const features = [
  { icon: Cpu, title: "Arduino Based", desc: "Basato su microcontrollore Arduino per massima affidabilità e personalizzazione." },
  { icon: Wifi, title: "Connettività WiFi", desc: "Connessione wireless per trasmissione dati in tempo reale al cloud." },
  { icon: BarChart3, title: "Dati Precisi", desc: "Sensore accelerometrico ad alta sensibilità per rilevamento accurato." },
  { icon: Bell, title: "Notifiche Istantanee", desc: "Allerte push immediate in caso di attività sismica rilevata." },
  { icon: Zap, title: "Basso Consumo", desc: "Progettato per funzionare 24/7 con consumi energetici minimi." },
  { icon: Shield, title: "Resistente", desc: "Involucro robusto adatto a installazioni indoor e outdoor." },
];

const ProductSection = () => {
  return (
    <section id="prodotto" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">Il Prodotto</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            SISMA.net <span className="text-gradient">Sensor</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Un dispositivo compatto e intelligente che rileva le onde sismiche e ti avvisa in tempo reale.
          </p>
        </motion.div>

        {/* Product showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
              <img
                src={productImg}
                alt="SISMA.net Arduino Seismograph"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Specifiche Tecniche
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              {[
                { label: "Processore", value: "Arduino Uno R3 / Nano" },
                { label: "Sensore", value: "Accelerometro ADXL345 a 3 assi" },
                { label: "Connettività", value: "Modulo ESP8266 WiFi" },
                { label: "Alimentazione", value: "USB 5V / Batteria di backup" },
                { label: "Dimensioni", value: "12 × 8 × 5 cm" },
                { label: "Software", value: "Dashboard web per visualizzazione dati" },
              ].map((spec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-accent flex-shrink-0" />
                  <span><strong className="text-foreground">{spec.label}:</strong> {spec.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl bg-card border border-border p-6 hover:border-accent/40 transition-colors"
            >
              <f.icon className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-display font-semibold text-foreground mb-1">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
