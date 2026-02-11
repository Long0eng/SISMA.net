import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck } from "lucide-react";

const plans = [
  {
    name: "Kit Base",
    price: "€79",
    desc: "Perfetto per uso domestico",
    features: ["Arduino Uno + Sensore ADXL345", "Modulo WiFi ESP8266", "Involucro stampato 3D", "Guida di montaggio", "Accesso dashboard base"],
    highlighted: false,
  },
  {
    name: "Kit Completo",
    price: "€149",
    desc: "La soluzione professionale",
    features: ["Tutto del Kit Base", "Batteria di backup", "Involucro resistente IP54", "Notifiche push illimitate", "Supporto tecnico prioritario", "Dashboard avanzata"],
    highlighted: true,
  },
  {
    name: "Installazione Pro",
    price: "€249",
    desc: "Per edifici pubblici e scuole",
    features: ["Kit Completo incluso", "Installazione professionale", "Calibrazione on-site", "Garanzia 2 anni", "Manutenzione inclusa 1 anno", "Report mensili automatici"],
    highlighted: false,
  },
];

const ShopSection = () => {
  return (
    <section id="acquista" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">Acquista</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Scegli il tuo <span className="text-gradient">piano</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Proteggi la tua casa, la tua scuola o il tuo edificio con sisma.net.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-primary border-accent shadow-xl shadow-accent/10 scale-105"
                  : "bg-card border-border"
              }`}
            >
              <h3
                className={`font-display text-xl font-bold mb-1 ${
                  plan.highlighted ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}
              >
                {plan.desc}
              </p>
              <p
                className={`font-display text-4xl font-bold mb-6 ${
                  plan.highlighted ? "text-gradient" : "text-foreground"
                }`}
              >
                {plan.price}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2 text-sm ${
                      plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-lg py-3 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Ordina Ora
              </button>
            </motion.div>
          ))}
        </div>

        {/* Shipping info */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-muted-foreground">
          {[
            { icon: ShoppingCart, text: "Pagamento sicuro" },
            { icon: Package, text: "Spedizione in 3-5 giorni" },
            { icon: Truck, text: "Spedizione gratuita sopra €100" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <item.icon className="w-4 h-4 text-accent" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
