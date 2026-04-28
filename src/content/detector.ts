export type ContentType = "markdown" | "jupyter";

export interface DetectedContent {
  element: Element;
  type: ContentType;
}

export function detectContent(): DetectedContent | null {
  const markdownBody = document.querySelector(".markdown-body");
  if (markdownBody) return { element: markdownBody, type: "markdown" };

  const jupyter = document.querySelector('div[data-type="ipynb"]');
  if (jupyter) return { element: jupyter, type: "jupyter" };

  return null;
}
