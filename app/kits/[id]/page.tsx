"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
  PackageCheck,
  TrendingUp,
  Truck,
  Phone,
  CalendarDays,
  LockKeyhole,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Scale,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useSiteContent } from "@/lib/useSiteContent";
import { injectTrackingScripts } from "@/lib/tracking";

export default function KitSalesPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { content: c, ready } = useSiteContent(true);

  useEffect(() => {
    if (ready && c.integrations) {
      injectTrackingScripts(c.integrations);
    }
  }, [ready, c.integrations]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F8F9FA] text-xl font-black text-[#082B63]">
        Carregando página do kit...
      </div>
    );
  }

  const kit = c.kits.find((k) => k.id === id);

  if (!kit) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 text-center text-[#082B63]">
        <ShieldCheck size={72} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-black">Ops! Kit não encontrado</h1>
        <p className="mt-2 text-slate-500 font-semibold max-w-md">O kit que você procura não está configurado ou foi removido.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A3D91] hover:bg-[#082B63] px-6 py-3 font-black text-white transition duration-200 shadow-md">
          <ArrowLeft size={18} /> Voltar para a página inicial
        </Link>
      </div>
    );
  }

  // Fallbacks robustos para garantir que funcione perfeitamente com todos os kits antigos ou novos
  const customHeadline = kit.customHeadline || `${kit.name} — ${kit.bags}`;
  const customSubheadline = kit.customSubheadline || kit.ideal;
  const paymentDownPayment = kit.paymentDownPayment || "R$ 0,00";
  const paymentFirstInstallmentDays = kit.paymentFirstInstallmentDays || "Imediato";
  const paymentInstallmentsDetail = kit.paymentInstallmentsDetail || kit.installments || kit.price;
  const paymentConditionBadge = kit.paymentConditionBadge || kit.badge || "OFERTA EXCLUSIVA";
  const paymentConditionsList = Array.isArray(kit.paymentConditionsList) && kit.paymentConditionsList.length > 0
    ? kit.paymentConditionsList
    : [
        "Primeira parcela facilitada",
        "Parcelamento sem juros ou desconto à vista",
        "Garantia de 30 dias inclusa",
        "Entrega segura diretamente na fazenda"
      ];
  
  const bonusTitle = kit.bonusTitle || "BÔNUS PRODUTOR RESPONSÁVEL";
  const bonusPercentage = kit.bonusPercentage || "5%";
  const bonusExampleText = kit.bonusExampleText || "Ganhe descontos especiais efetuando o pagamento da sua parcela em dia!";
  const bonusBenefits = Array.isArray(kit.bonusBenefits) && kit.bonusBenefits.length > 0
    ? kit.bonusBenefits
    : ["Economia de caixa", "Benefício contínuo", "Produtor parceiro"];

  const guaranteeDays = kit.guaranteeDays || "30 DIAS";
  const guaranteeDescription = kit.guaranteeDescription || c.guarantee?.text || "";

  const whatYouReceive = Array.isArray(kit.whatYouReceive) && kit.whatYouReceive.length > 0
    ? kit.whatYouReceive
    : [
        `${kit.bags} do Sal Mineral Fortegado Premium`,
        "Suporte prioritário e assessoria na primeira dosagem",
        "Entrega monitorada na sua porteira",
        "Acompanhamento técnico qualificado"
      ];

  const resultsExpected = Array.isArray(kit.resultsExpected) && kit.resultsExpected.length > 0
    ? kit.resultsExpected
    : [
        "Melhor aproveitamento da fibra pastagem",
        "Mais ganho de peso médio diário (GMD)",
        "Fortalecimento da imunidade do rebanho"
      ];

  const [herdSize, setHerdSize] = useState(100);
  const usageInstructions = kit.usageInstructions || "Misture em sal branco: 1 saco para cada 2 sacos de 25 kilos de sal branco.";
  const usageConsumption = kit.usageConsumption || "O consumo médio estimado de cada animal é de 70 a 100 gramas por dia, dependendo da carência de macro e micro minerais.";

  const brandVars = {
    "--premium-blue": c.colors.premiumBlue,
    "--gold": c.colors.gold,
    "--field-green": c.colors.fieldGreen,
    "--ice": c.colors.ice,
    "--deep-blue": c.colors.deepBlue
  } as CSSProperties;

  // WhatsApp Link Helper (Opcional por Kit ou fallback Global)
  let whatsappUrl = c.hero.whatsappLink || `https://wa.me/${c.hero.whatsapp}?text=${encodeURIComponent(`Olá, gostaria de falar com um especialista sobre o ${kit.name} de ${kit.bags}.`)}`;

  if (kit.kitWhatsApp) {
    const trimmed = kit.kitWhatsApp.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.includes("wa.me")) {
      whatsappUrl = trimmed;
    } else {
      // Se for apenas o número de telefone, remove caracteres não numéricos e formata
      const cleanPhone = trimmed.replace(/\D/g, "");
      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá, gostaria de falar com um especialista sobre o ${kit.name} de ${kit.bags}.`)}`;
    }
  }

  try {
    return (
      <main className="overflow-hidden bg-[var(--ice)] text-[#082B63] min-h-screen" style={brandVars}>
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-2.5 text-sm font-black hover:bg-slate-100 transition duration-200 text-[#082B63]">
            <ArrowLeft size={16} /> Voltar
          </Link>
          
          {c.hero.logo ? (
            <img src={c.hero.logo} alt="Logo Fortegado" className="h-10 w-auto object-contain" />
          ) : (
            <span className="text-lg font-black tracking-wider text-[#0A3D91]">FORTEGADO</span>
          )}

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100 transition duration-200 border border-emerald-200/40">
            <Phone size={14} className="shrink-0" /> Falar com Consultor
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#082B63] to-[#0A3D91] py-16 text-white overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2B705] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#082B63] shadow-md gold-glow">
                <Sparkles size={13} /> {paymentConditionBadge}
              </span>
              
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl leading-tight text-white uppercase text-balance">
                {customHeadline}
              </h1>
              
              <p className="text-base font-semibold leading-relaxed text-slate-100/90 max-w-2xl text-balance whitespace-pre-line">
                {customSubheadline}
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={kit.checkout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B705] px-8 py-5 text-base font-black uppercase text-[#082B63] transition duration-200 hover:bg-[#F2B705]/90 shadow-lg hover:shadow-xl active:scale-95 text-center gold-glow"
                >
                  Garantir Agora <ChevronRight size={20} />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-5 text-base font-black text-white transition duration-200 text-center"
                >
                  <Phone size={18} /> Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Right Media (Image Card) */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur shadow-2xl w-full max-w-md aspect-square"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white flex items-center justify-center">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="h-full w-full object-cover"
                  />
                  {kit.badge && (
                    <div className="absolute top-4 left-4 rounded-full bg-[#0A3D91] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md">
                      {kit.badge}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Payment & Agro-Credit Simulator */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="text-sm font-black uppercase tracking-widest text-[#5E8C31]">Simulação de Pagamento</span>
            <h2 className="text-3xl font-black text-[#082B63] tracking-tight">Condições Exclusivas de Parcelamento Agro</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-12 items-stretch">
            
            {/* Interactive simulator result box */}
            <div className="md:col-span-7 rounded-3xl bg-[#082B63] p-8 sm:p-10 text-white premium-shadow border border-[#0A3D91]/30 flex flex-col justify-between space-y-8 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#F2B705]/10 blur-3xl pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F2B705] bg-[#F2B705]/10 px-3 py-1.5 rounded-md border border-[#F2B705]/20">
                  Simulação Autorizada
                </span>
                <h3 className="text-2xl font-black mt-4 leading-tight">Valor Total do Kit</h3>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#F2B705] mt-2">{kit.price}</div>
              </div>

              {/* Simulated parameters list */}
              <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Entrada</span>
                  <div className="text-xl font-black text-white">{paymentDownPayment}</div>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Carência da 1ª Parcela</span>
                  <div className="text-xl font-black text-[#F2B705] flex items-center gap-1">
                    <CalendarDays size={16} /> {paymentFirstInstallmentDays}
                  </div>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Parcelamento</span>
                  <div className="text-xl font-black text-white">{paymentInstallmentsDetail}</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <a
                  href={kit.checkout}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F2B705] hover:bg-[#F2B705]/90 py-4.5 text-base font-black uppercase text-[#082B63] transition duration-200 shadow-md gold-glow active:scale-95"
                >
                  Aproveitar Condição Especial <ChevronRight size={18} />
                </a>
              </div>
            </div>

            {/* Vantagens das Condições Agro */}
            <div className="md:col-span-5 rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-center space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#082B63]/60 border-b border-slate-200/50 pb-2">
                Facilidades de Aquisição
              </h4>
              <ul className="space-y-4.5">
                {paymentConditionsList.map((condition, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 border border-emerald-100 text-[#5E8C31] text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm font-semibold text-[#082B63]/90">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Bônus Produtor Responsável */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-8 sm:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            
            {/* Stamp Icon */}
            <div className="shrink-0 grid h-24 w-24 place-items-center rounded-2xl bg-[#F2B705] text-[#082B63] shadow-lg gold-glow font-black text-3xl">
              {bonusPercentage}
            </div>

            <div className="space-y-4 text-center md:text-left flex-1">
              <h3 className="text-2xl font-black text-[#082B63] tracking-tight">{bonusTitle}</h3>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed max-w-xl">
                {bonusExampleText}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-2">
                {bonusBenefits.map((benefit, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-200/30">
                    ★ {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Você Recebe & Resultados */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* O que você recebe */}
            <div className="rounded-3xl border border-slate-200/60 p-8 sm:p-10 space-y-6">
              <h3 className="text-2xl font-black tracking-tight text-[#082B63] flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0A3D91]/10 text-[#0A3D91]">
                  <PackageCheck size={20} />
                </span>
                O que você recebe neste kit
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acompanha o seu pedido de nutrição</p>
              <ul className="space-y-4">
                {whatYouReceive.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <BadgeCheck size={20} className="text-[#0A3D91] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resultados Procurados */}
            <div className="rounded-3xl border border-slate-200/60 p-8 sm:p-10 space-y-6">
              <h3 className="text-2xl font-black tracking-tight text-[#082B63] flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#5E8C31]/10 text-[#5E8C31]">
                  <TrendingUp size={20} />
                </span>
                Resultados que o produtor procura
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metas de rendimento e conversão alimentar</p>
              <ul className="space-y-4">
                {resultsExpected.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <BadgeCheck size={20} className="text-[#5E8C31] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Modo de Uso e Calculadora de Rendimento */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-black uppercase tracking-widest text-[#5E8C31]">Guia Nutricional</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#082B63] tracking-tight">Modo de Uso & Calculadora de Rendimento</h2>
            <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto">Saiba exatamente como misturar o suplemento e simule o tempo de duração do cocho conforme o tamanho do seu lote.</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-stretch">
            
            {/* Bloco 1: Modo de Uso */}
            <div className="rounded-3xl bg-white border border-slate-200/60 p-8 sm:p-10 flex flex-col justify-between space-y-8 premium-shadow">
              <div className="space-y-6">
                <h3 className="text-2xl font-black tracking-tight text-[#082B63] flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#5E8C31]/10 text-[#5E8C31]">
                    <TrendingUp size={20} />
                  </span>
                  Instruções de Modo de Uso
                </h3>

                <div className="space-y-6 pt-2">
                  {/* Proporção */}
                  <div className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#5E8C31]/15 text-[#5E8C31] text-sm font-black">
                      1
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-[#082B63]">Como misturar o produto</h4>
                      <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                        {usageInstructions}
                      </p>
                    </div>
                  </div>

                  {/* Consumo */}
                  <div className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#5E8C31]/15 text-[#5E8C31] text-sm font-black">
                      2
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-[#082B63]">Consumo médio diário por animal</h4>
                      <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                        {usageConsumption}
                      </p>
                    </div>
                  </div>

                  {/* Dica */}
                  <div className="rounded-2xl bg-amber-50 border border-amber-200/40 p-4.5 text-xs font-semibold text-amber-800 flex gap-2.5 items-start">
                    <span className="text-base">💡</span>
                    <span><strong>Dica do Veterinário:</strong> Para obter o máximo aproveitamento, mantenha os cochos sempre limpos e protegidos da umidade da chuva. Água de qualidade deve estar sempre disponível próxima ao cocho.</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Bloco 2: Calculadora Dinâmica */}
            <div className="rounded-3xl bg-[#082B63] p-8 sm:p-10 text-white premium-shadow border border-[#0A3D91]/30 flex flex-col justify-between space-y-8 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#F2B705]/10 blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F2B705] bg-[#F2B705]/10 px-3 py-1.5 rounded-md border border-[#F2B705]/20">
                    Simulador Agro-Eficácia
                  </span>
                  <h3 className="text-2xl font-black mt-4 tracking-tight leading-tight">Rendimento de Tratamento do Kit</h3>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center text-sm font-black uppercase tracking-wider text-slate-200">
                    <span>Tamanho do seu Rebanho</span>
                    <span className="text-[#F2B705] text-lg font-black">{herdSize} Cabeças</span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={herdSize}
                    onChange={(e) => setHerdSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F2B705]"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    <span>10 cabeças</span>
                    <span>500 cabeças</span>
                  </div>
                </div>

                {/* Resultado do Simulador */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center border-b border-white/10 pb-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">Suplemento no Kit</span>
                      <div className="text-lg font-black text-white">{parseInt(kit.bags) || 30} Sacos ({(parseInt(kit.bags) || 30) * 25}kg)</div>
                    </div>
                    <div className="space-y-0.5 border-l border-white/10">
                      <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">Mineralizado Pronto</span>
                      <div className="text-lg font-black text-[#F2B705]">{(parseInt(kit.bags) || 30) * 75} kg misturado</div>
                    </div>
                  </div>

                  <div className="text-center pt-2 space-y-1">
                    <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">O cocho estará abastecido por</span>
                    <div className="text-3xl font-black text-[#F2B705] tracking-tight">
                      {Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85)) >= 30 ? (
                        <>
                          {Math.floor(Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85)) / 30)} {Math.floor(Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85)) / 30) === 1 ? 'Mês' : 'Meses'}{' '}
                          {Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85)) % 30 > 0 && (
                            <>e {Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85)) % 30} dias</>
                          )}
                        </>
                      ) : (
                        <>{Math.floor(((parseInt(kit.bags) || 30) * 75 * 1000) / (herdSize * 85))} Dias</>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-white/60 leading-normal max-w-xs mx-auto">Cálculo baseado em consumo diário médio de 85g da mistura final por animal.</p>
                  </div>
                </div>
              </div>

              <div className="text-xs font-black uppercase tracking-widest text-[#F2B705] flex items-center justify-center gap-1.5 bg-[#F2B705]/10 py-3 rounded-xl border border-[#F2B705]/20 text-center text-balance">
                🌾 Nutrição programada, sem cocho vazio!
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Garantia do Kit */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl bg-[#F2B705] p-8 sm:p-12 text-[#082B63] shadow-lg relative overflow-hidden flex flex-col sm:flex-row gap-8 items-center border border-amber-300">
            {/* Lock Shield checkmark */}
            <div className="shrink-0 grid h-20 w-20 place-items-center rounded-2xl bg-[#082B63] text-[#F2B705] shadow-md">
              <ShieldCheck size={40} />
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                GARANTIA FORTEGADO PREMIUM — {guaranteeDays}
              </h3>
              <p className="text-sm font-semibold leading-relaxed max-w-2xl text-[#082B63]/90">
                {guaranteeDescription}
              </p>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start text-xs font-black uppercase tracking-widest text-[#082B63]/80">
                <LockKeyhole size={14} /> Compra 100% Protegida e Assegurada
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Action CTA Block */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#5E8C31] bg-[#5E8C31]/10 px-4 py-1.5 rounded-full border border-[#5E8C31]/20">
            Estoque Promocional Limitado
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#082B63] tracking-tight">
            Pronto para ver o seu rebanho lucrar de verdade?
          </h2>
          <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Garanta agora o **{kit.name}** com as condições facilitadas de parcelamento. Faturamento agro, sem burocracia e com a garantia de 30 dias.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a
              href={kit.checkout}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0A3D91] hover:bg-[#082B63] px-8 py-5 text-base font-black uppercase text-white transition duration-200 shadow-md hover:shadow-lg active:scale-95 text-center"
            >
              Confirmar Meu Pedido <ChevronRight size={18} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-8 py-5 text-base font-black text-white transition duration-200 text-center shadow-md active:scale-95"
            >
              <Phone size={18} /> Chamar Consultor Técnico
            </a>
          </div>
        </div>
      </section>

      {/* Shared Global Footer */}
      <footer className="bg-[#082B63] text-white pt-20 pb-12 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 pb-16 border-b border-white/10">
            
            {/* Logo e desc */}
            <div className="space-y-6 lg:col-span-4">
              {c.footer.logo ? (
                <img src={c.footer.logo} alt="Logo" className="h-10 w-auto object-contain max-w-[140px]" />
              ) : (
                <span className="text-xl font-black tracking-widest text-[#F2B705]">FORTEGADO</span>
              )}
              <p className="text-sm font-semibold leading-7 text-white/70">
                {c.footer.description || "Fortegado Premium é sinônimo de inovação e alta performance na nutrição animal."}
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

            {/* Menu 1 */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#F2B705] mb-6">
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
                    if (url.startsWith("#")) url = `/${url}`;
                    return { label, url };
                  })
                  .map((link, idx) => (
                    <li key={`${link.label}-${idx}`}>
                      <a href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Menu 2 */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#F2B705] mb-6">
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
                    if (url.startsWith("#")) url = `/${url}`;
                    return { label, url };
                  })
                  .map((link, idx) => (
                    <li key={`${link.label}-${idx}`}>
                      <a href={link.url} className="text-sm font-semibold text-white/70 hover:text-[#F2B705] hover:underline transition">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Contatos */}
            <div className="space-y-5 lg:col-span-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#F2B705] mb-6">
                Contato
              </h3>
              <ul className="space-y-4 text-sm font-semibold text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#F2B705] shrink-0 mt-1" />
                  <span>{c.footer.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#F2B705] shrink-0" />
                  <a href={`tel:${c.footer.phone?.replace(/\D/g, '')}`} className="hover:text-[#F2B705] hover:underline transition">
                    {c.footer.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#F2B705] shrink-0" />
                  <a href={`mailto:${c.footer.email}`} className="hover:text-[#F2B705] hover:underline transition">
                    {c.footer.email}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 text-xs font-semibold text-white/40">
            <p>{c.footer.copyright || "© Fortegado Premium. Todos os direitos reservados."}</p>
            <div className="flex items-center gap-1.5">
              <Scale size={13} />
              <span>Nutrindo sua criação com força e confiança.</span>
            </div>
          </div>
        </div>
      </footer>

      </main>
    );
  } catch (err: any) {
    return (
      <div className="p-8 text-red-600 bg-red-50 min-h-screen font-mono">
        <h1 className="text-xl font-bold">Erro de Renderização (KitSalesPage):</h1>
        <p className="mt-2 text-sm">{err?.message || String(err)}</p>
        <pre className="mt-4 p-4 bg-white border border-red-200 rounded text-xs overflow-auto max-w-full">
          {err?.stack || "Sem stack trace disponível."}
        </pre>
      </div>
    );
  }
}
