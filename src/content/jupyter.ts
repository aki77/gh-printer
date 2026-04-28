export function waitForJupyter(delayMs = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}
