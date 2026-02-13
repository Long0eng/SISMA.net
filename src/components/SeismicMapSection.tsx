import { motion } from "framer-motion";
import { AlertTriangle, Activity, MapPin } from "lucide-react";
import { useState } from "react";

interface EarthquakeZone {
  id: string;
  name: string;
  region: string;
  risk: "alto" | "medio" | "basso";
  description: string;
  recentEvents: string;
  lat: number;
  lng: number;
}

const zones: EarthquakeZone[] = [
  { id: "friuli", name: "Friuli-Venezia Giulia", region: "Nord-Est", risk: "alto", description: "Zona ad alta sismicità, colpita dal devastante terremoto del 1976.", recentEvents: "Magnitudo 6.4 (1976)", lat: 46.25, lng: 13.1 },
  { id: "emilia", name: "Emilia-Romagna", region: "Nord", risk: "medio", description: "Attività sismica moderata, terremoto del 2012 nella pianura padana.", recentEvents: "Magnitudo 5.9 (2012)", lat: 44.8, lng: 11.3 },
  { id: "garfagnana", name: "Garfagnana (Toscana)", region: "Centro", risk: "medio", description: "Area della Garfagnana e Mugello con attività sismica ricorrente.", recentEvents: "Magnitudo 4.5 (2019)", lat: 44.1, lng: 10.5 },
  { id: "umbria", name: "Umbria-Marche", region: "Centro", risk: "alto", description: "Zona altamente sismica. Terremoto di Norcia nel 2016 e sequenza sismica del 1997.", recentEvents: "Magnitudo 6.5 (2016)", lat: 42.8, lng: 13.0 },
  { id: "lazio", name: "Amatrice (Lazio)", region: "Centro", risk: "alto", description: "Epicentro del terremoto devastante del 2016 che ha causato 299 vittime.", recentEvents: "Magnitudo 6.0 (2016)", lat: 42.63, lng: 13.29 },
  { id: "abruzzo", name: "L'Aquila (Abruzzo)", region: "Centro-Sud", risk: "alto", description: "Terremoto dell'Aquila del 2009, 309 vittime. Zona ad altissima pericolosità.", recentEvents: "Magnitudo 6.3 (2009)", lat: 42.35, lng: 13.4 },
  { id: "campania", name: "Irpinia (Campania)", region: "Sud", risk: "alto", description: "Terremoto dell'Irpinia del 1980 con quasi 3.000 vittime.", recentEvents: "Magnitudo 6.9 (1980)", lat: 40.85, lng: 15.3 },
  { id: "calabria", name: "Calabria", region: "Sud", risk: "alto", description: "Una delle regioni più sismiche d'Italia, soggetta a forti terremoti storici.", recentEvents: "Magnitudo 5.0 (2023)", lat: 39.0, lng: 16.5 },
  { id: "sicilia", name: "Sicilia orientale", region: "Isole", risk: "alto", description: "Zona dell'Etna e dello Stretto di Messina, altissimo rischio sismico.", recentEvents: "Magnitudo 4.8 (2018)", lat: 37.5, lng: 15.1 },
  { id: "gargano", name: "Gargano (Puglia)", region: "Sud", risk: "medio", description: "Area del promontorio del Gargano con sismicità moderata.", recentEvents: "Magnitudo 4.7 (2023)", lat: 41.7, lng: 15.9 },
];

const riskColors: Record<string, string> = {
  alto: "hsl(0, 70%, 55%)",
  medio: "hsl(35, 80%, 55%)",
  basso: "hsl(200, 80%, 55%)",
};

const riskBadgeClass: Record<string, string> = {
  alto: "bg-destructive/10 text-destructive",
  medio: "bg-secondary/10 text-secondary",
  basso: "bg-accent/10 text-accent",
};

const SeismicMapSection = () => {
  const [selectedZone, setSelectedZone] = useState<EarthquakeZone | null>(null);

  // Build Google Maps embed URL with markers for all zones
  const buildMapUrl = () => {
    const center = selectedZone
      ? `${selectedZone.lat},${selectedZone.lng}`
      : "42.5,12.5";
    const zoom = selectedZone ? 8 : 6;
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${selectedZone ? '400000' : '3000000'}!2d${selectedZone?.lng ?? 12.5}!3d${selectedZone?.lat ?? 42.5}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sit!2sit`;
  };

  return (
    <section id="mappa" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">Mappa Sismica</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Zone sismiche <span className="text-gradient">d'Italia</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Esplora le aree a maggiore rischio sismico nel territorio italiano. Seleziona una zona per visualizzarla sulla mappa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden">
              <iframe
                src={buildMapUrl()}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa sismica d'Italia"
                className="w-full"
              />
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 p-4 border-t border-border">
                {[
                  { label: "Rischio Alto", color: riskColors.alto },
                  { label: "Rischio Medio", color: riskColors.medio },
                  { label: "Rischio Basso", color: riskColors.basso },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {selectedZone ? (
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-card border border-border p-8 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">{selectedZone.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedZone.region}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${riskBadgeClass[selectedZone.risk]}`}>
                    <AlertTriangle className="w-3 h-3" />
                    Rischio {selectedZone.risk}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{selectedZone.description}</p>
                <div className="rounded-xl bg-muted/50 p-4 flex items-start gap-3">
                  <Activity className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Ultimo evento significativo</p>
                    <p className="text-sm text-muted-foreground">{selectedZone.recentEvents}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl bg-card border border-border p-8 shadow-lg text-center">
                <MapPin className="w-12 h-12 text-accent/40 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Seleziona una zona
                </h3>
                <p className="text-muted-foreground text-sm">
                  Clicca su una delle zone nell'elenco per visualizzare le informazioni sulla sismicità e centrare la mappa.
                </p>
              </div>
            )}

            {/* Zone list */}
            <div className="mt-6 space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-colors border ${
                    selectedZone?.id === zone.id
                      ? "bg-accent/10 border-accent/30 text-foreground"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{zone.name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: riskColors[zone.risk] }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeismicMapSection;
