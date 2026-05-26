"use client";

import { useEffect, useState } from "react";
import { defaultContent, SiteContent } from "./content";
import { isSupabaseConfigured, loadSupabaseContent, normalizeSiteContent, saveSupabaseContent } from "./supabaseContent";

const STORAGE_KEY = "fortegado-premium-content";

export function useSiteContent(readOnly = false) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [ready, setReady] = useState(false);
  const [source, setSource] = useState<"local" | "supabase">(isSupabaseConfigured ? "supabase" : "local");
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Recupera o cache do LocalStorage caso o usuário já tenha edições salvas localmente
      const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      let localContent: SiteContent | null = null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Partial<SiteContent>;
          localContent = normalizeSiteContent(parsed);
        } catch {}
      }

      if (isSupabaseConfigured) {
        try {
          const remoteContent = await loadSupabaseContent();
          if (!cancelled) {
            // Se o usuário possui edições em cache local, damos prioridade a elas para recuperar dados perdidos
            if (localContent && Object.keys(localContent.sections || {}).length > 0) {
              // Mantém as edições locais mas mescla os novos kits estruturados
              const mergedKits = defaultContent.kits.map(defaultKit => {
                const existingKit = localContent?.kits?.find(k => k.id === defaultKit.id);
                return existingKit ? { ...defaultKit, ...existingKit } : defaultKit;
              });

              setContent({
                ...localContent,
                kits: mergedKits
              });
              setSource("supabase");
              setSyncStatus("saved");
              setReady(true);
              return;
            }

            if (remoteContent) {
              setContent(remoteContent);
              setSource("supabase");
              setSyncStatus("saved");
              setContent(remoteContent);
              setReady(true);
              return;
            }
          }
        } catch {
          if (!cancelled) {
            setSource("local");
            setSyncStatus("error");
          }
        }
      }

      if (localContent) {
        setContent(localContent);
      } else {
        setContent(defaultContent);
      }
      if (!cancelled) {
        setReady(true);
        setSyncStatus(isSupabaseConfigured ? "error" : "idle");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (ready && !readOnly) {
      // Salva no localStorage com tratamento robusto de cota excedida
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      } catch (err) {
        // QuotaExceededError: limpa cache antigo e tenta de novo
        try {
          window.localStorage.removeItem(STORAGE_KEY);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        } catch {
          console.warn("localStorage cheio mesmo após limpeza — usando apenas Supabase.", err);
        }
      }

      if (isSupabaseConfigured) {
        setSyncStatus("saving");
        const timeout = window.setTimeout(() => {
          saveSupabaseContent(content)
            .then(() => {
              setSource("supabase");
              setSyncStatus("saved");
            })
            .catch(() => {
              setSource("local");
              setSyncStatus("error");
            });
        }, 600);

        return () => window.clearTimeout(timeout);
      }
    }
  }, [content, ready, readOnly]);

  function reset() {
    if (readOnly) return;
    setContent(defaultContent);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return { content, setContent, reset, ready, source, syncStatus };
}
