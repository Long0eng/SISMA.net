import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Activity } from "lucide-react";
import { useState } from "react";

interface EarthquakeZone {
  id: string;
  name: string;
  region: string;
  risk: "alto" | "medio" | "basso";
  description: string;
  recentEvents: string;
  cx: number;
  cy: number;
}

const zones: EarthquakeZone[] = [
  { id: "friuli", name: "Friuli-Venezia Giulia", region: "Nord-Est", risk: "alto", description: "Zona ad alta sismicità, colpita dal devastante terremoto del 1976.", recentEvents: "Magnitudo 6.4 (1976)", cx: 305, cy: 95 },
  { id: "emilia", name: "Emilia-Romagna", region: "Nord", risk: "medio", description: "Attività sismica moderata, terremoto del 2012 nella pianura padana.", recentEvents: "Magnitudo 5.9 (2012)", cx: 245, cy: 145 },
  { id: "toscana", name: "Toscana", region: "Centro", risk: "medio", description: "Rischio sismico medio, area del Mugello e Garfagnana particolarmente attive.", recentEvents: "Magnitudo 4.5 (2019)", cx: 215, cy: 195 },
  { id: "umbria", name: "Umbria", region: "Centro", risk: "alto", description: "Zona altamente sismica. Terremoto di Norcia nel 2016.", recentEvents: "Magnitudo 6.5 (2016)", cx: 255, cy: 225 },
  { id: "lazio", name: "Lazio (Amatrice)", region: "Centro", risk: "alto", description: "Epicentro del terremoto devastante del 2016 che ha causato 299 vittime.", recentEvents: "Magnitudo 6.0 (2016)", cx: 270, cy: 255 },
  { id: "abruzzo", name: "Abruzzo (L'Aquila)", region: "Centro-Sud", risk: "alto", description: "Terremoto dell'Aquila del 2009, 309 vittime. Zona ad altissima pericolosità.", recentEvents: "Magnitudo 6.3 (2009)", cx: 280, cy: 265 },
  { id: "campania", name: "Campania (Irpinia)", region: "Sud", risk: "alto", description: "Terremoto dell'Irpinia del 1980 con quasi 3.000 vittime.", recentEvents: "Magnitudo 6.9 (1980)", cx: 275, cy: 310 },
  { id: "calabria", name: "Calabria", region: "Sud", risk: "alto", description: "Una delle regioni più sismiche d'Italia, soggetta a forti terremoti storici.", recentEvents: "Magnitudo 5.0 (2023)", cx: 295, cy: 380 },
  { id: "sicilia", name: "Sicilia orientale", region: "Isole", risk: "alto", description: "Zona dell'Etna e dello Stretto di Messina, altissimo rischio sismico.", recentEvents: "Magnitudo 4.8 (2018)", cx: 275, cy: 430 },
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
            Esplora le aree a maggiore rischio sismico nel territorio italiano. Clicca su un punto per maggiori informazioni.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map SVG */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl bg-card border border-border p-6 shadow-lg">
              <svg viewBox="60 30 320 450" className="w-full h-auto" style={{ maxHeight: "550px" }}>
                {/* Italy simplified outline */}
                <path
                  d="M200,50 L230,45 L260,50 L290,55 L320,70 L340,90 L350,110 L340,130 L320,140
                     L300,135 L280,140 L270,155 L260,145 L240,150 L230,160 L220,170 L210,180
                     L220,190 L230,200 L240,210 L250,220 L260,230 L270,240 L280,250 L290,260
                     L295,275 L290,290 L285,305 L280,320 L285,335 L290,350 L295,365 L300,380
                     L305,395 L300,410 L290,420 L280,415 L275,425 L265,435 L255,440 L260,445
                     L275,450 L285,455 L280,465 L265,460 L255,450 L245,440 L250,430 L255,420
                     L250,410 L240,405 L235,395 L230,385 L225,375 L220,365 L225,355 L230,345
                     L225,335 L220,325 L215,315 L210,305 L205,295 L200,285 L195,275 L190,265
                     L185,255 L180,245 L175,235 L170,225 L165,215 L160,210 L155,205 L150,200
                     L145,195 L140,185 L145,175 L150,165 L155,155 L160,145 L165,135 L170,125
                     L175,115 L180,105 L185,95 L190,80 L195,65 Z"
                  fill="hsl(210, 30%, 93%)"
                  stroke="hsl(215, 25%, 75%)"
                  strokeWidth="1.5"
                />

                {/* Sardinia */}
                <path
                  d="M145,250 L155,240 L160,250 L165,265 L170,280 L175,295 L170,310 L165,325
                     L160,335 L155,340 L148,335 L142,325 L138,310 L135,295 L138,280 L140,265 Z"
                  fill="hsl(210, 30%, 93%)"
                  stroke="hsl(215, 25%, 75%)"
                  strokeWidth="1.5"
                />

                {/* Sicily */}
                <path
                  d="M225,410 L240,405 L255,408 L270,412 L285,418 L295,425 L290,435 L280,440
                     L265,445 L250,442 L238,435 L228,425 L225,418 Z"
                  fill="hsl(210, 30%, 93%)"
                  stroke="hsl(215, 25%, 75%)"
                  strokeWidth="1.5"
                />

                {/* Earthquake zone markers */}
                {zones.map((zone) => (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className="cursor-pointer"
                  >
                    {/* Pulse ring */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="12"
                      fill="none"
                      stroke={riskColors[zone.risk]}
                      strokeWidth="1"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="8;16;8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Dot */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="6"
                      fill={riskColors[zone.risk]}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all hover:r-8"
                    />
                    {selectedZone?.id === zone.id && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r="10"
                        fill="none"
                        stroke={riskColors[zone.risk]}
                        strokeWidth="2.5"
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
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
                  Clicca su uno dei punti sulla mappa per visualizzare le informazioni sulla sismicità della zona.
                </p>
              </div>
            )}

            {/* Zone list */}
            <div className="mt-6 space-y-2">
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
