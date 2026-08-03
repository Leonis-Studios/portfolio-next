import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch();
const page = await browser.newPage();
const url = pathToFileURL(path.resolve("public/images/HWP_Static_BG_1920x1080.png")).href;
await page.goto(url);

const rows = await page.evaluate(async () => {
  const img = document.querySelector("img");
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const w = img.naturalWidth, h = img.naturalHeight;
  const results = [];
  for (let y = 650; y < 1080; y += 5) {
    const d = ctx.getImageData(0, y, w, 1).data;
    let minX = -1, maxX = -1;
    for (let x = 0; x < w; x++) {
      const i = x * 4;
      const r = d[i], g = d[i+1], b = d[i+2];
      const isGround = !(r < 5 && g < 5 && b < 5); // any non-pure-black = ground/oval/bush
      if (isGround) { if (minX === -1) minX = x; maxX = x; }
    }
    results.push({ y, minX, maxX, width: maxX - minX });
  }
  return results;
});
console.log(JSON.stringify(rows, null, 0));
await browser.close();
