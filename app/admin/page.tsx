"use client";

import { ChangeEvent } from "react";
import {
  BadgeDollarSign,
  Eye,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  MessageSquareText,
  Paintbrush,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  ToggleLeft,
  Trash2,
  Video,
  PanelBottom,
  Code2,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { Kit, Testimonial, Faq, ClientVideo } from "@/lib/content";
import { useSiteContent } from "@/lib/useSiteContent";
import { uploadImageToSupabase } from "@/lib/supabaseContent";

function Field({
  label,
  value,
  onChange,
  textarea = false,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <label className="block w-full">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-semibold text-[#082B63] placeholder-slate-400 outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-semibold text-[#082B63] placeholder-slate-400 outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
        />
      )}
    </label>
  );
}

function ImageUploadField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadImageToSupabase(file).then((supabaseUrl) => {
      if (supabaseUrl) {
        onChange(supabaseUrl);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const format = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
              const quality = format === "image/jpeg" ? 0.82 : undefined;
              const compressedBase64 = canvas.toDataURL(format, quality);
              onChange(compressedBase64);
            } else {
              onChange(String(reader.result));
            }
          };
          img.onerror = () => {
            onChange(String(reader.result));
          };
          img.src = String(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const isBase64 = !!(value && value.startsWith("data:"));
  const displayValue = isBase64 ? "Imagem carregada (Arquivo Local)" : value;

  return (
    <div className="space-y-3 w-full">
      <label className="block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">{label}</span>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            readOnly={isBase64}
            value={displayValue}
            onChange={(event) => onChange(event.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-semibold text-[#082B63] placeholder-slate-400 outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
            placeholder="Cole o link da imagem ou clique em Upload..."
          />
          <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#0A3D91] hover:bg-[#082B63] px-5 py-3 text-sm font-black text-white transition duration-200 shadow-sm hover:shadow-md active:scale-95">
            <ImageIcon size={17} /> Upload
            <input type="file" accept="image/*" onChange={upload} className="hidden" />
          </label>
        </div>
      </label>
      {value && (
        <div className="relative inline-block mt-2 rounded-xl border border-slate-200 p-2 bg-slate-50 max-w-xs shadow-inner group">
          <img
            src={value}
            alt="Pré-visualização da imagem"
            className="h-32 w-auto object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-full bg-red-600 p-2 text-white opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-red-700 shadow-lg"
            title="Remover imagem"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { content, setContent, reset, ready, source, syncStatus } = useSiteContent();

  const clearCacheAndSync = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("fortegado-premium-content");
      window.location.reload();
    }
  };

  if (!ready) {
    return <div className="grid min-h-screen place-items-center bg-[#F8F9FA] text-xl font-black text-[#082B63]">Carregando painel...</div>;
  }

  const updateHero = (key: keyof typeof content.hero, value: string) =>
    setContent((current) => ({ ...current, hero: { ...current.hero, [key]: value } }));

  const updateProduct = (key: keyof typeof content.product, value: string | string[]) =>
    setContent((current) => ({ ...current, product: { ...current.product, [key]: value } }));

  const updateColor = (key: keyof typeof content.colors, value: string) =>
    setContent((current) => ({ ...current, colors: { ...current.colors, [key]: value } }));

  const updateFooter = (key: keyof typeof content.footer, value: string) =>
    setContent((current) => ({ ...current, footer: { ...current.footer, [key]: value } }));

  const updateGuarantee = (key: keyof typeof content.guarantee, value: string) =>
    setContent((current) => ({ ...current, guarantee: { ...current.guarantee, [key]: value } }));

  const updateIntegration = (key: keyof typeof content.integrations, value: string) =>
    setContent((current) => ({ ...current, integrations: { ...current.integrations, [key]: value } }));

  const updateKit = (index: number, patch: Partial<Kit>) =>
    setContent((current) => ({
      ...current,
      kits: current.kits.map((kit, i) => (i === index ? { ...kit, ...patch } : kit))
    }));

  const addKit = () =>
    setContent((current) => ({
      ...current,
      kits: [
        ...current.kits,
        {
          id: `kit-${Date.now()}`,
          name: "NOVO KIT",
          bags: "1 saco",
          ideal: "Descrição do novo pacote",
          price: "R$ 297",
          economy: "Economia destacada",
          badge: "PROMOÇÃO",
          checkout: "#comprar",
          image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=82",
          buttonText: "Comprar",
          installments: "12x de R$ 29,70",
          paymentPerk: "3 meses de carência no prazo"
        }
      ]
    }));

  const removeKit = (index: number) =>
    setContent((current) => ({ ...current, kits: current.kits.filter((_, i) => i !== index) }));

  const updateVideo = (index: number, patch: Partial<ClientVideo>) =>
    setContent((current) => ({
      ...current,
      videos: current.videos.map((item, i) => (i === index ? { ...item, ...patch } : item))
    }));

  const addVideo = () =>
    setContent((current) => ({
      ...current,
      videos: [
        ...current.videos,
        {
          id: `video-${Date.now()}`,
          title: "Novo vídeo de cliente",
          client: "Cliente Fortegado",
          location: "Cidade, UF",
          url: "https://www.youtube.com/watch?v=",
          badge: "Cliente real"
        }
      ]
    }));

  const removeVideo = (index: number) =>
    setContent((current) => ({ ...current, videos: current.videos.filter((_, i) => i !== index) }));

  const updateTestimonial = (index: number, patch: Partial<Testimonial>) =>
    setContent((current) => ({
      ...current,
      testimonials: current.testimonials.map((item, i) => (i === index ? { ...item, ...patch } : item))
    }));

  const addTestimonial = () =>
    setContent((current) => ({
      ...current,
      testimonials: [
        ...current.testimonials,
        {
          id: `dep-${Date.now()}`,
          name: "Novo pecuarista",
          location: "Cidade, UF",
          text: "Comentário do cliente.",
          rating: 5,
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
        }
      ]
    }));

  const removeTestimonial = (index: number) =>
    setContent((current) => ({ ...current, testimonials: current.testimonials.filter((_, i) => i !== index) }));

  const updateFaq = (index: number, patch: Partial<Faq>) =>
    setContent((current) => ({
      ...current,
      faqs: current.faqs.map((faq, i) => (i === index ? { ...faq, ...patch } : faq))
    }));

  const addFaq = () =>
    setContent((current) => ({
      ...current,
      faqs: [...current.faqs, { id: `faq-${Date.now()}`, question: "Nova pergunta", answer: "Nova resposta." }]
    }));

  const removeFaq = (index: number) =>
    setContent((current) => ({ ...current, faqs: current.faqs.filter((_, i) => i !== index) }));

  const setList = (event: ChangeEvent<HTMLTextAreaElement>, key: "composition" | "differentials") => {
    updateProduct(
      key,
      event.target.value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#082B63]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {content.hero.logo ? (
              <img src={content.hero.logo} alt="Logo" className="h-11 w-auto object-contain max-w-[120px] rounded" />
            ) : (
              <div className="grid h-11 w-11 place-items-center rounded-md bg-[#082B63] text-[#F2B705]">
                <LayoutDashboard />
              </div>
            )}
            <div>
              <h1 className="text-xl font-black">Admin Fortegado Premium</h1>
              <p className="text-sm font-semibold text-slate-500">Painel integrado para editar a página de vendas</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 font-black text-[#082B63]">
              <Eye size={18} /> Ver página
            </Link>
            <button className="inline-flex items-center gap-2 rounded-md bg-[#0A3D91] px-4 py-3 font-black text-white">
              <Save size={18} /> {syncStatus === "saving" ? "Salvando..." : "Salvamento automático"}
            </button>
            <span className={`inline-flex items-center rounded-md px-4 py-3 text-sm font-black ${source === "supabase" && syncStatus !== "error" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {source === "supabase" && syncStatus !== "error" ? "Supabase conectado" : "Modo local"}
            </span>
            <button onClick={clearCacheAndSync} className="inline-flex items-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 px-4 py-3 font-black text-white transition duration-200 hover:shadow-md">
              <RefreshCw size={18} /> Limpar Cache do Navegador
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-4 py-3 font-black text-[#082B63]">
              <RotateCcw size={18} /> Restaurar
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-[90px] h-fit rounded-2xl bg-gradient-to-b from-[#082B63] to-[#0A3D91] p-6 text-white premium-shadow border border-[#0A3D91]/20">
          {[
            ["Hero e banners", ImageIcon],
            ["Cores e marca", Paintbrush],
            ["Produto", Settings2],
            ["Kits", BadgeDollarSign],
            ["Vídeos", Video],
            ["Depoimentos", MessageSquareText],
            ["FAQ", ListChecks],
            ["Seções", ToggleLeft],
            ["Garantia", ShieldCheck],
            ["Rodapé", PanelBottom],
            ["Integrações", Code2]
          ].map(([label, Icon]) => (
            <a key={String(label)} href={`#${String(label).toLowerCase().replaceAll(" ", "-")}`} className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-white/80 hover:bg-white/10 hover:text-white transition duration-200">
              <Icon size={18} className="text-[#F2B705]" /> {String(label)}
            </a>
          ))}
        </aside>

        <div className="flex flex-col gap-8 w-full min-w-0">
          {/* Card de Ajuda: Guia de Tamanhos de Imagens */}
          <details className="group rounded-lg border border-amber-200 bg-amber-50/50 p-5 premium-shadow overflow-hidden transition-all duration-300">
            <summary className="flex cursor-pointer items-center justify-between font-black text-[#082B63] list-none select-none">
              <div className="flex items-center gap-2">
                <span className="text-xl">ℹ️</span>
                <span className="text-lg">Guia de Tamanhos e Formatos de Imagem</span>
              </div>
              <span className="text-[#082B63] transition group-open:rotate-180 duration-200">▼</span>
            </summary>
            
            <div className="mt-5 space-y-4 border-t border-amber-200/50 pt-4 text-sm font-semibold text-slate-700">
              <p>Prepare suas fotos antes do upload para garantir a melhor qualidade e carregamento ultra-rápido no site:</p>
              
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-[#082B63] font-black border-b border-slate-200">
                      <th className="p-3">Campo no Admin</th>
                      <th className="p-3">Tamanho Rec.</th>
                      <th className="p-3">Formato</th>
                      <th className="p-3">Dica de Ouro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-[#082B63]">Logomarca (Logo)</td>
                      <td className="p-3">400 x 100 px</td>
                      <td className="p-3">PNG (Sem fundo)</td>
                      <td className="p-3 text-slate-500">O fundo transparente impede caixas brancas feias no site.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-[#082B63]">Ícone (Favicon)</td>
                      <td className="p-3">192 x 192 px</td>
                      <td className="p-3">PNG (Sem fundo)</td>
                      <td className="p-3 text-slate-500">Ícone da aba do navegador. Use apenas o símbolo da marca.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-[#082B63]">Banner Principal</td>
                      <td className="p-3">1920 x 1080 px</td>
                      <td className="p-3">JPG / WEBP</td>
                      <td className="p-3 text-slate-500">Imagens de pastagem mais escuras destacam os textos brancos.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-[#082B63]">Imagem do Produto</td>
                      <td className="p-3">800 x 1200 px</td>
                      <td className="p-3">PNG (Sem fundo)</td>
                      <td className="p-3 text-slate-500">Fundamental ser transparente para "flutuar" no topo azul.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-[#082B63]">Imagem dos Kits</td>
                      <td className="p-3">600 x 600 px</td>
                      <td className="p-3">PNG ou JPG</td>
                      <td className="p-3 text-slate-500">Tamanho quadrado deixa a vitrine simétrica e elegante.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#082B63]">Pecuarista (Depoimento)</td>
                      <td className="p-3">300 x 300 px</td>
                      <td className="p-3">JPG / PNG</td>
                      <td className="p-3 text-slate-500">Centralize o rosto, pois o site cortará a foto em círculo.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-amber-800">⚡ <strong>Nota:</strong> O painel administrativo possui compressão inteligente automática para reduzir fotos grandes sem perder nitidez!</p>
            </div>
          </details>

          <section id="hero-e-banners" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>🖼️</span> Hero, banners e links
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Headline" value={content.hero.headline} onChange={(value) => updateHero("headline", value)} />
              <Field label="Texto do botão" value={content.hero.cta} onChange={(value) => updateHero("cta", value)} />
              <Field label="Subheadline" value={content.hero.subheadline} onChange={(value) => updateHero("subheadline", value)} textarea />
              <ImageUploadField label="Logomarca da Página (Logo)" value={content.hero.logo || ""} onChange={(value) => updateHero("logo", value)} />
              <ImageUploadField label="Ícone do Navegador (Favicon)" value={content.hero.favicon || ""} onChange={(value) => updateHero("favicon", value)} />
              <ImageUploadField label="Banner principal URL" value={content.hero.banner} onChange={(value) => updateHero("banner", value)} />
              <ImageUploadField label="Imagem do produto URL" value={content.hero.productImage} onChange={(value) => updateHero("productImage", value)} />
              <Field label="Texto do segundo botão (Suporte)" value={content.hero.whatsappText || "Falar com especialista"} onChange={(value) => updateHero("whatsappText", value)} />
              <Field label="Link do segundo botão (URL completo ou WhatsApp)" value={content.hero.whatsappLink || ""} onChange={(value) => updateHero("whatsappLink", value)} />
              <Field label="Número do WhatsApp (apenas números, fallback)" value={content.hero.whatsapp} onChange={(value) => updateHero("whatsapp", value)} />
              <Field label="Link checkout padrão" value={content.hero.checkout} onChange={(value) => updateHero("checkout", value)} />
              <Field label="Redline / promoção" value={content.hero.promo} onChange={(value) => updateHero("promo", value)} />
            </div>
          </section>

          <section id="cores-e-marca" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>🎨</span> Cores da marca
            </h2>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {Object.entries(content.colors).map(([key, value]) => (
                <Field key={key} label={key} value={value} type="color" onChange={(next) => updateColor(key as keyof typeof content.colors, next)} />
              ))}
            </div>
          </section>

          <section id="produto" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>📦</span> Sobre o produto
            </h2>
            <div className="grid gap-6">
              <Field label="Título" value={content.product.title} onChange={(value) => updateProduct("title", value)} />
              <Field label="Texto persuasivo" value={content.product.description} onChange={(value) => updateProduct("description", value)} textarea />
              <Field label="Vídeo URL" value={content.product.videoUrl} onChange={(value) => updateProduct("videoUrl", value)} />

              {/* Comparação Antes e Depois */}
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-6 mt-2">
                <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                  <span>📊</span> Comparação Antes e Depois (Transformação)
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Field label="Texto do Antes" value={content.product.beforeText || ""} onChange={(value) => updateProduct("beforeText", value)} textarea />
                    <ImageUploadField label="Imagem do Antes (Upload ou Link)" value={content.product.beforeImage || ""} onChange={(value) => updateProduct("beforeImage", value)} />
                  </div>
                  <div className="space-y-4">
                    <Field label="Texto do Depois" value={content.product.afterText || ""} onChange={(value) => updateProduct("afterText", value)} textarea />
                    <ImageUploadField label="Imagem do Depois (Upload ou Link)" value={content.product.afterImage || ""} onChange={(value) => updateProduct("afterImage", value)} />
                  </div>
                </div>
              </div>

              <label className="block w-full">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Composição, um item por linha</span>
                <textarea
                  value={content.product.composition.join("\n")}
                  onChange={(event) => setList(event, "composition")}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 font-semibold text-[#082B63] outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
                />
              </label>
              <label className="block w-full">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Diferenciais, um item por linha</span>
                <textarea
                  value={content.product.differentials.join("\n")}
                  onChange={(event) => setList(event, "differentials")}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 font-semibold text-[#082B63] outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
                />
              </label>
            </div>
          </section>

          <section id="kits" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#082B63] flex items-center gap-2">
                  <span>📦</span> Painel de kits
                </h2>
                <p className="text-xs font-semibold text-slate-400 mt-1">Gerencie os pacotes de suplementos exibidos na página</p>
              </div>
              <button onClick={addKit} className="inline-flex items-center gap-2 rounded-xl bg-[#F2B705] hover:bg-[#F2B705]/90 px-5 py-3 font-black text-[#082B63] transition hover:shadow-md duration-200 active:scale-95 shrink-0">
                <Plus size={18} /> Adicionar kit
              </button>
            </div>
            <div className="flex flex-col gap-8 w-full">
              {content.kits.map((kit, index) => (
                <article key={kit.id} className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/25 flex flex-col gap-6">
                  {/* Header do Kit */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <h3 className="text-xl font-black text-[#082B63]">{kit.name || "NOVO KIT"}</h3>
                        <p className="text-xs font-semibold text-slate-400">ID: {kit.id}</p>
                      </div>
                    </div>
                    <button onClick={() => removeKit(index)} className="rounded-xl bg-red-50 hover:bg-red-100 px-4 py-2.5 text-red-600 transition hover:shadow-sm duration-200 active:scale-95 flex items-center gap-1.5 text-xs font-black" title="Remover Kit">
                      <Trash2 size={16} /> Excluir Kit
                    </button>
                  </div>

                  {/* Formulário Organizado */}
                  <div className="flex flex-col gap-6">
                    {/* Bloco 1: Informações de Identificação */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <Field label="Nome do Kit" value={kit.name} onChange={(value) => updateKit(index, { name: value })} />
                      <Field label="Quantidade (Ex: 5 sacos)" value={kit.bags} onChange={(value) => updateKit(index, { bags: value })} />
                      <label className="flex items-center gap-3 rounded-xl bg-slate-50/60 border border-slate-200 hover:bg-slate-50 transition duration-200 p-4 font-black text-sm text-[#082B63] self-end h-[50px] cursor-pointer w-full">
                        <input type="checkbox" checked={Boolean(kit.highlighted)} onChange={(event) => updateKit(index, { highlighted: event.target.checked })} className="h-5 w-5 rounded border-slate-300 text-[#0A3D91] focus:ring-[#0A3D91] transition cursor-pointer" />
                        Destacar como Kit Principal
                      </label>
                    </div>

                    {/* Bloco 2: Valores, Parcelamentos e Condições (Comercial) */}
                    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-5">
                      <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                        <span>💰</span> Condições Comerciais e Preço
                      </h4>
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <Field label="Preço (Ex: R$ 297)" value={kit.price} onChange={(value) => updateKit(index, { price: value })} />
                        <Field label="Parcelas (Ex: 10x de R$ 30)" value={kit.installments || ""} onChange={(value) => updateKit(index, { installments: value })} />
                        <Field label="Desconto / Economia (Ex: R$ 50 OFF)" value={kit.economy} onChange={(value) => updateKit(index, { economy: value })} />
                        <Field label="Prazo / Condição (Ex: 3 meses p/ pagar)" value={kit.paymentPerk || ""} onChange={(value) => updateKit(index, { paymentPerk: value })} />
                      </div>
                    </div>

                    {/* Bloco 3: Botões e Selos */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <Field label="Texto do Botão" value={kit.buttonText || "Comprar"} onChange={(value) => updateKit(index, { buttonText: value })} />
                      <Field label="Link do Botão (Checkout/URL)" value={kit.checkout} onChange={(value) => updateKit(index, { checkout: value })} />
                      <Field label="Selo do Kit (Ex: MAIS VENDIDO)" value={kit.badge} onChange={(value) => updateKit(index, { badge: value })} />
                    </div>

                    {/* Bloco 4: Mídia e Descrição (Full Width / Maior Espaço) */}
                    <div className="grid gap-6 lg:grid-cols-2 border-t border-slate-100 pt-6">
                      <ImageUploadField label="Imagem do Kit (Upload ou Link)" value={kit.image || ""} onChange={(value) => updateKit(index, { image: value })} />
                      <Field label="Descrição Curta (Ideal para...)" value={kit.ideal} onChange={(value) => updateKit(index, { ideal: value })} textarea />
                    </div>

                    {/* Bloco 5: Página de Vendas Dinâmica do Kit */}
                    <details className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 mt-2">
                      <summary className="cursor-pointer text-xs font-black text-[#082B63] uppercase tracking-widest flex items-center justify-between pb-2 border-b border-slate-200/50 select-none">
                        <span className="flex items-center gap-1.5">📢 Configurar Página de Vendas do Kit</span>
                        <span className="text-slate-400">Clique para abrir/fechar</span>
                      </summary>
                      <div className="grid gap-5 pt-4">
                        <div className="grid gap-5 sm:grid-cols-3">
                          <Field label="Título / Headline Exclusivo" value={kit.customHeadline || ""} onChange={(value) => updateKit(index, { customHeadline: value })} />
                          <Field label="Selo Simulação Ex (Ex: CONDIÇÃO ESPECIAL)" value={kit.paymentConditionBadge || ""} onChange={(value) => updateKit(index, { paymentConditionBadge: value })} />
                          <Field label="WhatsApp / Link Exclusivo do Kit (Opcional)" value={kit.kitWhatsApp || ""} onChange={(value) => updateKit(index, { kitWhatsApp: value })} />
                        </div>
                        <Field label="Descrição Persuasiva / Subheadline" value={kit.customSubheadline || ""} onChange={(value) => updateKit(index, { customSubheadline: value })} textarea />
                        
                        <div className="grid gap-5 sm:grid-cols-3">
                          <Field label="Entrada Simulação (Ex: R$ 0,00)" value={kit.paymentDownPayment || ""} onChange={(value) => updateKit(index, { paymentDownPayment: value })} />
                          <Field label="Primeira Parcela Simulação (Ex: 90 dias)" value={kit.paymentFirstInstallmentDays || ""} onChange={(value) => updateKit(index, { paymentFirstInstallmentDays: value })} />
                          <Field label="Parcelamento Simulação (Ex: 6x de R$ 1.245,00 SEM JUROS)" value={kit.paymentInstallmentsDetail || ""} onChange={(value) => updateKit(index, { paymentInstallmentsDetail: value })} />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block w-full">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Condições de Pagamento (Uma por linha)</span>
                            <textarea
                              value={(kit.paymentConditionsList || []).join("\n")}
                              onChange={(event) => updateKit(index, { paymentConditionsList: event.target.value.split("\n").map(l => l.trim()).filter(Boolean) })}
                              rows={4}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-[#082B63] outline-none transition focus:border-[#0A3D91]"
                            />
                          </label>
                          <label className="block w-full">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">O Que Recebe no Kit (Uma por linha)</span>
                            <textarea
                              value={(kit.whatYouReceive || []).join("\n")}
                              onChange={(event) => updateKit(index, { whatYouReceive: event.target.value.split("\n").map(l => l.trim()).filter(Boolean) })}
                              rows={4}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-[#082B63] outline-none transition focus:border-[#0A3D91]"
                            />
                          </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 border-t border-slate-200/50 pt-5">
                          <div className="space-y-4">
                            <h5 className="text-xs font-black text-[#082B63]/70 uppercase tracking-wider">Configuração de Bônus</h5>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field label="Título Bônus (Ex: BÔNUS PRODUTOR RESPONSÁVEL)" value={kit.bonusTitle || ""} onChange={(value) => updateKit(index, { bonusTitle: value })} />
                              <Field label="Porcentagem Bônus (Ex: 5%)" value={kit.bonusPercentage || ""} onChange={(value) => updateKit(index, { bonusPercentage: value })} />
                            </div>
                            <Field label="Exemplo Bônus (Ex: Parcela R$ 1245 pagando em dia...)" value={kit.bonusExampleText || ""} onChange={(value) => updateKit(index, { bonusExampleText: value })} textarea />
                            <label className="block w-full">
                              <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Vantagens do Bônus (Uma por linha)</span>
                              <textarea
                                value={(kit.bonusBenefits || []).join("\n")}
                                onChange={(event) => updateKit(index, { bonusBenefits: event.target.value.split("\n").map(l => l.trim()).filter(Boolean) })}
                                rows={3}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-[#082B63] outline-none transition focus:border-[#0A3D91]"
                              />
                            </label>
                          </div>

                          <div className="space-y-4">
                            <h5 className="text-xs font-black text-[#082B63]/70 uppercase tracking-wider">Garantia & Resultados</h5>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field label="Dias Garantia (Ex: 30 DIAS)" value={kit.guaranteeDays || ""} onChange={(value) => updateKit(index, { guaranteeDays: value })} />
                            </div>
                            <Field label="Descrição Garantia Exclusiva" value={kit.guaranteeDescription || ""} onChange={(value) => updateKit(index, { guaranteeDescription: value })} textarea />
                            <label className="block w-full">
                              <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Resultados Esperados (Uma por linha)</span>
                              <textarea
                                value={(kit.resultsExpected || []).join("\n")}
                                onChange={(event) => updateKit(index, { resultsExpected: event.target.value.split("\n").map(l => l.trim()).filter(Boolean) })}
                                rows={3}
                              />
                            </label>
                          </div>

                          <div className="sm:col-span-2 space-y-4 border-t border-slate-200/50 pt-5">
                            <h5 className="text-xs font-black text-[#082B63]/70 uppercase tracking-wider">Modo de Uso e Consumo</h5>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label="Modo de Uso — Instruções (Ex: Misture em sal branco 1 saco...)" value={kit.usageInstructions || ""} onChange={(value) => updateKit(index, { usageInstructions: value })} textarea />
                              <Field label="Consumo Estimado (Ex: Média de 70 a 100g por dia...)" value={kit.usageConsumption || ""} onChange={(value) => updateKit(index, { usageConsumption: value })} textarea />
                            </div>
                          </div>

                        </div>

                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="vídeos" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#082B63] flex items-center gap-2">
                  <span>🎥</span> Vídeos de clientes
                </h2>
                <p className="mt-2 text-xs font-semibold text-slate-400">Cole URLs do YouTube (watch, youtu.be, embed). O player resolve automaticamente.</p>
              </div>
              <button onClick={addVideo} className="inline-flex items-center gap-2 rounded-xl bg-[#082B63] hover:bg-[#0A3D91] px-5 py-3 font-black text-white transition hover:shadow-md duration-200 active:scale-95 shrink-0">
                <Plus size={18} /> Adicionar vídeo
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {content.videos.map((video, index) => (
                <article key={video.id} className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-[#082B63]">{video.title || "Novo Vídeo"}</h3>
                    <button onClick={() => removeVideo(index)} className="rounded-xl bg-red-50 hover:bg-red-100 px-3 py-2 text-red-600 transition duration-200 flex items-center gap-1 text-xs font-black" title="Remover vídeo">
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Título do vídeo" value={video.title} onChange={(value) => updateVideo(index, { title: value })} />
                    <Field label="Cliente" value={video.client} onChange={(value) => updateVideo(index, { client: value })} />
                    <Field label="Localização" value={video.location} onChange={(value) => updateVideo(index, { location: value })} />
                    <Field label="Selo/badge" value={video.badge} onChange={(value) => updateVideo(index, { badge: value })} />
                    <div className="sm:col-span-2">
                      <Field label="URL do YouTube" value={video.url} onChange={(value) => updateVideo(index, { url: value })} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="depoimentos" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#082B63] flex items-center gap-2">
                  <span>💬</span> Depoimentos de clientes
                </h2>
                <p className="mt-2 text-xs font-semibold text-slate-400">Gerencie as avaliações e opiniões dos pecuaristas.</p>
              </div>
              <button onClick={addTestimonial} className="inline-flex items-center gap-2 rounded-xl bg-[#0A3D91] hover:bg-[#082B63] px-5 py-3 font-black text-white transition hover:shadow-md duration-200 active:scale-95 shrink-0">
                <Plus size={18} /> Adicionar depoimento
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {content.testimonials.map((item, index) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-[#082B63]">{item.name || "Novo Pecuarista"}</h3>
                    <button onClick={() => removeTestimonial(index)} className="rounded-xl bg-red-50 hover:bg-red-100 px-3 py-2 text-red-600 transition duration-200 flex items-center gap-1 text-xs font-black" title="Remover depoimento">
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Nome" value={item.name} onChange={(value) => updateTestimonial(index, { name: value })} />
                    <Field label="Local" value={item.location} onChange={(value) => updateTestimonial(index, { location: value })} />
                    <Field label="Estrelas (1 a 5)" value={String(item.rating)} type="number" onChange={(value) => updateTestimonial(index, { rating: Number(value) })} />
                    <div className="sm:col-span-3 grid gap-5 lg:grid-cols-2 border-t border-slate-100 pt-5">
                      <ImageUploadField label="Foto do Pecuarista (Upload ou Link)" value={item.image} onChange={(value) => updateTestimonial(index, { image: value })} />
                      <Field label="Comentário" value={item.text} onChange={(value) => updateTestimonial(index, { text: value })} textarea />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#082B63] flex items-center gap-2">
                  <span>❓</span> FAQ - Dúvidas Frequentes
                </h2>
                <p className="mt-2 text-xs font-semibold text-slate-400">Edite as perguntas e respostas que aparecem no final da página.</p>
              </div>
              <button onClick={addFaq} className="inline-flex items-center gap-2 rounded-xl bg-[#5E8C31] hover:bg-[#5E8C31]/90 px-5 py-3 font-black text-white transition hover:shadow-md duration-200 active:scale-95 shrink-0">
                <Plus size={18} /> Adicionar pergunta
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {content.faqs.map((faq, index) => (
                <article key={faq.id} className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-[#082B63]">{faq.question || "Nova Pergunta"}</h3>
                    <button onClick={() => removeFaq(index)} className="rounded-xl bg-red-50 hover:bg-red-100 px-3 py-2 text-red-600 transition duration-200 flex items-center gap-1 text-xs font-black" title="Remover FAQ">
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                  <div className="grid gap-5">
                    <Field label="Pergunta" value={faq.question} onChange={(value) => updateFaq(index, { question: value })} />
                    <Field label="Resposta" value={faq.answer} onChange={(value) => updateFaq(index, { answer: value })} textarea />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="seções" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>🎛️</span> Ativar ou desativar seções
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(content.sections).map(([key, enabled]) => (
                <label key={key} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/50 p-5 font-black text-sm text-[#082B63] cursor-pointer transition">
                  <span className="capitalize">{key}</span>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        sections: { ...current.sections, [key]: event.target.checked }
                      }))
                    }
                    className="h-5 w-5 rounded border-slate-300 text-[#0A3D91] focus:ring-[#0A3D91] cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </section>

          <section id="garantia" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>🛡️</span> Selo e Garantia de Vendas (Bloco Amarelo)
            </h2>
            <p className="mb-6 text-xs font-semibold text-slate-400">Edite as informações exibidas no bloco de garantia. Você tem total liberdade para alterar o título, a descrição e fazer upload de uma imagem personalizada para o bloco amarelo esquerdo (caso prefira substituir o cadeado padrão). Se deixar a imagem em branco, o cadeado clássico voltará a aparecer automaticamente.</p>
            <div className="grid gap-6">
              <Field label="Título da Garantia" value={content.guarantee?.title || ""} onChange={(value) => updateGuarantee("title", value)} />
              <Field label="Descrição da Garantia" value={content.guarantee?.text || ""} onChange={(value) => updateGuarantee("text", value)} textarea />
              <ImageUploadField label="Imagem do Bloco Amarelo (Upload ou Link - Substitui o cadeado)" value={content.guarantee?.image || ""} onChange={(value) => updateGuarantee("image", value)} />
            </div>
          </section>

          <section id="rodapé" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>👇</span> Rodapé da Página
            </h2>
            <div className="grid gap-6">
              {/* Bloco 1: Informações da Marca */}
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-5">
                <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                  <span>🏢</span> Identidade e Descrição
                </h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <ImageUploadField label="Logomarca do Rodapé (Upload ou Link)" value={content.footer.logo || ""} onChange={(value) => updateFooter("logo", value)} />
                  <Field label="Descrição Institucional" value={content.footer.description || ""} onChange={(value) => updateFooter("description", value)} textarea />
                </div>
              </div>

              {/* Bloco 2: Contatos e Endereço */}
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-5">
                <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                  <span>📞</span> Contatos e Endereço
                </h4>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Endereço Comercial" value={content.footer.address || ""} onChange={(value) => updateFooter("address", value)} />
                  <Field label="Telefone de Contato" value={content.footer.phone || ""} onChange={(value) => updateFooter("phone", value)} />
                  <Field label="E-mail de Suporte" value={content.footer.email || ""} onChange={(value) => updateFooter("email", value)} />
                </div>
              </div>

              {/* Bloco 3: Redes Sociais */}
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-5">
                <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                  <span>📱</span> Redes Sociais
                </h4>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="Link do Instagram" value={content.footer.instagram || ""} onChange={(value) => updateFooter("instagram", value)} />
                  <Field label="Link do YouTube" value={content.footer.youtube || ""} onChange={(value) => updateFooter("youtube", value)} />
                  <Field label="Link do Facebook" value={content.footer.facebook || ""} onChange={(value) => updateFooter("facebook", value)} />
                  <Field label="Link do TikTok" value={content.footer.tiktok || ""} onChange={(value) => updateFooter("tiktok", value)} />
                </div>
              </div>

              {/* Bloco 4: Links Personalizados (Criativo!) */}
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/60 space-y-5">
                <h4 className="text-xs font-black text-[#082B63]/60 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200/50 pb-2">
                  <span>🔗</span> Menus e Links Personalizados (Um por linha: Rótulo | URL)
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Field label="Título do Menu 1" value={content.footer.linksCol1Title || ""} onChange={(value) => updateFooter("linksCol1Title", value)} />
                    <label className="block w-full">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Links do Menu 1</span>
                      <textarea
                        value={content.footer.linksCol1 || ""}
                        onChange={(event) => updateFooter("linksCol1", event.target.value)}
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 font-semibold text-[#082B63] outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
                        placeholder="Ex: Trabalhe Conosco | #trabalhe&#10;Sobre Nós | #produto"
                      />
                    </label>
                  </div>
                  <div className="space-y-4">
                    <Field label="Título do Menu 2" value={content.footer.linksCol2Title || ""} onChange={(value) => updateFooter("linksCol2Title", value)} />
                    <label className="block w-full">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-[#082B63]/60">Links do Menu 2</span>
                      <textarea
                        value={content.footer.linksCol2 || ""}
                        onChange={(event) => updateFooter("linksCol2", event.target.value)}
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 font-semibold text-[#082B63] outline-none transition duration-200 hover:bg-slate-50 focus:border-[#0A3D91] focus:bg-white focus:ring-4 focus:ring-[#0A3D91]/10 focus:shadow-sm"
                        placeholder="Ex: Seja um Revendedor | #revendedor&#10;Termos de Uso | #termos"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Bloco 5: Direitos Autorais */}
              <Field label="Direitos Autorais (Copyright)" value={content.footer.copyright || ""} onChange={(value) => updateFooter("copyright", value)} />
            </div>
          </section>

          <section id="integrações" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:border-[#0A3D91]/20">
            <h2 className="mb-6 text-2xl font-black text-[#082B63] flex items-center gap-2">
              <span>🔌</span> Códigos de Integração (Pixels e Rastreamento)
            </h2>
            <p className="mb-6 text-xs font-semibold text-slate-400">Cole aqui os scripts de rastreamento completos fornecidos pelas ferramentas de marketing. Eles serão injetados e executados diretamente na página de vendas pública.</p>
            <div className="grid gap-6">
              <Field label="Google Analytics 4 (GA4) / GTM Script" value={content.integrations?.ga4 || ""} onChange={(value) => updateIntegration("ga4", value)} textarea />
              <Field label="Meta Pixel (Facebook/Instagram) Script" value={content.integrations?.metaPixel || ""} onChange={(value) => updateIntegration("metaPixel", value)} textarea />
              <Field label="Google Ads (Conversões) Script" value={content.integrations?.googleAds || ""} onChange={(value) => updateIntegration("googleAds", value)} textarea />
              <Field label="TikTok Pixel Script" value={content.integrations?.tiktokPixel || ""} onChange={(value) => updateIntegration("tiktokPixel", value)} textarea />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
