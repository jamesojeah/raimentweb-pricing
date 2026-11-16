// Makes the 1200x630 social sharing image (public/og-travis.jpg) from public/travis.jpg.
// Run it again whenever you change your photo:   npm run og
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const photoPath = path.join(root, "public", "travis.jpg");
const outPath = path.join(root, "public", "og-travis.jpg");

if (!fs.existsSync(photoPath)) {
  console.warn("public/travis.jpg not found, skipping the social image.");
  process.exit(0);
}

const W = 1200;
const H = 630;
const photoW = 440;
const photoH = 560;
const photoX = W - photoW - 70;
const photoY = (H - photoH) / 2;

// The photo, cropped to a portrait arch.
const arch = Buffer.from(
  `<svg width="${photoW}" height="${photoH}" xmlns="http://www.w3.org/2000/svg">
     <path d="M0 ${photoH - 32} V${photoW / 2} A${photoW / 2} ${photoW / 2} 0 0 1 ${photoW} ${photoW / 2} V${photoH - 32} Q${photoW} ${photoH} ${photoW - 32} ${photoH} H32 Q0 ${photoH} 0 ${photoH - 32} Z" fill="#fff"/>
   </svg>`,
);

const photo = await sharp(photoPath)
  .rotate()
  .resize(photoW, photoH, { fit: "cover", position: "top" })
  .composite([{ input: arch, blend: "dest-in" }])
  .png()
  .toBuffer();

const background = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#5B21B6"/>
         <stop offset="1" stop-color="#3B0F8C"/>
       </linearGradient>
       <radialGradient id="glow" cx="0.78" cy="0.5" r="0.5">
         <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.75"/>
         <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
       </radialGradient>
     </defs>
     <rect width="${W}" height="${H}" fill="url(#g)"/>
     <rect width="${W}" height="${H}" fill="url(#glow)"/>
     <g font-family="Arial, Helvetica, sans-serif" fill="#fff">
       <text x="70" y="150" font-size="30" font-weight="700" fill="#DDD6FE">Raiment Web · Asaba, Nigeria</text>
       <text x="70" y="262" font-size="68" font-weight="800">Websites that</text>
       <text x="70" y="342" font-size="68" font-weight="800">bring you</text>
       <text x="70" y="422" font-size="68" font-weight="800">customers.</text>
       <text x="70" y="520" font-size="30" font-weight="600" fill="#DDD6FE">pricing.raimentstore.com.ng</text>
     </g>
   </svg>`,
);

await sharp(background)
  .composite([{ input: photo, left: photoX, top: photoY }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(outPath);

console.log(`Wrote ${path.relative(root, outPath)} (${W}x${H})`);
