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

// Convert lat/lng to SVG coordinates for an accurate Italy map
// Italy bounding box approx: lat 36-47.5, lng 6.5-18.5
const toSvg = (lat: number, lng: number): { x: number; y: number } => {
  const minLat = 35.5, maxLat = 47.5, minLng = 6.0, maxLng = 19.0;
  const svgWidth = 500, svgHeight = 650;
  const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
  const y = ((maxLat - lat) / (maxLat - minLat)) * svgHeight;
  return { x, y };
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
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl bg-card border border-border p-4 md:p-6 shadow-lg">
              <svg viewBox="0 0 500 650" className="w-full h-auto" style={{ maxHeight: "600px" }}>
                <defs>
                  <linearGradient id="seaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(200, 60%, 95%)" />
                    <stop offset="100%" stopColor="hsl(200, 50%, 90%)" />
                  </linearGradient>
                  <filter id="landShadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="hsl(215, 25%, 60%)" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Sea background */}
                <rect width="500" height="650" fill="url(#seaGradient)" rx="8" />

                {/* Italy mainland - detailed path */}
                <path
                  filter="url(#landShadow)"
                  d="
                    M 185 65 L 195 58 L 210 52 L 228 48 L 245 50 L 258 46 L 275 42 L 290 40 
                    L 305 42 L 318 48 L 330 55 L 342 50 L 358 52 L 370 58 L 380 65 L 388 72
                    L 392 82 L 395 92 L 390 100 L 382 108 L 375 95 L 365 88 L 355 85 L 345 88
                    L 338 95 L 330 100 L 322 95 L 312 92 L 302 95 L 295 100 L 288 108
                    L 280 112 L 270 108 L 262 105 L 255 110 L 248 115 L 240 118 L 232 122
                    L 225 128 L 218 135 L 212 142 L 208 150 L 205 158 L 200 165 L 195 172
                    L 192 180 L 188 188 L 185 195 L 182 202 L 178 210 L 175 218
                    L 172 225 L 170 232 L 175 238 L 180 242 L 188 248 L 195 252 L 200 258
                    L 208 262 L 215 268 L 222 275 L 228 282 L 235 288 L 240 295 L 245 302
                    L 250 310 L 255 318 L 258 325 L 262 332 L 265 340 L 268 348 L 272 355
                    L 275 362 L 278 370 L 282 378 L 288 385 L 292 392 L 298 398 L 302 405
                    L 308 412 L 312 418 L 315 425 L 318 432 L 322 438 L 320 445 L 315 450
                    L 308 455 L 302 460 L 298 468 L 295 475 L 290 480 L 285 485 L 280 478
                    L 278 470 L 282 462 L 285 455 L 280 448 L 275 442 L 268 448 L 262 455
                    L 258 462 L 252 468 L 248 460 L 245 452 L 242 445 L 238 438 L 235 430
                    L 232 422 L 228 415 L 225 408 L 222 400 L 218 392 L 215 385 L 212 378
                    L 208 370 L 205 362 L 202 355 L 198 348 L 195 340 L 192 332 L 188 325
                    L 185 318 L 182 310 L 178 302 L 175 295 L 172 288 L 168 280 L 165 272
                    L 162 265 L 158 258 L 155 250 L 152 242 L 148 235 L 145 228 L 142 220
                    L 138 212 L 135 205 L 132 198 L 135 190 L 140 182 L 145 175 L 148 168
                    L 152 160 L 155 152 L 158 145 L 162 138 L 165 130 L 168 122 L 172 115
                    L 175 108 L 178 100 L 180 92 L 182 82 L 183 72 Z
                  "
                  fill="hsl(210, 25%, 92%)"
                  stroke="hsl(215, 30%, 72%)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Sardinia */}
                <path
                  filter="url(#landShadow)"
                  d="
                    M 95 288 L 105 278 L 112 272 L 118 275 L 122 282 L 126 290 L 130 298
                    L 132 308 L 134 318 L 135 328 L 134 338 L 132 348 L 128 358 L 125 368
                    L 120 375 L 115 380 L 108 378 L 102 372 L 98 365 L 95 355 L 92 345
                    L 90 335 L 88 325 L 88 315 L 90 305 L 92 295 Z
                  "
                  fill="hsl(210, 25%, 92%)"
                  stroke="hsl(215, 30%, 72%)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Sicily */}
                <path
                  filter="url(#landShadow)"
                  d="
                    M 210 485 L 225 478 L 240 475 L 255 472 L 270 475 L 285 478 L 298 482
                    L 310 488 L 318 495 L 315 502 L 308 508 L 298 512 L 288 515 L 275 516
                    L 262 515 L 248 512 L 238 508 L 228 502 L 220 495 L 215 490 Z
                  "
                  fill="hsl(210, 25%, 92%)"
                  stroke="hsl(215, 30%, 72%)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Region borders (simplified internal lines) */}
                {/* Po valley line */}
                <path d="M 135 130 L 180 120 L 230 118 L 280 112 L 330 100" stroke="hsl(215, 20%, 82%)" strokeWidth="0.8" fill="none" strokeDasharray="4,3" />
                {/* Central Appennines */}
                <path d="M 200 165 L 215 195 L 225 230 L 240 270 L 255 310 L 270 350 L 285 390 L 300 420" stroke="hsl(215, 20%, 82%)" strokeWidth="0.8" fill="none" strokeDasharray="4,3" />

                {/* Earthquake zone markers */}
                {zones.map((zone) => {
                  const { x, y } = toSvg(zone.lat, zone.lng);
                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className="cursor-pointer"
                    >
                      {/* Outer pulse ring */}
                      <circle cx={x} cy={y} r="14" fill="none" stroke={riskColors[zone.risk]} strokeWidth="1" opacity="0.3">
                        <animate attributeName="r" values="10;20;10" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      {/* Inner dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r="7"
                        fill={riskColors[zone.risk]}
                        stroke="white"
                        strokeWidth="2.5"
                        className="transition-transform"
                      />
                      {/* Selection ring */}
                      {selectedZone?.id === zone.id && (
                        <circle cx={x} cy={y} r="12" fill="none" stroke={riskColors[zone.risk]} strokeWidth="2.5" />
                      )}
                      {/* Label */}
                      <text
                        x={x + 12}
                        y={y + 4}
                        fontSize="9"
                        fill="hsl(215, 30%, 40%)"
                        fontWeight="600"
                        className="pointer-events-none select-none"
                      >
                        {zone.name.split(" (")[0].split(" ").slice(0, 2).join(" ")}
                      </text>
                    </g>
                  );
                })}
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
