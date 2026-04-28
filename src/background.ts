const MENU_ITEM_ID = "gh-printer";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: "Print GitHub Markdown",
    documentUrlPatterns: [
      "https://github.com/*",
      "https://gist.github.com/*",
    ],
  });
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) injectAndPrint(tab.id);
});

chrome.contextMenus.onClicked.addListener((_, tab) => {
  if (tab?.id) injectAndPrint(tab.id);
});

async function removeMermaidControls(tabId: number) {
  const frames = await chrome.webNavigation.getAllFrames({ tabId });
  const mermaidFrames = (frames ?? []).filter((f) =>
    f.url.startsWith("https://viewscreen.githubusercontent.com/")
  );

  await Promise.all(
    mermaidFrames.map((frame) =>
      chrome.scripting.executeScript({
        target: { tabId, frameIds: [frame.frameId] },
        func: () => {
          document
            .querySelectorAll(".mermaid-viewer-control-panel")
            .forEach((el) => el.remove());
        },
      })
    )
  );
}

async function injectAndPrint(tabId: number) {
  await chrome.tabs.sendMessage(tabId, { type: "print" });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "removeMermaidControls" && sender.tab?.id) {
    removeMermaidControls(sender.tab.id).then(() => sendResponse());
    return true; // 非同期レスポンスのためtrueを返す
  }
});
