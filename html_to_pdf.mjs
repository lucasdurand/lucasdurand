import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL } from "node:url";

const htmlPath = process.argv[2];
const outPath = process.argv[3];

if (!htmlPath || !outPath) {
  console.error("Usage: node scripts/html_to_pdf.mjs <htmlPath> <outPdfPath>");
  process.exit(2);
}

const absHtml = path.resolve(htmlPath);
const absOut = path.resolve(outPath);

const browser = await chromium.launch();
const page = await browser.newPage();

// Use file:// URL so relative assets (css/images) resolve from the HTML folder
await page.goto(pathToFileURL(absHtml).toString(), { waitUntil: "networkidle" });

// Print
await page.pdf({
  path: absOut,
  format: "A4",
  printBackground: true,
  margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
});

await browser.close();
console.log(`Wrote ${absOut}`);
