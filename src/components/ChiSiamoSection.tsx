import { motion } from "framer-motion";
import { Users, Target, ShieldCheck } from "lucide-react";

const stats = [
  { value: "16.000+", label: "Terremoti registrati in Italia ogni anno" },
  { value: "70%", label: "Del territorio italiano a rischio sismico" },
  { value: "2016", label: "Ultimo terremoto devastante (Amatrice)" },
];

const ChiSiamoSection = () => {
  return (
    <section id="chi-siamo" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">Chi Siamo</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Una missione per la <span className="text-gradient">sicurezza</span>
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed text-lg">
            Siamo un gruppo di giovani appassionati di tecnologia e ingegneria, uniti dalla volontà
            di rendere il monitoraggio sismico accessibile a tutti. Con il nostro sismografo basato
            su Arduino, vogliamo creare una rete capillare di sensori installabili in scuole,
            edifici pubblici e abitazioni private.
          </p>
        </motion.div>

        {/* Problem section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-card border border-border p-8 md:p-12 mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-6">
            Il problema sismico in Italia
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            L'Italia è uno dei paesi europei a più alto rischio sismico. Situata al confine tra
            la placca euroasiatica e quella africana, la penisola è attraversata da numerose
            faglie attive. Ogni anno vengono registrati migliaia di terremoti, la maggior parte
            impercettibili, ma alcuni con conseguenze devastanti.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Dal terremoto dell'Irpinia del 1980 a quello dell'Aquila del 2009, fino alla
            tragedia di Amatrice nel 2016, la storia italiana è segnata da eventi sismici che
            hanno causato perdite di vite umane e danni incalcolabili al patrimonio culturale e
            abitativo. La prevenzione e il monitoraggio tempestivo restano le armi più efficaci
            per proteggere le comunità.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-muted/50">
                <p className="font-display text-3xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Team Giovane",
              desc: "Studenti e maker uniti dalla passione per la tecnologia al servizio della comunità.",
            },
            {
              icon: Target,
              title: "Innovazione",
              desc: "Tecnologia avanzata e ricerca continua per offrire un sistema di monitoraggio sempre più preciso e affidabile.",
            },
            {
              icon: ShieldCheck,
              title: "Sicurezza",
              desc: "Notifiche in tempo reale per allertare la popolazione e salvare vite.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl bg-card border border-border p-8 hover:border-accent/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
