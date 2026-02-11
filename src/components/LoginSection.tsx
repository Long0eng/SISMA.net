import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Bell } from "lucide-react";

const LoginSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? "Login effettuato!" : "Registrazione completata! Riceverai notifiche sismiche.");
  };

  return (
    <section id="login" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Bell className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              Resta <span className="text-gradient">allertato</span>
            </h2>
            <p className="text-muted-foreground">
              Accedi o registrati per ricevere notifiche in tempo reale quando il tuo sisma.net rileva attività sismica.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-card border border-border p-8 shadow-lg"
          >
            {/* Toggle */}
            <div className="flex rounded-lg bg-muted p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                  isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Accedi
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                  !isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Registrati
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    placeholder="Mario Rossi"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@esempio.it"
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Località di installazione
                  </label>
                  <input
                    type="text"
                    placeholder="es. Roma, Lazio"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                {isLogin ? "Accedi" : "Crea Account"}
              </button>
            </form>

            {isLogin && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                <a href="#" className="text-accent hover:underline">Password dimenticata?</a>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
