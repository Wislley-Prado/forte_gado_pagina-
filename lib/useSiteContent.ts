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
      try {
        // Recupera o cache do LocalStorage caso o usuário já tenha edições salvas localmente
        const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
        let localContent: SiteContent | null = null;
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as Partial<SiteContent>;
            localContent = normalizeSiteContent(parsed);
          } catch (e) {
            console.warn("Failed to parse local storage cache:", e);
          }
        }

        // 1. Renderiza imediatamente os dados locais ou padrão (Stale-While-Revalidate)
        const initialContent = localContent || defaultContent;
        setContent(initialContent);

        // Se for somente leitura (visitante do site), define 'ready' como true na hora!
        // Isso remove completamente telas de carregamento travadas para o usuário final.
        if (readOnly && !cancelled) {
          setReady(true);
          setSyncStatus("idle");
        }

        if (isSupabaseConfigured) {
          try {
            const remoteContent = await loadSupabaseContent();
            if (!cancelled) {
              if (remoteContent) {
                // Atualiza o cache local para ficar em sincronia perfeita com o Supabase
                if (typeof window !== "undefined") {
                  try {
                    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteContent));
                  } catch (err) {
                    console.warn("Falha ao atualizar o localStorage com dados do Supabase:", err);
                  }
                }
                setContent(remoteContent);
                setSource("supabase");
                setSyncStatus("saved");
                if (!readOnly) {
                  setReady(true);
                }
                return;
              }
            }
          } catch (e) {
            console.error("Supabase load failed:", e);
            if (!cancelled) {
              setSource("local");
              setSyncStatus("error");
            }
          }
        }

        // Se não houver Supabase ou se a requisição falhar, libera a renderização no admin
        if (!readOnly && !cancelled) {
          setReady(true);
          setSyncStatus(isSupabaseConfigured ? "error" : "idle");
        }
      } catch (e) {
        console.error("Critical error inside useSiteContent load hook:", e);
        if (!cancelled) {
          setContent(defaultContent);
          setReady(true);
          setSyncStatus("error");
        }
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
