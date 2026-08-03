import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch();
const page = await browser.newPage();

async function getPixelData(file) {
  const url = pathToFileURL(path.resolve("public", file)).href;
  await page.goto(url);
  return page.evaluate(async () => {
    const img = document.querySelector("img");
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const w = img.naturalWidth, h = img.naturalHeight;
    const d = ctx.getImageData(0, 0, w, h).data;
    return { w, h, data: Array.from(d) };
  });
}

function isDark(r,g,b) { return r < 15 && g < 15 && b < 40; }

function analyzeContentBounds(w, h, data) {
  const rowDarkFrac = [];
  for (let y = 0; y < h; y++) {
    let dark = 0;
    for (let x = 0; x < w; x += 2) {
      const i = (y * w + x) * 4;
      if (isDark(data[i], data[i+1], data[i+2])) dark++;
    }
    rowDarkFrac.push(dark / (w / 2));
  }
  let contentTop = -1;
  for (let y = 0; y < h - 5; y++) {
    if (rowDarkFrac[y] > 0.5 && rowDarkFrac[y+5] > 0.5) { contentTop = y; break; }
  }
  let contentBottom = -1;
  for (let y = h - 1; y > 5; y--) {
    if (rowDarkFrac[y] > 0.9 && rowDarkFrac[y-5] > 0.9) { contentBottom = y; break; }
  }

  const colDarkFrac = [];
  for (let x = 0; x < w; x++) {
    let dark = 0;
    for (let y = contentTop; y < (contentBottom>0?contentBottom:h); y += 2) {
      const i = (y * w + x) * 4;
      if (isDark(data[i], data[i+1], data[i+2])) dark++;
    }
    colDarkFrac.push(dark);
  }
  let contentLeft = -1;
  for (let x = 0; x < w - 5; x++) {
    if (colDarkFrac[x] > 5 && colDarkFrac[x+5] > 5) { contentLeft = x; break; }
  }
  let contentRight = -1;
  for (let x = w - 1; x > 5; x--) {
    if (colDarkFrac[x] > 5 && colDarkFrac[x-5] > 5) { contentRight = x; break; }
  }

  return { contentTop, contentBottom, contentLeft, contentRight };
}

const right = await getPixelData("right-way.png");
const bounds = analyzeContentBounds(right.w, right.h, right.data);
console.log("RIGHT", right.w, right.h, bounds);

await browser.close();
