// Membuat apple-touch-icon.png dan og-default.jpg dari SVG. Jalankan: node scripts/generate-images.mjs
// Ganti SVG di bawah (atau file hasilnya) dengan aset brand klien.
import sharp from 'sharp';

const shortName = process.argv[2] ?? 'Nama Perusahaan';

await sharp('public/favicon.svg', { density: 600 })
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0A0A0A"/><stop offset="1" stop-color="#262626"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1020" cy="315" r="300" fill="none" stroke="#A3A3A3" stroke-opacity="0.45"/>
  <circle cx="1020" cy="315" r="200" fill="none" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <g transform="translate(96 250) scale(3)">
    <rect x="1" y="1" width="38" height="38" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <path d="M11 29V11l9 11 9-11v18" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <circle cx="20" cy="31" r="2" fill="#A3A3A3"/>
  </g>
  <text x="250" y="335" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#FFFFFF">${shortName}</text>
</svg>`;

await sharp(Buffer.from(og)).jpeg({ quality: 85 }).toFile('src/assets/og-default.jpg');
console.log('OK: public/apple-touch-icon.png, src/assets/og-default.jpg');
