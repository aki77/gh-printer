import { detectContent } from "./detector";
import { injectStyles } from "./styler";
import { normalizeHeadings } from "./headings";
import { waitForMermaid } from "./mermaid";
import { waitForJupyter } from "./jupyter";

async function printPage(): Promise<void> {
  const content = detectContent();

  if (!content) {
    alert("No printable GitHub Markdown content found on this page.");
    return;
  }

  normalizeHeadings();
  injectStyles(content.element);

  if (content.type === "jupyter") {
    await waitForJupyter();
  } else {
    await waitForMermaid();
  }

  // body置き換え後にbackgroundでiframe内の不要要素を削除してもらう
  await chrome.runtime.sendMessage({ type: "removeMermaidControls" });

  window.print();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "print") {
    printPage();
  }
});
