"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CookiesPopup } from "@/components/CookiesPopup";
import {
  ArrowLeft,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";
import { defaultContent } from "@/lib/content";
import { injectTrackingScripts } from "@/lib/tracking";
import { TiktokIcon } from "@/components/TiktokIcon";

export default function PoliticasDePrivacidade() {
  const { content } = useSiteContent(true);
  const c = content || defaultContent;

  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (c.integrations && cookieConsent === true) {
      injectTrackingScripts(c.integrations);
    } else if (cookieConsent === false) {
      const classTag = "fortegado-injected-script";
      document.querySelectorAll(`.${classTag}`).forEach((el) => el.remove());
    }
  }, [c.integrations, cookieConsent]);

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

  const brandVars = {
    "--premium-blue": c.colors.premiumBlue,
    "--gold": c.colors.gold,
    "--field-green": c.colors.fieldGreen,
    "--ice": c.colors.ice,
    "--deep-blue": c.colors.deepBlue
  } as CSSProperties;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F9FA] text-[#082B63] flex flex-col justify-between" style={brandVars}>
      {/* HEADER PREMIUM */}
      <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {c.hero.logo ? (
              <Link href="/">
                <img src={c.hero.logo} alt="Logo Fortegado" className="h-10 w-auto object-contain max-w-[160px] rounded cursor-pointer" />
              </Link>
            ) : (
              <Link href="/" className="text-2xl font-black tracking-wider text-[#082B63] cursor-pointer">
                <span className="text-[#F2B705]">FORTE</span>GADO
              </Link>
            )}
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-[#0A3D91] transition duration-200 hover:bg-slate-50 active:scale-95 shadow-sm"
          >
            <ArrowLeft size={16} /> Voltar para o Início
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex-1">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A3D91]/8 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0A3D91] mb-4">
            <ShieldCheck size={14} /> Canal de Segurança
          </div>
          <h1 className="text-4xl font-black sm:text-5xl text-[#082B63]">Políticas de Privacidade</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">Última atualização: 24 de maio de 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8 font-semibold text-slate-700 leading-relaxed">
          {/* Seção 1 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">1.</span> Introdução e Compromisso
            </h2>
            <p className="text-sm">
              Na <strong>Fortegado Premium</strong>, valorizamos a privacidade de nossos clientes e parceiros pecuaristas. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais quando você visita nossa página de vendas, adquire nossos kits de suplementação mineral bovina ou entra em contato conosco via canais de suporte.
            </p>
          </div>

          {/* Seção 2 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">2.</span> Informações que Coletamos
            </h2>
            <p className="text-sm">
              Coletamos informações necessárias para faturamento de pedidos e atendimento qualificado:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li><strong>Dados de Contato:</strong> Nome, e-mail, número de WhatsApp e telefone celular fornecidos voluntariamente por você ao solicitar orçamentos ou suporte técnico.</li>
              <li><strong>Dados de Entrega:</strong> Endereço da fazenda ou propriedade rural para logística de envio dos kits.</li>
              <li><strong>Dados de Navegação:</strong> Informações sobre seu navegador, endereço IP, cookies e comportamento de cliques coletados de forma segura e anônima.</li>
            </ul>
          </div>

          {/* Seção 3 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">3.</span> Cookies e Pixels de Rastreamento
            </h2>
            <p className="text-sm">
              Para oferecer uma experiência personalizada e divulgar nossos suplementos de alta performance de forma assertiva para produtores rurais, nossa página utiliza tecnologias de rastreamento (pixels e tags) fornecidas por terceiros:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                <span className="block font-black text-xs uppercase tracking-wider text-[#0A3D91] mb-1">Google Analytics (GA4) / Ads</span>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Avalia anonimamente o engajamento do público com o site, origem dos acessos e conversões dos kits de nutrição.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                <span className="block font-black text-xs uppercase tracking-wider text-[#0A3D91] mb-1">Meta Pixel (Facebook/Instagram)</span>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Mede a eficácia de nossas campanhas de marketing em redes sociais e nos ajuda a exibir anúncios relevantes sobre manejo mineral bovino.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 sm:col-span-2">
                <span className="block font-black text-xs uppercase tracking-wider text-[#0A3D91] mb-1">TikTok Pixel</span>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Permite otimizar anúncios e compreender a interação de novos pecuaristas em campanhas na plataforma de vídeos TikTok.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-2">
              Você pode desativar o uso de cookies a qualquer momento alterando as configurações de privacidade do seu próprio navegador.
            </p>
          </div>

          {/* Seção 4 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">4.</span> Como Usamos Suas Informações
            </h2>
            <p className="text-sm">
              Os dados coletados são utilizados unicamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li>Processar, faturar e enviar os kits de suplemento mineral bovino adquiridos.</li>
              <li>Oferecer suporte técnico individualizado via WhatsApp para potencializar os resultados do seu gado no cocho.</li>
              <li>Aperfeiçoar as funcionalidades e o design da nossa página de vendas.</li>
              <li>Enviar atualizações sobre novos lotes promocionais e informativos de nutrição animal.</li>
            </ul>
          </div>

          {/* Seção 5 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">5.</span> Compartilhamento e Proteção de Dados
            </h2>
            <p className="text-sm">
              A <strong>Fortegado Premium</strong> se compromete a <strong>nunca vender ou alugar</strong> seus dados a terceiros. Seus dados são protegidos por criptografia de ponta e mantidos em servidores de alta segurança para impedir acessos não autorizados. Compartilhamos seus dados apenas com processadores de pagamentos credenciados e transportadoras parceiras estritamente necessárias para a conclusão da entrega dos kits.
            </p>
          </div>

          {/* Seção 6 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">6.</span> Seus Direitos (LGPD)
            </h2>
            <p className="text-sm">
              Conforme a Lei Geral de Proteção de Dados (LGPD) brasileira, você tem o direito garantido de solicitar o acesso, retificação, limitação ou a **exclusão definitiva** dos seus dados pessoais de nossos registros a qualquer momento, bastando entrar em contato pelo e-mail oficial de atendimento.
            </p>
          </div>

          {/* Seção 7 */}
          <div className="space-y-3">
            <h2 className="text-xl font-black text-[#082B63] flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-[#5E8C31]">7.</span> Informações de Contato
            </h2>
            <p className="text-sm">
              Se tiver dúvidas sobre nossa política de privacidade ou desejar exercer seus direitos legais, entre em contato diretamente com nossa equipe:
            </p>
            <div className="bg-[#0A3D91]/4 p-5 rounded-xl border border-[#0A3D91]/10 space-y-2 text-sm text-[#082B63]">
              <p><strong>E-mail:</strong> <a href={`mailto:${c.footer.email}`} className="underline hover:text-[#5E8C31] transition">{c.footer.email || "contato@fortegado.com.br"}</a></p>
              <p><strong>Telefone/WhatsApp:</strong> {c.footer.phone || "(34) 99999-9999"}</p>
              <p><strong>Endereço Comercial:</strong> {c.footer.address || "Uberaba - MG"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM IDÊNTICO À HOME */}
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
                    } else if (url.startsWith("#")) {
                      url = `/${url}`;
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
                    } else if (url.startsWith("#")) {
                      url = `/${url}`;
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

          {/* Barra Inferior (Copyright) */}
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
