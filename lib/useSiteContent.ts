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
      if (isSupabaseConfigured) {
        try {
          const remoteContent = await loadSupabaseContent();
          if (!cancelled && remoteContent) {
            setContent(remoteContent);
            setSource("supabase");
            setSyncStatus("saved");
            setReady(true);
            return;
          }
        } catch {
          if (!cancelled) {
            setSource("local");
            setSyncStatus("error");
          }
        }
      }

      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Partial<SiteContent>;
          setContent(normalizeSiteContent(parsed));
        } catch {
          setContent(defaultContent);
        }
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
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      } catch (err) {
        console.warn("Falha ao salvar no localStorage (limite excedido), mas continuando com o sincronismo:", err);
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
