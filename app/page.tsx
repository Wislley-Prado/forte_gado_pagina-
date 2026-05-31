"use client";

import {
  Award,
  BadgeCheck,
  Beef,
  ChevronRight,
  Clock3,
  Dumbbell,
  HeartPulse,
  Leaf,
  LockKeyhole,
  Medal,
  MessageCircle,
  PackageCheck,
  Play,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Wheat,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Scale,
  Activity,
  CalendarDays,
  ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ProductBag } from "@/components/ProductBag";
import { defaultContent } from "@/lib/content";
import { useSiteContent } from "@/lib/useSiteContent";
import { injectTrackingScripts } from "@/lib/tracking";
import { CookiesPopup } from "@/components/CookiesPopup";
import { TiktokIcon } from "@/components/TiktokIcon";

const tenReasons = [
  {
    icon: Scale,
    title: "1. Conversão alimentar otimizada",
    desc: "Melhora expressiva no aproveitamento dos nutrientes pelo organismo do animal."
  },
  {
    icon: TrendingUp,
    title: "2. Ganho de peso acelerado",
    desc: "Aceleração do desenvolvimento e engorda saudável do lote de corte."
  },
  {
    icon: Wheat,
    title: "3. Maior aproveitamento da forragem",
    desc: "Estimula o consumo eficiente da pastagem disponível na propriedade."
  },
  {
    icon: Activity,
    title: "4. Prevenção de acidose ruminal",
    desc: "Equilíbrio do pH do rúmen para evitar distúrbios digestivos graves."
  },
  {
    icon: HeartPulse,
    title: "5. Digestibilidade superior",
    desc: "Absorção máxima e retenção dos minerais essenciais no trato digestivo."
  },
  {
    icon: Sparkles,
    title: "6. Macro e micronutrientes equilibrados",
    desc: "Suplementação mineral completa, formulada sob medida para alta performance."
  },
  {
    icon: ShieldAlert,
    title: "7. Flora microbiana ativa",
    desc: "Vigor extra para as bactérias benéficas que realizam a digestão no rúmen."
  },
  {
    icon: Beef,
    title: "8. Apetite constante no pasto",
    desc: "Aumento natural do interesse do lote pelas pastagens diárias."
  },
  {
    icon: Medal,
    title: "9. Ganho extra no final do ciclo",
    desc: "Ganhe até 2 arrobas a mais por animal no balanço final do manejo."
  },
  {
    icon: Award,
    title: "10. Pelagem lisa e saudável",
    desc: "Pelos mais brilhantes e alinhados, refletindo vitalidade e excelente sanidade."
  }
];

const benefits = [
  ["Mais ganho de peso", Dumbbell],
  ["Mais imunidade", HeartPulse],
  ["Melhor reprodução", Beef],
  ["Mais produtividade", TrendingUp],
  ["Pronto para mistura", PackageCheck],
  ["Resultado comprovado", BadgeCheck]
] as const;

const results = [
  { value: "+18%", label: "potencial de produtividade no manejo mineralizado" },
  { value: "+12%", label: "melhor resposta de ganho em lotes acompanhados" },
  { value: "30 dias", label: "ou seu dinheiro de volta com risco zero!" }
];

const thirtyDayTimeline = [
  {
    days: "Dias 1 - 5",
    title: "Apetite & Hidratação",
    desc: "Aumento nítido no apetite e atração pelo cocho. Sódio e iodo regulam o equilíbrio hídrico, garantindo hidratação máxima mesmo sob calor intenso.",
    points: ["Apetite Estimulado", "Equilíbrio Hídrico Ativo"]
  },
  {
    days: "Dias 5 - 10",
    title: "Digestão & Sanidade",
    desc: "Melhora drástica na eficiência alimentar e ativação da microbiota ruminal. Menos ocorrência de inchaço, indigestão e distúrbios digestivos.",
    points: ["Digestão Otimizada", "Bactérias do Rúmen Ativas"]
  },
  {
    days: "Dias 10 - 15",
    title: "Vigor & Sangue Forte",
    desc: "Ação direta do ferro e zinco contra anemia. Mucosas mais rosadas, aumento na vitalidade geral e animais visivelmente alertas e enérgicos.",
    points: ["Redução de Anemia", "Maior Vitalidade e Energia"]
  },
  {
    days: "Dias 15 - 20",
    title: "Pelagem, Cascos & Imunidade",
    desc: "Ação combinada de enxofre e zinco melhora a saúde da pele e reduz rachaduras e infecções nos cascos. A pelagem ganha brilho intenso.",
    points: ["Pelo Liso e Brilhante", "Pele e Cascos Protegidos", "Imunidade Fortalecida"]
  },
  {
    days: "Dias 20 - 30",
    title: "Carcaça & Reprodução",
    desc: "Ganho de peso corporal acelerado por meio de síntese proteica eficiente. Ciclos reprodutivos regulares e aumento significativo na concepção.",
    points: ["Engorda Rápida", "Melhoria Reprodutiva", "Carcaça Robusta"]
  }
];

function scrollToKits() {
  document.getElementById("kits")?.scrollIntoView({ behavior: "smooth" });
}

function getYoutubeEmbedUrl(url: string) {
  try {
    let cleanUrl = url.trim();
    if (!cleanUrl) return "";
    
    // Auto-prepend https:// if missing a protocol
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }
    
    const parsed = new URL(cleanUrl);
    if (parsed.hostname.includes("youtube.com") && parsed.pathname.startsWith("/watch")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com") && parsed.pathname.includes("/shorts/")) {
      const parts = parsed.pathname.split("/");
      const index = parts.indexOf("shorts");
      const id = index !== -1 ? parts[index + 1] : "";
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com") && parsed.pathname.includes("/embed/")) {
      return cleanUrl;
    }
  } catch {
    return "";
  }
  return "";
}

