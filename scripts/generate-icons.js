import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = join(__dirname, '../public/icons/icon.svg');
const outputDir = join(__dirname, '../public/icons');

// SVG를 직접 생성 - Travel Japan 아이콘
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B"/>
      <stop offset="50%" style="stop-color:#EE5A24"/>
      <stop offset="100%" style="stop-color:#D63031"/>
    </linearGradient>
    <linearGradient id="plane" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="100%" style="stop-color:#F0F0F0"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg)"/>
  <circle cx="256" cy="240" r="80" fill="#FFFFFF" opacity="0.3"/>
  <g transform="translate(256, 256) rotate(-30)">
    <path d="M-100,0 L-20,-15 L80,-8 L100,0 L80,8 L-20,15 Z" fill="url(#plane)"/>
    <path d="M-60,-15 L-40,-45 L-30,-45 L-20,-15" fill="url(#plane)"/>
    <path d="M-60,15 L-40,45 L-30,45 L-20,15" fill="url(#plane)"/>
    <path d="M-95,0 L-85,-20 L-75,-20 L-70,0 L-75,20 L-85,20 Z" fill="url(#plane)"/>
  </g>
  <text x="256" y="440" font-family="Arial Black, sans-serif" font-size="80" fill="white" text-anchor="middle" font-weight="900" opacity="0.9">JP</text>
</svg>
`;

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Android mipmap 폴더 경로와 사이즈
const androidMipmaps = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function generateIcons() {
  console.log('🎨 아이콘 생성 중...');
  
  // PWA 아이콘 생성
  for (const size of sizes) {
    const outputPath = join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`  ✅ icon-${size}x${size}.png 생성 완료`);
  }
  
  // Android 아이콘 생성
  console.log('\n📱 Android 아이콘 생성 중...');
  const androidResDir = join(__dirname, '../android/app/src/main/res');
  
  for (const { folder, size } of androidMipmaps) {
    const mipmapDir = join(androidResDir, folder);
    if (!existsSync(mipmapDir)) {
      mkdirSync(mipmapDir, { recursive: true });
    }
    
    // ic_launcher.png
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(join(mipmapDir, 'ic_launcher.png'));
    
    // ic_launcher_round.png (같은 이미지 사용)
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(join(mipmapDir, 'ic_launcher_round.png'));
    
    // ic_launcher_foreground.png (adaptive icon용, 더 크게)
    const foregroundSize = Math.round(size * 1.5);
    await sharp(Buffer.from(svgContent))
      .resize(foregroundSize, foregroundSize)
      .extend({
        top: Math.round((foregroundSize * 0.25)),
        bottom: Math.round((foregroundSize * 0.25)),
        left: Math.round((foregroundSize * 0.25)),
        right: Math.round((foregroundSize * 0.25)),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .resize(size, size)
      .png()
      .toFile(join(mipmapDir, 'ic_launcher_foreground.png'));
    
    console.log(`  ✅ ${folder} 아이콘 생성 완료`);
  }
  
  console.log('\n🎉 모든 아이콘 생성 완료!');
}

generateIcons().catch(console.error);






