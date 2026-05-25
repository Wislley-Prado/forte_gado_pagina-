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
  Music,
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
  { value: "30 dias", label: "para testar com tranquilidade e segurança" }
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

export default function Home() {
  const { content } = useSiteContent(true);
  const c = content || defaultContent;

  const [timeLeft, setTimeLeft] = useState("08:00:00");
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);

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
                href={c.hero.whatsappLink || `https://wa.me/${c.hero.whatsapp}`}
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
          <span className="inline-flex items-center gap-2 text-sm font-bold"><Clock3 size={16} /> Oferta expira em {timeLeft}</span>
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
          <div className="rounded-xl bg-[#082B63] p-6 flex flex-col justify-center min-h-[380px] overflow-hidden premium-shadow">
            {c.product.videoUrl && getYoutubeEmbedUrl(c.product.videoUrl) ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                <iframe
                  src={getYoutubeEmbedUrl(c.product.videoUrl)}
                  title={c.product.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <ProductBag compact imageUrl={c.hero.productImage} />
                {c.hero.productImage && c.hero.productImage.includes("photo-1625246333195-78d9c38ad449") && (
                  <div className="relative mt-8 h-48 w-full overflow-hidden rounded-lg border border-white/15">
                    <img src={c.hero.productImage} alt="Foto de apoio do produto Fortegado" className="h-full w-full object-cover opacity-85" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-[0.24em] text-[#5E8C31]">Sobre o produto</span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#082B63] sm:text-5xl">{c.product.title}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{c.product.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.product.differentials.map((item) => (
                <div key={item} className="rounded-lg border border-[#0A3D91]/10 bg-white p-5">
                  <Medal className="mb-3 text-[#F2B705]" />
                  <p className="font-bold leading-6 text-[#082B63]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {c.product.composition.map((item) => (
                <span key={item} className="rounded-full bg-[#0A3D91]/8 px-4 py-2 text-sm font-black text-[#0A3D91]">
                  {item}
                </span>
              ))}
            </div>
            {c.product.videoUrl && (
              <a
                href={c.product.videoUrl}
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#082B63] px-6 py-4 font-black uppercase text-white transition hover:bg-[#0A3D91]"
              >
                <Wheat size={20} className="text-[#F2B705]" /> Ver apresentação técnica
              </a>
            )}
          </div>
        </section>
      )}

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
            {c.kits.map((kit) => (
              <motion.article
                key={kit.id}
                whileHover={{ y: -8 }}
                className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(8,43,99,0.08)] ${kit.highlighted ? "border-[#F2B705] ring-4 ring-[#F2B705]/15 scale-[1.02]" : "border-slate-100"}`}
              >
                {/* Floating Badge at the top */}
                {kit.badge && (
                  <div className="absolute top-4 left-4 z-10 rounded-full bg-[#F2B705] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#082B63] shadow-md">
                    {kit.badge}
                  </div>
                )}

                {/* Pure White Image Container (Blends perfectly with white-background images!) */}
                <div className="relative h-56 bg-white flex items-center justify-center p-6">
                  {kit.image ? (
                    <img 
                      src={kit.image} 
                      alt={kit.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-transform duration-500 hover:scale-110" 
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-[#F2B705]">
                      <PackageCheck size={56} />
                    </div>
                  )}
                </div>

                {/* Card Content with Premium Styling */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/30">
                  <div className="min-h-[70px]">
                    <h3 className="text-xl font-black tracking-tight text-[#082B63] leading-tight">{kit.name}</h3>
                    <p className="mt-1.5 text-sm font-black text-[#5E8C31] tracking-wide uppercase">{kit.bags}</p>
                  </div>
                  
                  <p className="mt-3 min-h-[50px] text-xs font-semibold leading-relaxed text-slate-500">{kit.ideal}</p>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Condições de Pagamento</span>
                    
                    {kit.installments ? (
                      <>
                        <div className="text-3xl font-black tracking-tight text-[#0A3D91] mt-0.5">{kit.installments}</div>
                        <span className="text-xs text-slate-400 font-semibold mt-1">Ou à vista por {kit.price}</span>
                      </>
                    ) : (
                      <div className="text-3xl font-black tracking-tight text-[#0A3D91] mt-0.5">{kit.price}</div>
                    )}
                    
                    {kit.paymentPerk && (
                      <div className="text-xs font-bold text-[#5E8C31] mt-2 flex items-center gap-1.5">
                        <span>💳</span> {kit.paymentPerk}
                      </div>
                    )}

                    {kit.economy && (
                      <div className="mt-2.5 inline-block rounded-md bg-[#F2B705]/15 px-3 py-1.5 text-xs font-black text-[#082B63] w-fit">
                        🎉 {kit.economy}
                      </div>
                    )}
                  </div>

                  <a
                    href={kit.checkout}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-black uppercase text-sm tracking-wider text-white transition-all duration-300 ${kit.highlighted ? "bg-[#F2B705] hover:bg-[#E0A700] text-[#082B63] gold-glow" : "bg-[#0A3D91] hover:bg-[#082B63] shadow-md hover:shadow-lg"}`}
                  >
                    {kit.buttonText || "Comprar"} <ChevronRight size={18} />
                  </a>
                </div>
              </motion.article>
            ))}
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
                  className="max-h-[160px] w-auto object-contain filter drop-shadow-md rounded-lg"
                />
              ) : (
                <LockKeyhole size={120} strokeWidth={1.4} />
              )}
            </div>
            <div className="p-8 text-white sm:p-12">
              <h2 className="text-4xl font-black sm:text-5xl">{c.guarantee?.title || "30 DIAS OU SEU DINHEIRO DE VOLTA"}</h2>
              <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/82">
                {c.guarantee?.text || "Você compra com segurança, testa a experiência Fortegado Premium e conta com atendimento para orientar o melhor uso no seu manejo."}
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
                  [c.footer.tiktok, Music, "TikTok"]
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
