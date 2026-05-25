"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, Check, X } from "lucide-react";

export function CookiesPopup({ onConsentChange }: { onConsentChange?: (consent: boolean) => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Evita Hydration Mismatch carregando o estado apenas no cliente
    const consent = localStorage.getItem("fortegado-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    } else if (consent === "accepted") {
      onConsentChange?.(true);
    } else {
      onConsentChange?.(false);
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem("fortegado-cookie-consent", "accepted");
    setIsVisible(false);
    onConsentChange?.(true);
  };

  const handleReject = () => {
    localStorage.setItem("fortegado-cookie-consent", "rejected");
    setIsVisible(false);
    onConsentChange?.(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] rounded-2xl bg-[#082B63]/95 text-white p-6 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(8,43,99,0.3)] flex flex-col gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F2B705]/20 text-[#F2B705]">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-[#F2B705]">Controle de Cookies</h4>
              <p className="mt-1 text-xs font-semibold text-white/80 leading-relaxed">
                Usamos cookies e pixels de rastreamento (como Google Analytics, Meta Pixel, Google Ads e TikTok) para analisar o engajamento com nossos suplementos minerais bovinos e personalizar seu atendimento. Ao aceitar, você concorda com nossa{" "}
                <Link href="/politicas-de-privacidade" className="underline text-[#F2B705] hover:text-white transition font-bold">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              onClick={handleReject}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 text-xs font-bold text-white transition duration-200 active:scale-95"
            >
              <X size={14} /> Recusar
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#F2B705] hover:bg-white px-5 py-2.5 text-xs font-black text-[#082B63] transition duration-200 active:scale-95 shadow-md shadow-[#F2B705]/10"
            >
              <Check size={14} /> Aceitar Todos
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