const mineralData: Record<string, { symbol: string; color: string; desc: string }> = {
  "cálcio": {
    symbol: "Ca",
    color: "from-blue-600 to-indigo-700 text-blue-200 border-blue-500/30",
    desc: "Essencial para ossos fortes, dentes saudáveis e alta produção de leite."
  },
  "fósforo": {
    symbol: "P",
    color: "from-purple-600 to-fuchsia-700 text-purple-200 border-purple-500/30",
    desc: "Vital para fertilidade, ganho de peso e metabolismo energético (ATP)."
  },
  "sódio": {
    symbol: "Na",
    color: "from-sky-600 to-cyan-700 text-sky-200 border-sky-500/30",
    desc: "Regula o equilíbrio hídrico, melhora o apetite e otimiza a ruminação."
  },
  "zinco": {
    symbol: "Zn",
    color: "from-teal-600 to-emerald-700 text-teal-200 border-teal-500/30",
    desc: "Fortalece os cascos contra doenças e melhora a imunidade geral do lote."
  },
  "cobre": {
    symbol: "Cu",
    color: "from-amber-700 to-orange-800 text-amber-200 border-amber-600/30",
    desc: "Evita anemia, melhora a pigmentação do pelo e previne falhas reprodutivas."
  },
  "selênio": {
    symbol: "Se",
    color: "from-emerald-600 to-green-700 text-emerald-200 border-emerald-500/30",
    desc: "Poderoso antioxidante natural; previne retenção de placenta e doenças."
  },
  "cobalto": {
    symbol: "Co",
    color: "from-blue-700 to-slate-800 text-blue-200 border-blue-600/30",
    desc: "Necessário para a síntese ruminal de Vitamina B12 e conversão alimentar."
  },
  "manganês": {
    symbol: "Mn",
    color: "from-indigo-600 to-purple-800 text-indigo-200 border-indigo-500/30",
    desc: "Indispensável para a saúde das articulações e regularidade reprodutiva."
  },
  "enxofre": {
    symbol: "S",
    color: "from-yellow-600 to-amber-700 text-yellow-200 border-yellow-500/30",
    desc: "Essencial para síntese de proteínas ruminais e aproveitamento da fibra do pasto."
  },
  "magnésio": {
    symbol: "Mg",
    color: "from-cyan-600 to-blue-700 text-cyan-200 border-cyan-500/30",
    desc: "Previne a tetania das pastagens, regula funções nervosas e ativa enzimas."
  },
  "ferro": {
    symbol: "Fe",
    color: "from-slate-700 to-zinc-800 text-slate-200 border-slate-600/30",
    desc: "Transporta oxigênio no sangue, garantindo mais vigor e energia metabólica."
  }
};

