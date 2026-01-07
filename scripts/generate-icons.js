import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = join(__dirname, '../public/icons/icon.svg');
const outputDir = join(__dirname, '../public/icons');

// SVG를 직접 생성 (Noto Sans JP 폰트가 없을 수 있으므로)
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E91E63"/>
      <stop offset="100%" style="stop-color:#9C27B0"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg)"/>
  <text x="256" y="380" font-size="300" fill="white" text-anchor="middle" font-weight="300">あ</text>
</svg>
`;

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('🎨 아이콘 생성 중...');
  
  for (const size of sizes) {
    const outputPath = join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`  ✅ icon-${size}x${size}.png 생성 완료`);
  }
  
  console.log('🎉 모든 아이콘 생성 완료!');
}

generateIcons().catch(console.error);




