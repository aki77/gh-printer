export function waitForMermaid(timeoutMs = 5000): Promise<void> {
  const iframes = document.querySelectorAll<HTMLIFrameElement>(
    'iframe[src*="mermaid"]'
  );

  if (iframes.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let readyCount = 0;
    const timer = setTimeout(resolve, timeoutMs);

    const handler = (event: MessageEvent) => {
      if (event.data === "ready") {
        readyCount++;
        if (readyCount >= iframes.length) {
          clearTimeout(timer);
          window.removeEventListener("message", handler);
          resolve();
        }
      }
    };
    window.addEventListener("message", handler);
  });
}
