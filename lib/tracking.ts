import { SiteContent } from "./content";

export function injectTrackingScripts(integrations?: SiteContent["integrations"]) {
  if (typeof window === "undefined" || !integrations) return;

  const classTag = "fortegado-injected-script";
  // Remove previously injected scripts by our system to avoid duplicates
  document.querySelectorAll(`.${classTag}`).forEach((el) => el.remove());

  const allScripts = [
    integrations.ga4,
    integrations.metaPixel,
    integrations.googleAds,
    integrations.tiktokPixel
  ].filter(Boolean);

  allScripts.forEach((htmlString) => {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;

      // Extract and execute inline and external scripts
      const scripts = tempDiv.getElementsByTagName("script");
      Array.from(scripts).forEach((oldScript) => {
        const newScript = document.createElement("script");
        newScript.className = classTag;

        // Copy all attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy content
        newScript.textContent = oldScript.textContent;
        document.head.appendChild(newScript);
      });

      // Extract and inject noscripts (like Meta Pixel img fallbacks)
      const noscripts = tempDiv.getElementsByTagName("noscript");
      Array.from(noscripts).forEach((oldNoscript) => {
        const newNoscript = document.createElement("noscript");
        newNoscript.className = classTag;
        newNoscript.innerHTML = oldNoscript.innerHTML;
        document.body.appendChild(newNoscript);
      });

      // Extract and inject loose image/pixel elements
      const images = tempDiv.getElementsByTagName("img");
      Array.from(images).forEach((oldImg) => {
        const newImg = document.createElement("img");
        newImg.className = classTag;
        Array.from(oldImg.attributes).forEach((attr) => {
          newImg.setAttribute(attr.name, attr.value);
        });
        document.body.appendChild(newImg);
      });
    } catch (err) {
      console.warn("Failed to inject tracking script:", err);
    }
  });
}
