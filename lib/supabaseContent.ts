import { defaultContent, SiteContent } from "./content";

const CONTENT_ID = "fortegado-premium";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

function mergeContent(content?: Partial<SiteContent>): SiteContent {
  if (!content) return defaultContent;

  const kits = (content.kits && content.kits.length > 0)
    ? content.kits.map((kit) => ({ ...kit }))
    : defaultContent.kits;

  return {
    ...defaultContent,
    ...content,
    colors: { ...defaultContent.colors, ...content.colors },
    hero: { ...defaultContent.hero, ...content.hero },
    product: { ...defaultContent.product, ...content.product },
    kits,
    videos: content.videos || defaultContent.videos,
    testimonials: content.testimonials || defaultContent.testimonials,
    faqs: content.faqs || defaultContent.faqs,
    sections: { ...defaultContent.sections, ...content.sections },
    footer: { ...defaultContent.footer, ...content.footer },
    guarantee: { ...defaultContent.guarantee, ...content.guarantee },
    integrations: { ...defaultContent.integrations, ...content.integrations }
  };
}

function getHeaders(prefer = "return=representation") {
  return {
    apikey: supabaseKey || "",
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    Prefer: prefer
  };
}

export async function loadSupabaseContent(): Promise<SiteContent | null> {
  if (!supabaseUrl || !supabaseKey) return null;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4500);

  const response = await fetch(`${supabaseUrl}/rest/v1/site_content?id=eq.${CONTENT_ID}&select=content`, {
    headers: getHeaders(),
    cache: "no-store",
    signal: controller.signal
  }).finally(() => window.clearTimeout(timeout));

  if (!response.ok) {
    throw new Error(`Supabase load failed: ${response.status}`);
  }

  const rows = (await response.json()) as Array<{ content: Partial<SiteContent> }>;
  return rows[0]?.content ? mergeContent(rows[0].content) : null;
}

export async function saveSupabaseContent(content: SiteContent): Promise<void> {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase não configurado — salvamento ignorado.");
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/site_content?on_conflict=id`, {
    method: "POST",
    headers: getHeaders("resolution=merge-duplicates,return=representation"),
    body: JSON.stringify({
      id: CONTENT_ID,
      content,
      updated_at: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "(sem corpo)");
    console.error(`Supabase save failed: HTTP ${response.status}`, body);
    throw new Error(`Supabase save failed: ${response.status} — ${body}`);
  }
}

export async function uploadImageToSupabase(file: File): Promise<string | null> {
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const bucketName = 'images';

    const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": file.type
      },
      body: file
    });

    if (!response.ok) {
      console.warn("Supabase Storage upload failed, response status:", response.status);
      return null;
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${fileName}`;
    return publicUrl;
  } catch (err) {
    console.error("Error uploading to Supabase Storage:", err);
    return null;
  }
}

export function normalizeSiteContent(content?: Partial<SiteContent>) {
  return mergeContent(content);
}
