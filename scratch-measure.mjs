import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2560, height: 1440 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(300);

const boxes = await page.evaluate(() => {
  function box(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
  }
  return {
    green: box('img[alt="Green character"]'),
    blue: box('img[alt="Blue character"]'),
    brown: box('img[alt="Brown character"]'),
    chest: box('img[alt="Chest"]'),
    bonfireImg: box('img[src*="CF_Idle"]'),
    cat: box('img[src*="Bush_Eye"]'),
  };
});
console.log("DOM boxes (CSS px, viewport 2560x1440, zoom should be 1):", JSON.stringify(boxes, null, 2));

// now find flame visual center via pixel color scan of a screenshot (flame bright orange/yellow, distinguish from cat by being large + low)
const shotBuf = await page.screenshot({ fullPage: false });
await browser.close();

// analyze with a second headless canvas pass
const browser2 = await chromium.launch();
const page2 = await browser2.newPage();
await page2.setContent(`<img id="i">`);
const b64 = shotBuf.toString("base64");
await page2.evaluate((b64) => {
  const img = document.getElementById("i");
  img.src = "data:image/png;base64," + b64;
}, b64);
await page2.waitForFunction(() => document.getElementById("i").complete);
const flame = await page2.evaluate(async () => {
  const img = document.getElementById("i");
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const w = img.naturalWidth, h = img.naturalHeight;
  const d = ctx.getImageData(0, 0, w, h).data;
  // bright flame core: very high R, high G, low-ish B, and NOT in top 900px (avoid title text / any stray)
  let sx = 0, sy = 0, n = 0, minX=1e9,maxX=-1,minY=1e9,maxY=-1;
  for (let y = 900; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y*w+x)*4;
      const r=d[i],g=d[i+1],b=d[i+2];
      if (r>240 && g>200 && b<150) { sx+=x; sy+=y; n++; minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
    }
  }
  return { n, cx: n?sx/n:null, cy: n?sy/n:null, minX,maxX,minY,maxY };
});
console.log("Flame bright-core detection:", JSON.stringify(flame));

// oval edges: scan row at y where characters sit (use green box bottom-ish) for the grass-shadow teal color band width
const ovalRow = await page2.evaluate(async (rowY) => {
  const img = document.getElementById("i");
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const w = img.naturalWidth;
  const d = ctx.getImageData(0, rowY, w, 1).data;
  let minX=-1,maxX=-1;
  for (let x=0;x<w;x++){
    const i=x*4; const r=d[i],g=d[i+1],b=d[i+2];
    // oval ground tone is dark teal/blue, not pure black
    if (!(r<6&&g<6&&b<6) && b>15 && r<60) { if(minX===-1) minX=x; maxX=x; }
  }
  return { rowY, minX, maxX };
}, 1300);
console.log("Oval row scan at y=1300:", JSON.stringify(ovalRow));

for (const rowY of [1100, 1150, 1180, 1200, 1220, 1250, 1270]) {
  const r = await page2.evaluate(async (rowY) => {
    const img = document.getElementById("i");
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const w = img.naturalWidth;
    const d = ctx.getImageData(0, rowY, w, 1).data;
    let minX=-1,maxX=-1;
    for (let x=0;x<w;x++){
      const i=x*4; const r=d[i],g=d[i+1],b=d[i+2];
      if (!(r<6&&g<6&&b<6) && (b>10||g>10||r>10)) { if(minX===-1) minX=x; maxX=x; }
    }
    return { rowY, minX, maxX };
  }, rowY);
  console.log("row", JSON.stringify(r));
}

await browser2.close();
