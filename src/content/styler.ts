export function injectStyles(contentElement: Element): () => void {
  const html = document.documentElement;
  html.setAttribute("data-color-mode", "light");
  html.setAttribute("data-light-theme", "light");

  document.querySelectorAll<HTMLIFrameElement>("iframe").forEach((iframe) => {
    try {
      iframe.src = iframe.src.replace("color_mode=dark", "color_mode=light");
    } catch {
      // Cross-origin iframes may throw; ignore
    }
  });

  contentElement
    .querySelectorAll(".js-render-block-actions")
    .forEach((el) => el.remove());

  document.body.replaceChildren(contentElement);

  return () => {
    location.reload();
  };
}
