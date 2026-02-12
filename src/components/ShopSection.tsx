import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck } from "lucide-react";

const plan = {
  name: "Kit Completo SISMA.net",
  price: "€149",
  desc: "La soluzione completa per il monitoraggio sismico",
  features: [
    "Sismografo pronto all'uso",
    "Connessione WiFi integrata",
    "Notifiche push illimitate",
    "Dashboard web per visualizzazione dati",
    "Supporto tecnico dedicato",
    "Garanzia 2 anni",
    "Installazione indoor e outdoor",
  ],
};

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
            Proteggi la tua casa, la tua scuola o il tuo edificio con SISMA.net.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border bg-primary border-accent shadow-xl shadow-accent/10 p-8 flex flex-col"
          >
            <h3 className="font-display text-xl font-bold mb-1 text-primary-foreground">
              {plan.name}
            </h3>
            <p className="text-sm mb-4 text-primary-foreground/60">
              {plan.desc}
            </p>
            <p className="font-display text-4xl font-bold mb-6 text-gradient">
              {plan.price}
            </p>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-primary-foreground/80"
                >
                  <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
              Ordina Ora
            </button>
          </motion.div>
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