export default function Home() {
  const { content } = useSiteContent(true);
  const c = content || defaultContent;
  const cleanWhatsapp = c.hero.whatsapp ? c.hero.whatsapp.replace(/\D/g, "") : "";

  const [timeLeft, setTimeLeft] = useState("");
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [activeMineral, setActiveMineral] = useState<string | null>(null);

  useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % thirtyDayTimeline.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycle]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = endOfDay.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const formatted = [
        String(hrs).padStart(2, "0"),
        String(mins).padStart(2, "0"),
        String(secs).padStart(2, "0")
      ].join(":");

      setTimeLeft(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (c.hero.favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = c.hero.favicon;
    }
  }, [c.hero.favicon]);

  useEffect(() => {
    if (c.integrations && cookieConsent === true) {
      injectTrackingScripts(c.integrations);
    } else if (cookieConsent === false) {
      const classTag = "fortegado-injected-script";
      document.querySelectorAll(`.${classTag}`).forEach((el) => el.remove());
    }
  }, [c.integrations, cookieConsent]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Fortegado Premium",
    description: c.hero.subheadline,
    brand: { "@type": "Brand", name: "Fortegado Premium" },
    category: "Suplemento mineral bovino",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: c.testimonials.length },
    offers: c.kits.map((kit) => ({
      "@type": "Offer",
      name: kit.name,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: kit.checkout
    }))
  };

  const brandVars = {
    "--premium-blue": c.colors.premiumBlue,
    "--gold": c.colors.gold,
    "--field-green": c.colors.fieldGreen,
    "--ice": c.colors.ice,
    "--deep-blue": c.colors.deepBlue
  } as CSSProperties;

  return (
    <main className="overflow-hidden bg-[var(--ice)]" style={brandVars}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative min-h-[92vh] overflow-hidden text-white flex flex-col justify-between">
        <img src={c.hero.banner} alt="Gado premium em pasto brasileiro" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#082B63]/78" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#082B63_0%,rgba(8,43,99,.82)_42%,rgba(10,61,145,.3)_100%)]" />

        {/* Header Overlay */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {c.hero.logo ? (
              <img src={c.hero.logo} alt="Logo" className="h-10 w-auto object-contain max-w-[200px]" />
            ) : (
              <span className="text-2xl font-black tracking-wider text-white">
                <span className="text-[#F2B705]">FORTE</span>GADO
              </span>
            )}
          </div>
        </header>

        <div className="section-shell relative grid min-h-[82vh] items-center gap-10 py-12 lg:grid-cols-[1fr_auto]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-[#F2B705]">
              <Sparkles size={17} /> Nutrição mineral premium para pecuária lucrativa
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-normal sm:text-7xl lg:text-8xl">
              {c.hero.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-white/88 sm:text-2xl">{c.hero.subheadline}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={scrollToKits}
                className="gold-glow inline-flex items-center justify-center gap-3 rounded-md bg-[#F2B705] px-7 py-5 text-base font-black uppercase text-[#082B63] transition hover:-translate-y-1 hover:bg-white"
              >
                <ShoppingCart size={21} /> {c.hero.cta}
              </button>
              <a
                href={c.hero.whatsappLink || `https://wa.me/${cleanWhatsapp}`}
                className="inline-flex items-center justify-center gap-3 rounded-md border border-white/30 bg-white/10 px-7 py-5 font-black uppercase text-white transition hover:bg-white hover:text-[#082B63]"
              >
                <MessageCircle size={21} /> {c.hero.whatsappText || "Falar com especialista"}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Garantia 30 dias", "Selo premium", "Compra segura"].map((item) => (
                <span key={item} className="dark-glass inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-bold">
                  <ShieldCheck size={17} className="text-[#F2B705]" /> {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:flex flex-col items-center justify-center w-[340px] shrink-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="absolute -inset-8 rounded-full bg-[#F2B705]/20 blur-3xl" />
            <div className="relative w-full flex justify-center">
              <ProductBag imageUrl={c.hero.productImage} />
            </div>
            <div className="glass-panel relative mt-4 w-full rounded-lg p-4 text-[#082B63] premium-shadow">
              <div className="flex items-center gap-2 text-sm font-black uppercase">
                <Award className="text-[#F2B705]" /> Padrão fazenda premium
              </div>
              <p className="mt-2 text-sm text-slate-600">Mistura prática, performance visível e manejo mais rentável.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#082B63] py-3 text-white">
        <div className="section-shell flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
          <span className="font-black uppercase text-[#F2B705]">{c.hero.promo}</span>
          {timeLeft && (
            <span className="inline-flex items-center gap-2 text-sm font-bold"><Clock3 size={16} /> Oferta expira em {timeLeft}</span>
          )}
        </div>
      </div>

      {c.sections.benefits && (
        <section className="section-shell -mt-8 relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {benefits.map(([label, Icon], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-lg bg-white p-5 premium-shadow transition hover:-translate-y-1"
            >
              <Icon className="mb-4 text-[#0A3D91]" />
              <p className="text-sm font-black uppercase leading-5 text-[#082B63]">{label}</p>
            </motion.div>
          ))}
        </section>
      )}

      {c.sections.product && (
        <section className="section-shell grid items-center gap-12 py-24 lg:grid-cols-[.85fr_1.15fr]">
            {(() => {
              const hasVideo = c.product.videoUrl && getYoutubeEmbedUrl(c.product.videoUrl);
              const isShorts = hasVideo && (c.product.videoUrl.includes("/shorts/") || c.product.videoUrl.includes("shorts"));
              
              if (hasVideo) {
                if (isShorts) {
                  return (
                    /* SMARTPHONE DEVICE FRAME FOR YOUTUBE SHORTS */
                    <div className="relative mx-auto w-full max-w-[280px] xs:max-w-[310px] aspect-[9/16] rounded-[2.5rem] bg-[#082B63] p-2.5 border-[8px] border-slate-900 shadow-2xl flex flex-col justify-center overflow-hidden premium-shadow transition-transform duration-500 hover:scale-[1.02] border-t-[10px] border-b-[10px]">
                      {/* Top Camera Notch cutout */}
                      <div className="absolute top-2 h-3 w-16 bg-slate-900 rounded-full z-20 pointer-events-none left-1/2 -translate-x-1/2" />
                      
                      <div className="w-full h-full aspect-[9/16] rounded-[1.8rem] overflow-hidden bg-black shadow-inner relative z-10">
                        <iframe
                          src={getYoutubeEmbedUrl(c.product.videoUrl)}
                          title={c.product.title}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    /* PREMIUM HORIZONTAL VIDEO CARD */
                    <div className="w-full p-4 bg-[#082B63] rounded-3xl border-4 border-[#0A3D91] shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                        <iframe
                          src={getYoutubeEmbedUrl(c.product.videoUrl)}
                          title={c.product.title}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                }
              }

              return (
                /* PREMIUM FALLBACK IMAGE CARD WITH BACKDROP GLOW */
                <div className="w-full p-6 sm:p-8 bg-gradient-to-b from-[#082B63] to-[#0A3D91] rounded-3xl border-4 border-[#5E8C31]/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] min-h-[380px]">
                  {/* Radial background glowing aura */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[#F2B705]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center w-full">
                    <ProductBag compact imageUrl={c.hero.productImage} />
                    
                    {c.hero.productImage && c.hero.productImage.includes("photo-1625246333195-78d9c38ad449") && (
                      <div className="relative mt-8 h-48 w-full overflow-hidden rounded-lg border border-white/15">
                        <img src={c.hero.productImage} alt="Foto de apoio do produto Fortegado" className="h-full w-full object-cover opacity-85" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          <div>
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Sobre o produto</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#082B63] sm:text-5xl">{c.product.title}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{c.product.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 items-stretch">
              {c.product.differentials.map((item) => (
                <div key={item} className="rounded-2xl border border-[#0A3D91]/10 bg-white p-6 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-md transition duration-300 hover:-translate-y-0.5">
                  <Medal className="mb-3.5 text-[#F2B705] shrink-0" size={24} />
                  <p className="font-bold leading-relaxed text-[#082B63] flex-1">{item}</p>
                </div>
              ))}
            </div>

            {/* INTERACTIVE ROW INFOGRAPHIC: MECANISMO ÚNICO DE PERFORMANCE EM LINHA */}
            {(() => {
              const selectedMineral = activeMineral || (c.product.composition && c.product.composition[0]) || "";
              return (
                <div className="mt-8 space-y-6 select-none">
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-black uppercase text-[#082B63]/60 tracking-widest flex items-center gap-1.5 mb-4">
                      <span>🔬</span> Mecanismo Único de Performance:
                    </h3>
                    
                    {/* Horizontal Line of glowing element circles */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {c.product.composition.map((item) => {
                        const key = item.toLowerCase().trim();
                        const data = mineralData[key] || {
                          symbol: item.substring(0, 2).toUpperCase(),
                          color: "from-[#0A3D91] to-[#082B63] text-white border-slate-200",
                          desc: "Nutriente fundamental para o equilíbrio metabólico e a saúde geral do rebanho."
                        };
                        
                        const isSelected = selectedMineral === item;

                        return (
                          <button
                            key={item}
                            type="button"
                            onMouseEnter={() => setActiveMineral(item)}
                            onClick={() => setActiveMineral(item)}
                            className={`flex flex-col items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br ${data.color} font-black border-2 cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? "scale-110 ring-4 ring-[#F2B705]/40 border-[#F2B705] shadow-[0_0_15px_rgba(242,183,5,0.3)] z-10" 
                                : "border-white/10 hover:scale-105 opacity-85 hover:opacity-100"
                            }`}
                          >
                            <span className="text-xs sm:text-sm leading-none">{data.symbol}</span>
                            <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-widest mt-0.5 opacity-80 leading-none truncate w-full text-center px-0.5">
                              {item.substring(0, 5)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Mineral Detail Banner Card (Compact, gold-accented, sits below the line) */}
                  {selectedMineral && (() => {
                    const key = selectedMineral.toLowerCase().trim();
                    const data = mineralData[key] || {
                      symbol: selectedMineral.substring(0, 2).toUpperCase(),
                      desc: "Nutriente fundamental para o equilíbrio metabólico e a saúde geral do rebanho."
                    };
                    return (
                      <motion.div
                        key={selectedMineral}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#082B63] to-[#0A3D91] border-2 border-[#F2B705] p-4 text-white shadow-lg flex items-center gap-4 min-h-[90px]"
                      >
                        {/* Golden Cow Silhouette Icon */}
                        <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 border border-white/15 text-[#F2B705] shadow-inner">
                          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current drop-shadow-[0_2px_5px_rgba(242,183,5,0.2)]">
                            <path d="M19.5 9c-.5 0-.9-.2-1.2-.5-.5-.5-1.1-.8-1.8-.8h-3c-.6 0-1.1-.3-1.4-.8L11 5H9c-1.1 0-2 .9-2 2v2c0 .6-.4 1-1 1H4.5C3.7 10 3 10.7 3 11.5S3.7 13 4.5 13H5v5c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1v-4h6v4c0 .6.4 1 1 1h1c1.1 0 2-.9 2-2v-5h.5c.8 0 1.5-.7 1.5-1.5S20.3 9 19.5 9z" />
                          </svg>
                        </div>
                        
                        {/* Text and technical description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <h4 className="text-xs sm:text-sm font-black text-[#F2B705] uppercase tracking-wider leading-none">
                              {selectedMineral}
                            </h4>
                            <span className="text-[10px] font-black text-white/50 leading-none bg-white/10 px-1.5 py-0.5 rounded uppercase">
                              {data.symbol}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-white/85 leading-normal mt-1.5">
                            {data.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* NOVA SEÇÃO: JORNADA 30 DIAS DE RESULTADOS VISÍVEIS (INTERATIVA E ANIMADA) */}
      <section className="bg-slate-50 py-24 border-b border-slate-200/50">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Jornada de Resultados</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#082B63] sm:text-5xl">
              O que Acontece com Seu Gado em Até 30 Dias?
            </h2>
            <p className="mt-4 text-lg font-semibold text-slate-500">
              Acompanhe o cronograma biológico de evolução visível dos animais após o início da suplementação mineral com Forte Gado Premium.
            </p>
          </div>

          {/* VISÃO PARA COMPUTADOR (INTERATIVA E ANIMADA COM ABAS AUTOMÁTICAS) */}
          <div className="hidden md:flex flex-col items-center w-full">
            <div className="w-full max-w-4xl bg-white/80 p-2.5 rounded-3xl border border-slate-200/40 shadow-sm flex overflow-x-auto snap-x justify-start md:justify-center gap-2 pb-3 md:pb-2.5 px-3 hide-scrollbar">
              {thirtyDayTimeline.map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => {
                    setActiveStep(index);
                    setIsAutoCycle(false); // Pausa o ciclo automático no clique manual
                  }}
                  className={`relative snap-center shrink-0 px-6 py-3.5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 overflow-hidden ${
                    activeStep === index
                      ? "bg-[#5E8C31] text-white shadow-md shadow-[#5E8C31]/20 scale-105"
                      : "bg-white text-[#082B63] border border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <span className="relative z-10">{step.days}</span>
                  {activeStep === index && isAutoCycle && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-[#F2B705] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Painel do Conteúdo Ativo (Com animação de transição espetacular) */}
            <div className="w-full max-w-4xl mt-8">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-slate-200/30 p-8 md:p-12 shadow-[0_20px_50px_rgba(8,43,99,0.04)] flex flex-col md:grid md:grid-cols-[1fr_1.8fr] gap-8 items-center"
              >
                {/* Coluna da Esquerda: Grande Indicador de Dias */}
                <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-inner min-h-[200px]">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-[#5E8C31]">Período</span>
                  <div className="text-4xl font-black text-[#082B63] mt-2 block leading-none select-none">
                    {thirtyDayTimeline[activeStep].days}
                  </div>
                  <div className="mt-6 flex gap-1.5 text-[#F2B705]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 block">Forte Gado Premium</span>
                </div>

                {/* Coluna da Direita: Textos e Efeitos */}
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <span className="text-[10px] font-black uppercase bg-[#5E8C31]/10 text-[#5E8C31] px-3 py-1.5 rounded-full tracking-wider w-fit block mb-4">
                      Fase {activeStep + 1}
                    </span>
                    <h3 className="text-3xl font-black text-[#082B63] leading-none mb-4">
                      {thirtyDayTimeline[activeStep].title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                      {thirtyDayTimeline[activeStep].desc}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-2.5">
                    {thirtyDayTimeline[activeStep].points.map((pt, i) => (
                      <motion.span
                        key={pt}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#082B63] bg-[#082B63]/6 px-3.5 py-2 rounded-full uppercase tracking-wider shadow-sm"
                      >
                        ✓ {pt}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Indicador de Pausa/Auto-Play */}
            <div className="mt-5 text-center flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isAutoCycle ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-[#5E8C31] animate-ping" />
                  <span>Apresentação automática ativa (Toque para pausar)</span>
                </>
              ) : (
                <button
                  onClick={() => setIsAutoCycle(true)}
                  className="hover:text-[#5E8C31] transition duration-200"
                >
                  ▶ Retomar apresentação automática
                </button>
              )}
            </div>
          </div>

          {/* VISÃO PARA CELULAR (SIMPLES, DIRETA E SCROLL-TRIGGERED - TOTALMENTE INTUITIVA PARA O HOMEM DA ROÇA) */}
          <div className="block md:hidden space-y-6">
            {thirtyDayTimeline.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-slate-200/30 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="text-[9px] font-black uppercase bg-[#5E8C31]/10 text-[#5E8C31] px-2.5 py-1 rounded-full tracking-wider">
                      Fase {index + 1}
                    </span>
                    <span className="text-xs font-black text-[#082B63]">{step.days}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#082B63] leading-tight mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-1.5 w-full">
                  {step.points.map((pt) => (
                    <span
                      key={pt}
                      className="inline-flex items-center gap-1 text-[9px] font-black text-[#082B63] bg-[#082B63]/5 px-2.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm"
                    >
                      ✓ {pt}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {c.sections.results && (
        <section className="premium-gradient py-24 text-white">
          <div className="section-shell">
            <div className="max-w-3xl">
              <span className="text-sm font-black uppercase tracking-[0.24em] text-[#F2B705]">Resultados no campo</span>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Mais desempenho por lote, mais margem por arroba.</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {results.map((item) => (
                <div key={item.value} className="rounded-lg border border-white/15 bg-white/10 p-8">
                  <div className="text-5xl font-black text-[#F2B705]">{item.value}</div>
                  <p className="mt-4 text-lg font-bold leading-7 text-white/86">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* Card ANTES */}
              <div className="overflow-hidden rounded-2xl bg-white text-[#082B63] premium-shadow border border-red-100/80 flex flex-col hover:shadow-md transition duration-300">
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  {c.product.beforeImage ? (
                    <img 
                      src={c.product.beforeImage} 
                      alt="Antes do Fortegado" 
                      className="h-full w-full object-cover transition duration-500 hover:scale-105" 
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-red-300">
                      <span className="text-4xl">🐄</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md">
                    ⚠️ Antes
                  </span>
                </div>
                <div className="p-6 sm:p-8 bg-slate-50/50 flex-1 flex items-center">
                  <p className="text-lg font-black leading-relaxed text-slate-600">
                    {c.product.beforeText || "Antes: lote irregular, consumo instável e baixa resposta no cocho."}
                  </p>
                </div>
              </div>

              {/* Card DEPOIS */}
              <div className="overflow-hidden rounded-2xl bg-white text-[#082B63] premium-shadow border border-emerald-200 ring-4 ring-emerald-500/10 flex flex-col hover:shadow-md transition duration-300">
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  {c.product.afterImage ? (
                    <img 
                      src={c.product.afterImage} 
                      alt="Depois do Fortegado Premium" 
                      className="h-full w-full object-cover transition duration-500 hover:scale-105" 
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-emerald-300">
                      <span className="text-4xl">🐂</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md">
                    ✅ Depois
                  </span>
                </div>
                <div className="p-6 sm:p-8 bg-emerald-50/5 flex-1 flex items-center">
                  <p className="text-lg font-black leading-relaxed text-[#082B63]">
                    {c.product.afterText || "Depois: lote mais uniforme, melhor escore corporal e manejo mineral consistente."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* SEÇÃO: 8 PILARES DO SUCESSO E RENTABILIDADE */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Transformação Completa</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#082B63] sm:text-5xl">
              Os 8 Grandes Pilares do Sucesso do Forte Gado Premium
            </h2>
            <p className="mt-4 text-lg font-semibold text-slate-500">
              Muito mais que mineralização: uma fórmula desenvolvida para impactar positivamente todos os aspectos produtivos e financeiros da sua propriedade.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pilar 1 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <Beef size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">1. Maior Ganho de Carcaça</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Nosso produto otimiza a conversão alimentar, resultando em carcaças mais pesadas e de melhor qualidade. Isso significa mais carne para vender e um aumento significativo na sua receita.
                </p>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">2. Mais Carne, Maior Lucro</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Cada grama de alimento é convertido de forma mais eficaz em músculo e carne, garantindo um preço premium por animais bem-nutridos e saudáveis. O investimento inicial se traduz rapidamente em lucros maiores.
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <Activity size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">3. Melhoria na Produção de Leite</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  O carbonato de cálcio presente no Sal Mineral Forte Gado é essencial para a formação de ossos fortes e a produção de leite de alta qualidade. Bovinos bem nutridos com cálcio produzem mais leite e de melhor qualidade, o que aumenta a rentabilidade da sua produção leiteira.
                </p>
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <Scale size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">4. O Produto se Paga e Sobra</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  A melhoria na eficiência alimentar e no ganho de peso faz com que o Sal Mineral Forte Gado se pague por si só. O retorno financeiro cobre o custo do produto e ainda gera lucro adicional para reinvestimentos ou melhorias na operação.
                </p>
              </div>
            </div>

            {/* Pilar 5 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <BadgeCheck size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">5. Mais Bezerros no Pasto</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Melhor saúde reprodutiva significa mais bezerros por ciclo reprodutivo, aumentando sua produção e lucro a longo prazo na fazenda.
                </p>
              </div>
            </div>

            {/* Pilar 6 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <HeartPulse size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">6. Aumento da Produtividade</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Bovinos saudáveis apresentam melhor desempenho, menos doenças e problemas de saúde, reduzindo custos veterinários e maximizando a produtividade diária.
                </p>
              </div>
            </div>

            {/* Pilar 7 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <LockKeyhole size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">7. Melhoria Financeira Real</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Aumento de produtividade e redução de custos se traduzem em mais dinheiro no bolso, permitindo reinvestimentos na fazenda, melhorias nas instalações ou simplesmente mais segurança financeira para sua família.
                </p>
              </div>
            </div>

            {/* Pilar 8 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/80 hover:shadow-lg hover:border-[#5E8C31]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#5E8C31]/10 text-[#5E8C31] flex items-center justify-center mb-5">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-black text-[#082B63] leading-snug">8. Orgulho e Satisfação</h3>
                <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">
                  Ver seus animais prosperarem e atingir seu máximo potencial proporciona um grande senso de realização e orgulho no trabalho bem-feito na pecuária.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA DOBRA DE ALTA PERSUASÃO: 10 MOTIVOS + PRAZO PERFEITO + FRETE GRÁTIS */}
      <section className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Nutrição e Manejo Eficiente</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#082B63] sm:text-5xl">
              10 Motivos para Escolher o Fortegado Premium na Sua Fazenda
            </h2>
            <p className="mt-4 text-lg font-semibold text-slate-500">
              Transforme a mineralização do seu rebanho em ganho real de peso, imunidade e rentabilidade no cocho.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] items-start">
            {/* Coluna da Esquerda: Grid dos 10 Motivos */}
            <div className="grid gap-5 sm:grid-cols-2">
              {tenReasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(8,43,99,0.06)] hover:border-[#5E8C31]/20 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#5E8C31]/8 text-[#5E8C31] group-hover:bg-[#5E8C31] group-hover:text-white transition duration-300">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#082B63] leading-snug group-hover:text-[#5E8C31] transition duration-200">
                          {reason.title}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold text-slate-500 leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Coluna da Direita: Card Comercial Imbatível */}
            <div className="sticky top-[100px] rounded-3xl overflow-hidden shadow-2xl premium-shadow border border-[#0A3D91]/20 text-white flex flex-col">
              {/* Topo do Card Comercial - Promoção Prazo Perfeito */}
              <div className="bg-gradient-to-br from-[#082B63] to-[#0A3D91] p-8 sm:p-10 text-center relative">
                <div className="absolute top-4 right-4 rounded-full bg-[#F2B705] text-[#082B63] text-[10px] font-black px-3.5 py-1 uppercase tracking-wider shadow">
                  Imperdível
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#F2B705]">Condição Exclusiva</span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 leading-none">PROMOÇÃO PRAZO PERFEITO</h3>
                
                {/* Destaque "90 Dias" */}
                <div className="mt-6 inline-flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
                  <span className="text-5xl font-black tracking-tight text-[#F2B705]">90 DIAS</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-1">Para Começar a Pagar</span>
                </div>
                
                <p className="mt-6 text-sm font-medium text-white/84 leading-relaxed max-w-md mx-auto">
                  Sua fazenda no ritmo certo da safra. Compre hoje o lote de suplemento mineral e ganhe carência total de até <strong>90 dias para pagar</strong>!
                </p>
              </div>

              {/* Corpo do Card Comercial - Garantia e Frete */}
              <div className="bg-white text-[#082B63] p-8 sm:p-10 border-t border-slate-100 flex flex-col gap-8">
                {/* Garantia */}
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0A3D91]/6 text-[#0A3D91]">
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-wider text-[#0A3D91]">Teste de Adaptação de 30 Dias</h4>
                    <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                      Sinta a resposta no cocho com risco zero! Você tem 30 dias de teste de adaptação. Se o gado não se adaptar, devolvemos 100% do seu valor investido.
                    </p>
                  </div>
                </div>

                {/* Frete Grátis */}
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#5E8C31]/8 text-[#5E8C31]">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-wider text-[#5E8C31]">Frete Grátis Direto na Fazenda</h4>
                    <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                      Logística simplificada sem dor de cabeça. Entregamos direto na porteira da sua propriedade rural com frete 100% gratuito e seguro total.
                    </p>
                  </div>
                </div>

                {/* Botão de Chamada para Ação */}
                <button
                  onClick={scrollToKits}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#F2B705] hover:bg-[#E0A700] px-6 py-5 text-sm font-black uppercase tracking-wider text-[#082B63] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-md shadow-[#F2B705]/20 hover:shadow-lg"
                >
                  <ShoppingCart size={18} /> Aproveitar Oferta na Fazenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: CALCULADORA DE ROI E RETORNO FINANCEIRO CORRIGIDO (R$ 247,90) */}
      <section className="bg-[#082B63] text-white py-24 border-y border-white/10 relative overflow-hidden">
        {/* Gradiantes decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#5E8C31] filter blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#F2B705] filter blur-[120px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#F2B705]">Retorno sobre o Investimento</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
              Análise de Custo-Benefício: O Investimento que se Paga e Sobra Lucro
            </h2>
            <p className="mt-4 text-lg font-semibold text-white/80">
              Veja em números claros como um custo diário irrisório se transforma em ganho líquido real no bolso do pecuarista.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Card 1: O Custo da Mistura */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F2B705]">1. CUSTO TOTAL DA MISTURA</span>
                <h3 className="text-2xl font-black mt-3 text-white">Mistura de Altíssimo Rendimento</h3>
                <p className="mt-4 text-sm font-medium text-white/70 leading-relaxed">
                  Misturando o Forte Gado Premium com sal comum (Cloreto de Sódio), você obtém 70 kg de suplemento mineral de alta performance.
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">Forte Gado Premium (20 kg):</span>
                    <span className="font-black text-white">R$ 247,90</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">2 Sacos de Sal Comum (50 kg):</span>
                    <span className="font-black text-white">R$ 50,00</span>
                  </li>
                  <li className="flex justify-between text-sm font-black border-t border-white/10 pt-3">
                    <span className="text-[#F2B705]">Custo para 70 kg de Mistura:</span>
                    <span className="text-[#F2B705]">R$ 297,90</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <div className="text-xs text-white/40 uppercase tracking-widest">Custo por Kg</div>
                <div className="text-3xl font-black text-white mt-1">R$ 4,25 / kg</div>
              </div>
            </div>

            {/* Card 2: Consumo Diário por Cabeça */}
            <div className="bg-[#5E8C31] rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(94,140,49,0.15)] relative">
              <div className="absolute top-4 right-4 rounded-full bg-white/20 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">
                Consumo Ideal
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-white/80">2. CONSUMO E CUSTO DIÁRIO</span>
                <h3 className="text-2xl font-black mt-3 text-white">Centavos por Cabeça ao Dia</h3>
                <p className="mt-4 text-sm font-medium text-white/90 leading-relaxed">
                  O consumo estimado é de apenas 100 gramas por animal ao dia. O desembolso diário para ter um rebanho saudável e em engorda acelerada é menor do que uma ligação telefônica.
                </p>
                <div className="mt-8 bg-white/10 border border-white/15 rounded-2xl p-5 text-center">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">CUSTO POR ANIMAL/DIA</span>
                  <span className="text-5xl font-black text-[#F2B705] tracking-tight block mt-1">R$ 0,43</span>
                  <span className="text-[11px] font-semibold text-white/80 block mt-1">para 100g de consumo diário</span>
                </div>
              </div>
              <div className="mt-8 text-center text-xs font-bold text-white/90">
                O produto se paga sozinho e sobra muito retorno.
              </div>
            </div>

            {/* Card 3: Ganho e Retorno sobre Investimento */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F2B705]">3. RETORNO SOBRE O INVESTIMENTO</span>
                <h3 className="text-2xl font-black mt-3 text-white">Ganho Diário Extra de Arroba</h3>
                <p className="mt-4 text-sm font-medium text-white/70 leading-relaxed">
                  Ganho estimado de peso de <strong>600g a 1.200g</strong> diários. Com o preço médio da arroba (@) em <strong>R$ 225,65</strong>, a matemática é avassaladora:
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <li className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-bold text-white block">Ganho Mínimo (600g):</span>
                      <span className="text-xs text-white/50">Equivale a 0,04@ por dia</span>
                    </div>
                    <span className="font-black text-[#5E8C31] text-base">+ R$ 9,03/dia</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
                    <div>
                      <span className="font-bold text-white block">Ganho Máximo (1.200g):</span>
                      <span className="text-xs text-white/50">Equivale a 0,08@ por dia</span>
                    </div>
                    <span className="font-black text-[#F2B705] text-base">+ R$ 18,05/dia</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block">Lucro Líquido Real</span>
                  <span className="text-lg font-black text-white">R$ 8,60 a R$ 17,62</span>
                </div>
                <span className="text-[10px] font-black uppercase bg-[#F2B705]/15 text-[#F2B705] px-2.5 py-1 rounded">
                  Até 41x o Retorno!
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div className="max-w-xl">
              <h4 className="text-lg font-black text-white">Simulação para 100 Cabeças de Gado:</h4>
              <p className="mt-1 text-sm font-semibold text-white/70">
                Com 100 cabeças mineralizadas, o produtor passa a obter de <strong className="text-[#F2B705]">R$ 860,00 a R$ 1.762,00</strong> de lucro líquido adicional por dia! O valor do suplemento se torna insignificante perto do ganho financeiro obtido.
              </p>
            </div>
            <button
              onClick={scrollToKits}
              className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F2B705] hover:bg-[#E0A700] px-8 py-4.5 text-sm font-black uppercase tracking-wider text-[#082B63] transition duration-300 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-[#F2B705]/15"
            >
              <ShoppingCart size={18} /> Ver Lotes Promocionais
            </button>
          </div>
        </div>
      </section>

      {c.sections.kits && (
        <section id="kits" className="section-shell py-24">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Kits de tratamento</span>
              <h2 className="mt-4 text-4xl font-black text-[#082B63] sm:text-5xl">Escolha o pacote ideal para seu rebanho.</h2>
            </div>
            <div className="rounded-lg bg-[#F2B705]/18 px-5 py-4 font-black text-[#082B63]">Lotes promocionais limitados para esta semana</div>
          </div>
          <div className={`mt-12 grid gap-8 ${
            c.kits.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : c.kits.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
              : c.kits.length === 3
              ? "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}>
            {c.kits.map((kit) => {
              const isExternalCta = kit.checkout && (kit.checkout.startsWith("http://") || kit.checkout.startsWith("https://"));
              const isExternalImageCta = kit.imageCtaLink && (kit.imageCtaLink.startsWith("http://") || kit.imageCtaLink.startsWith("https://"));
              
              // Resolve correct Whatsapp Link helper
              const cleanGlobalWhatsapp = c.hero.whatsapp ? c.hero.whatsapp.replace(/\D/g, "") : "";
              const defaultWhatsappUrl = c.hero.whatsappLink || `https://wa.me/${cleanGlobalWhatsapp}?text=${encodeURIComponent(`Olá, gostaria de falar com um especialista sobre o ${kit.name} de ${kit.bags}.`)}`;
              const finalImageCtaLink = kit.imageCtaLink || defaultWhatsappUrl;

              // Render button icon based on selection
              const renderButtonIcon = () => {
                switch (kit.buttonIcon) {
                  case "chart":
                    return <TrendingUp size={18} className="shrink-0" />;
                  case "package":
                    return <PackageCheck size={18} className="shrink-0" />;
                  case "shopping-cart":
                    return <ShoppingCart size={18} className="shrink-0" />;
                  default:
                    return null;
                }
              };

              return (
                <motion.article
                  key={kit.id}
                  whileHover={{ y: -10 }}
                  className={`h-full flex flex-col relative overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${
                    kit.highlighted 
                      ? "border-[#F2B705] ring-8 ring-[#F2B705]/5 scale-[1.03] shadow-[0_20px_50px_rgba(242,183,5,0.15)] z-10" 
                      : "border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_15px_35px_rgba(8,43,99,0.06)]"
                  }`}
                >
                  {/* Floating Badge at the top */}
                  {kit.badge && (
                    <div className={`absolute z-10 ${
                      kit.highlighted 
                        ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#F2B705] to-[#D99B00] text-[#082B63] px-5 py-2 text-[10px] font-black uppercase tracking-widest shadow-md border border-[#F2B705]/20 whitespace-nowrap" 
                        : kit.id === "kit-premium"
                        ? "top-4 right-4 rounded-full bg-[#082B63] px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-white shadow"
                        : "top-4 right-4 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-700 shadow"
                    }`}>
                      {kit.badge}
                    </div>
                  )}

                  {/* Modern full-width image container (optimized for square 600x600 images) */}
                  <div className={`relative aspect-square w-full overflow-hidden border-b border-slate-100/60 flex items-center justify-center ${
                    kit.highlighted ? "bg-[#FCF9F2] p-4 rounded-t-3xl" : "bg-slate-50 p-2"
                  }`}>
                    {kit.image ? (
                      <img 
                        src={kit.image} 
                        alt={kit.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-[#F2B705]">
                        <PackageCheck size={64} />
                      </div>
                    )}

                    {/* Overlay CTA on Image */}
                    {kit.imageCtaText && (
                      isExternalImageCta ? (
                        <a
                          href={finalImageCtaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#0A3D91] hover:bg-[#082B63] text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                          <Phone size={12} className="shrink-0" /> {kit.imageCtaText}
                        </a>
                      ) : (
                        <Link
                          href={finalImageCtaLink}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#0A3D91] hover:bg-[#082B63] text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                          <Phone size={12} className="shrink-0" /> {kit.imageCtaText}
                        </Link>
                      )
                    )}
                  </div>

                  {/* Card Content with Premium Styling */}
                  <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col">
                    
                    {/* Category badge / Pill ("Kit Teste" / "Kit Premium") */}
                    {kit.imageBadge && (
                      <div className={`w-fit mx-auto px-3.5 py-1 text-[10px] font-black rounded-full uppercase tracking-widest border mb-3 ${
                        kit.highlighted 
                          ? "bg-[#FAF5E6] border-[#F2B705]/20 text-[#D99B00]" 
                          : "bg-slate-100 border-slate-200 text-slate-500"
                      }`}>
                        {kit.imageBadge}
                      </div>
                    )}

                    {/* Title and Bags Qty */}
                    <div className="text-center min-h-[70px] flex flex-col justify-center">
                      <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight uppercase ${
                        kit.highlighted ? "text-[#D99B00]" : "text-[#082B63]"
                      }`}>
                        {kit.name}
                      </h3>
                      <p className="mt-1.5 text-xs font-black text-slate-400 tracking-wider uppercase leading-none">{kit.bags}</p>
                    </div>

                    {/* Block Trata */}
                    {kit.treatmentAnimals && (
                      <div className={`rounded-2xl p-4 mt-5 text-center flex flex-col justify-center transition duration-300 border ${
                        kit.highlighted ? "bg-[#FAF5E6] border-[#F2B705]/10" : "bg-[#F0F2F8] border-[#0A3D91]/5"
                      }`}>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Trata</span>
                        <span className={`text-2xl font-black mt-1 leading-none ${
                          kit.highlighted ? "text-[#D99B00]" : "text-[#082B63]"
                        }`}>
                          {kit.treatmentAnimals}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 mt-1 leading-none">
                          {kit.treatmentDays || "por 30 dias"}
                        </span>
                      </div>
                    )}

                    {/* Block Lucro Estimado */}
                    {kit.estimatedProfit && (
                      <div className="rounded-2xl bg-[#EDF5E7] border border-[#C2DCAC] p-4.5 mt-4 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-[#4C7327] text-xs sm:text-sm font-black leading-snug">
                          Lucro estimado: {kit.estimatedProfit}
                        </span>
                        {kit.roiText && (
                          <span className="text-[#4C7327]/80 text-[10px] font-bold mt-1 leading-none">
                            {kit.roiText}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Block Formas de Pagamento */}
                    {(kit.paymentInstallmentText || kit.installments) && (
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 mt-4 text-center flex flex-col items-center">
                        <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#0A3D91]/80 ${
                          kit.highlighted ? "text-[#D99B00]/80" : ""
                        }`}>
                          💳 Formas de Pagamento
                        </span>
                        <span className="text-xs sm:text-sm font-black text-[#D99B00] mt-1.5 leading-snug">
                          {kit.paymentInstallmentText || `${kit.installments} no cartão sem juros`}
                        </span>
                        <span className="text-slate-400 text-[10px] font-semibold mt-1 leading-none">
                          {kit.paymentCashText || `ou à vista por ${kit.price}`}
                        </span>
                      </div>
                    )}

                    {/* Features List with green checkmarks */}
                    {kit.features && kit.features.length > 0 && (
                      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-left">
                        {kit.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700 leading-tight">
                            <span className="text-emerald-500 font-black select-none shrink-0 text-sm">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA purchase button */}
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/kits/${kit.id}`}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4.5 font-black uppercase text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                          kit.highlighted 
                            ? "bg-[#F2B705] hover:bg-[#E0A700] text-[#082B63] gold-glow shadow-md hover:shadow-lg" 
                            : kit.id === "kit-teste"
                            ? "bg-white hover:bg-slate-50 text-[#082B63] border border-slate-200 hover:border-slate-300 shadow-sm"
                            : "bg-[#0A3D91] hover:bg-[#082B63] text-white shadow-md hover:shadow-lg"
                        }`}
                      >
                        {renderButtonIcon()}
                        {kit.buttonText || "Comprar"}
                      </Link>
                    </div>

                    {/* Subtext economy under button */}
                    {kit.buttonSubtext && (
                      <span className="text-center text-[10px] font-bold text-slate-400 mt-2.5 block leading-normal">
                        {kit.buttonSubtext}
                      </span>
                    )}

                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      {c.sections.videos && (
        <section className="bg-[#082B63] py-24 text-white">
          <div className="section-shell">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <span className="text-sm font-black uppercase tracking-[0.24em] text-[#F2B705]">Clientes reais em vídeo</span>
                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Quem compra há anos conta melhor que qualquer promessa.</h2>
                <p className="mt-5 text-lg font-semibold leading-8 text-white/78">
                  Use esta área para mostrar pecuaristas reais, rotina de fazenda, resultado no lote e confiança construída no campo.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-5 py-4 font-black text-[#F2B705]">
                <Play size={20} fill="currentColor" /> Prova social de alto impacto
              </div>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {c.videos.map((video) => {
                const embedUrl = getYoutubeEmbedUrl(video.url);
                return (
                  <article key={video.id} className="overflow-hidden rounded-lg border border-white/15 bg-white/10 premium-shadow">
                    <div className="aspect-video bg-black">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          className="h-full w-full"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <div className="grid h-full place-items-center p-6 text-center font-bold text-white/72">
                          Cadastre uma URL valida do YouTube no painel admin.
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-flex rounded-full bg-[#F2B705] px-3 py-2 text-xs font-black uppercase text-[#082B63]">{video.badge}</span>
                      <h3 className="mt-4 text-2xl font-black">{video.title}</h3>
                      <p className="mt-2 font-bold text-white/78">{video.client} | {video.location}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {c.sections.testimonials && (
        <section className="bg-white py-24">
          <div className="section-shell">
            <h2 className="text-4xl font-black text-[#082B63] sm:text-5xl">Pecuaristas que já elevaram o padrão.</h2>
            <div className="hide-scrollbar mt-12 flex snap-x gap-5 overflow-x-auto pb-4">
              {c.testimonials.map((item) => (
                <article key={item.id} className="min-w-[310px] snap-start rounded-lg border border-slate-200 bg-[#F8F9FA] p-6 premium-shadow sm:min-w-[390px]">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                    <div>
                      <h3 className="font-black text-[#082B63]">{item.name}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.location}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-1 text-[#F2B705]">
                    {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="mt-5 text-lg font-bold leading-8 text-slate-700">"{item.text}"</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.sections.guarantee && (
        <section className="section-shell py-20">
          <div className="grid overflow-hidden rounded-xl bg-[#082B63] lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex items-center justify-center bg-[#F2B705] p-10 text-[#082B63]">
              {c.guarantee?.image ? (
                <img
                  src={c.guarantee.image}
                  alt={c.guarantee?.title || "Garantia"}
                  className="max-h-[260px] sm:max-h-[320px] md:max-h-[360px] w-auto object-contain filter drop-shadow-xl transition-all duration-300 hover:scale-[1.03] rounded-2xl"
                />
              ) : (
                <LockKeyhole size={120} strokeWidth={1.4} />
              )}
            </div>
            <div className="p-8 text-white sm:p-12">
              <h2 className="text-4xl font-black sm:text-5xl">{c.guarantee?.title || "A MELHOR GARANTIA DO MERCADO: SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA"}</h2>
              <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/82">
                {c.guarantee?.text || "Experimente o Sal Mineral Forte Gado sem riscos! Se por qualquer motivo seus animais não se adaptarem ou se você não vir os resultados esperados, você tem 30 dias para devolver o produto. Pague apenas pelo que foi consumido na fazenda durante esse período."}
              </p>
            </div>
          </div>
        </section>
      )}

      {c.sections.faq && (
        <section className="section-shell py-24">
          <h2 className="text-4xl font-black text-[#082B63] sm:text-5xl">Perguntas frequentes</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {c.faqs.map((faq) => (
              <details key={faq.id} className="rounded-lg border border-slate-200 bg-white p-6 premium-shadow">
                <summary className="cursor-pointer text-lg font-black text-[#082B63]">{faq.question}</summary>
                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {c.sections.finalCta && (
        <section className="premium-gradient px-4 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <Leaf className="mx-auto mb-6 text-[#F2B705]" size={54} />
            <h2 className="text-balance text-5xl font-black leading-tight sm:text-7xl">ELEVE O NÍVEL DO SEU REBANHO</h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-semibold leading-8 text-white/84">
              Transforme mineralização em desempenho, confiança e lucro na fazenda.
            </p>
            <button
              onClick={scrollToKits}
              className="gold-glow mt-9 inline-flex items-center gap-3 rounded-md bg-[#F2B705] px-9 py-5 text-lg font-black uppercase text-[#082B63] transition hover:-translate-y-1 hover:bg-white"
            >
              <Truck size={22} /> Comprar agora
            </button>
          </div>
        </section>
      )}

      {/* FOOTER PREMIUM E DINÂMICO */}
      <footer className="bg-[#082B63] text-white border-t border-white/10 pt-16 pb-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10 pb-12 mb-10">
            {/* Coluna 1: Identidade da Marca */}
            <div className="space-y-5">
              {c.footer.logo ? (
                <img src={c.footer.logo} alt="Logo Fortegado" className="h-12 w-auto object-contain rounded" />
              ) : (
                <div className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-[#F2B705]">Fortegado</span>
                  <span className="text-xs uppercase bg-[#F2B705]/15 text-[#F2B705] px-2 py-1 rounded">Premium</span>
                </div>
              )}
              <p className="text-sm font-semibold leading-7 text-white/70">
                {c.footer.description || "Fortegado Premium é sinônimo de inovação e alta performance na nutrição animal. Apoiamos o produtor rural com tecnologia de ponta para potencializar a rentabilidade do rebanho."}
              </p>
              {/* Redes Sociais */}
              <div className="flex gap-3 pt-2">
                {[
                  [c.footer.instagram, Instagram, "Instagram"],
                  [c.footer.youtube, Youtube, "YouTube"],
                  [c.footer.facebook, Facebook, "Facebook"],
                  [c.footer.tiktok, TiktokIcon, "TikTok"]
                ].map(([url, Icon, label]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={String(label)}
                      href={String(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#F2B705] hover:text-[#082B63] hover:border-[#F2B705] transition duration-300"
                      title={String(label)}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Coluna 2: Menu 1 */}
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-[#F2B705] mb-6">
                {c.footer.linksCol1Title || "Institucional"}
              </h3>
              <ul className="space-y-4">
                {(c.footer.linksCol1 || "")
                  .split("\n")
                  .map(line => line.trim())
                  .filter(Boolean)
                  .map(line => {
                    const parts = line.split("|");
                    let label = parts[0]?.trim() || "";
                    let url = parts[1]?.trim() || "#";
                    if (url === "#politicas" || url === "#politica" || label.toLowerCase().includes("política") || label.toLowerCase().includes("politica")) {
                      url = "/politicas-de-privacidade";
                    }
                    return { label, url };
                  })
                  .map((link, idx) => (
                    <li key={`${link.label}-${idx}`}>
                      {link.url.startsWith("/") ? (
                        <Link href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Coluna 3: Menu 2 */}
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-[#F2B705] mb-6">
                {c.footer.linksCol2Title || "Oportunidades"}
              </h3>
              <ul className="space-y-4">
                {(c.footer.linksCol2 || "")
                  .split("\n")
                  .map(line => line.trim())
                  .filter(Boolean)
                  .map(line => {
                    const parts = line.split("|");
                    let label = parts[0]?.trim() || "";
                    let url = parts[1]?.trim() || "#";
                    if (url === "#politicas" || url === "#politica" || label.toLowerCase().includes("política") || label.toLowerCase().includes("politica")) {
                      url = "/politicas-de-privacidade";
                    }
                    return { label, url };
                  })
                  .map((link, idx) => (
                    <li key={`${link.label}-${idx}`}>
                      {link.url.startsWith("/") ? (
                        <Link href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Coluna 4: Contatos e Endereço */}
            <div className="space-y-5">
              <h3 className="text-base font-black uppercase tracking-wider text-[#F2B705] mb-6">
                Contato
              </h3>
              <ul className="space-y-4 text-sm font-semibold text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#F2B705] shrink-0 mt-1" />
                  <span>{c.footer.address || "Uberaba - MG"}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#F2B705] shrink-0" />
                  <a href={`tel:${c.footer.phone?.replace(/\D/g, '')}`} className="hover:text-[#F2B705] hover:underline transition">
                    {c.footer.phone || "(34) 99999-9999"}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#F2B705] shrink-0" />
                  <a href={`mailto:${c.footer.email}`} className="hover:text-[#F2B705] hover:underline transition">
                    {c.footer.email || "contato@fortegado.com.br"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra Inferior (Direitos Autorais) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs font-semibold text-white/50">
            <p>{c.footer.copyright || "© 2026 Fortegado. Todos os direitos reservados."}</p>
            <p className="flex items-center gap-1.5">
              Desenvolvido de forma premium para <a href="https://www.fortegado.com.br" className="hover:text-[#F2B705] hover:underline">fortegado.com.br</a>
            </p>
          </div>
        </div>
      </footer>
      <CookiesPopup onConsentChange={(consent) => setCookieConsent(consent)} />
    </main>
  );
}
