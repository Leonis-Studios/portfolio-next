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
    return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, w: r.width, h: r.height };
  }
  return {
    green: box('img[alt="Green character"]'),
    blue: box('img[alt="Blue character"]'),
    brown: box('img[alt="Brown character"]'),
    chest: box('img[alt="Chest"]'),
  };
});

const shotBuf = await page.screenshot({ fullPage: false });
await browser.close();

const browser2 = await chromium.launch();
const page2 = await browser2.newPage();
await page2.setContent(`<img id="i">`);
await page2.evaluate((b64) => { document.getElementById("i").src = "data:image/png;base64," + b64; }, shotBuf.toString("base64"));
await page2.waitForFunction(() => document.getElementById("i").complete);

const fire = await page2.evaluate(async () => {
  const img = document.getElementById("i");
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const w = img.naturalWidth;
  const d = ctx.getImageData(0, 0, w, canvas.height).data;
  let sx=0,sy=0,n=0,fminX=1e9,fmaxX=-1,fminY=1e9,fmaxY=-1;
  for (let y = 850; y < 1250; y++) {
    for (let x = 0; x < w; x++) {
      const i=(y*w+x)*4; const r=d[i],g=d[i+1],b=d[i+2];
      if (r>240 && g>200 && b<150) { sx+=x;sy+=y;n++; fminX=Math.min(fminX,x);fmaxX=Math.max(fmaxX,x);fminY=Math.min(fminY,y);fmaxY=Math.max(fmaxY,y);}
    }
  }
  return { n, cx: n?sx/n:null, cy: n?sy/n:null, fminX,fmaxX,fminY,fmaxY, bboxCx:(fminX+fmaxX)/2 };
});
console.log("OUR DOM boxes:", JSON.stringify(boxes, null, 2));
console.log("OUR fire:", JSON.stringify(fire));

await browser2.close();
