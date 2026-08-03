import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch();
const page = await browser.newPage();
const url = pathToFileURL(path.resolve("public/right-way.png")).href;
await page.goto(url);

const result = await page.evaluate(async () => {
  const img = document.querySelector("img");
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const w = img.naturalWidth, h = img.naturalHeight;
  const d = ctx.getImageData(0, 0, w, h).data;

  // 1. red box pixels: strong red, low green/blue
  const redPixels = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y*w+x)*4;
      const r=d[i],g=d[i+1],b=d[i+2];
      if (r > 200 && g < 60 && b < 60) redPixels.push([x,y]);
    }
  }
  redPixels.sort((a,b)=>a[0]-b[0]);
  const groups = [];
  let cur = [];
  for (const p of redPixels) {
    if (cur.length && p[0] - cur[cur.length-1][0] > 5) { groups.push(cur); cur = []; }
    cur.push(p);
  }
  if (cur.length) groups.push(cur);
  const boxes = groups.map(g => {
    const xs = g.map(p=>p[0]), ys = g.map(p=>p[1]);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    return { minX,maxX,minY,maxY, cx:(minX+maxX)/2, cy:(minY+maxY)/2, count: g.length };
  });

  // 2. fire bright core (below y=700 to avoid any stray bright ui, restrict search generously)
  let sx=0,sy=0,n=0,fminX=1e9,fmaxX=-1,fminY=1e9,fmaxY=-1;
  for (let y = 850; y < 1250; y++) {
    for (let x = 0; x < w; x++) {
      const i=(y*w+x)*4; const r=d[i],g=d[i+1],b=d[i+2];
      if (r>240 && g>200 && b<150) { sx+=x;sy+=y;n++; fminX=Math.min(fminX,x);fmaxX=Math.max(fmaxX,x);fminY=Math.min(fminY,y);fmaxY=Math.max(fmaxY,y);}
    }
  }
  const fire = n ? { cx: sx/n, cy: sy/n, n, minX:fminX,maxX:fmaxX,minY:fminY,maxY:fmaxY } : null;

  // 3. oval edges: scan rows for widest "ground" (non-black) band in a range below the boxes
  const ovalRows = [];
  for (let y = 0; y < h; y += 3) {
    let minX=-1,maxX=-1;
    for (let x=0;x<w;x++){
      const i=(y*w+x)*4; const r=d[i],g=d[i+1],b=d[i+2];
      if (!(r<5&&g<5&&b<5)) { if(minX===-1) minX=x; maxX=x; }
    }
    ovalRows.push({y,minX,maxX,width:maxX-minX});
  }

  return { w, h, boxes, fire, ovalRows };
});

console.log("dims", result.w, result.h);
console.log("RED BOXES:", JSON.stringify(result.boxes, null, 2));
console.log("FIRE:", JSON.stringify(result.fire));
// print widest rows only for brevity, in the lower half of image
const lower = result.ovalRows.filter(r => r.y > result.h*0.6);
lower.sort((a,b)=>b.width-a.width);
console.log("Widest ground rows (lower half):", JSON.stringify(lower.slice(0,10)));

await browser.close();
