function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function normalizeHeadings(): () => void {
  const headings = document.querySelectorAll<HTMLElement>(
    ".markdown-body h1, .markdown-body h2, .markdown-body h3, " +
    ".markdown-body h4, .markdown-body h5, .markdown-body h6"
  );

  const originalIds = new Map<HTMLElement, string | null>();
  const idMap = new Map<string, string>();

  headings.forEach((heading) => {
    originalIds.set(heading, heading.id || null);
    const normalized = normalize(heading.textContent ?? "");
    if (heading.id && heading.id !== normalized) {
      idMap.set(heading.id, normalized);
    }
    heading.id = normalized;
  });

  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  const originalHrefs = new Map<HTMLAnchorElement, string>();

  links.forEach((link) => {
    const href = link.getAttribute("href")!;
    originalHrefs.set(link, href);
    const oldId = href.slice(1);
    const newId = idMap.get(oldId);
    if (newId) link.setAttribute("href", `#${newId}`);
  });

  return () => {
    originalIds.forEach((id, el) => {
      if (id !== null) el.id = id;
      else el.removeAttribute("id");
    });
    links.forEach((link) => {
      const orig = originalHrefs.get(link);
      if (orig) link.setAttribute("href", orig);
    });
  };
}
