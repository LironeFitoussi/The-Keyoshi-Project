import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  const inputImage = join(__dirname, '../public/kyoshi-wallpaper.jpg');
  const outputDir = join(__dirname, '../public/favicon');

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  // Process image for better favicon appearance
  const processedImage = sharp(inputImage)
    .extract({ left: 0, top: 0, width: 1000, height: 1000 }) // Extract square portion
    .resize(512, 512) // Resize to largest size first
    .composite([{
      input: Buffer.from(`<svg><rect x="0" y="0" width="512" height="512" rx="0" ry="0" fill="#000000" fill-opacity="0.2"/></svg>`),
      blend: 'overlay'
    }]);

  // Generate favicons for each size
  for (const size of sizes) {
    await processedImage
      .clone()
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'centre'
      })
      .sharpen()
      .toFile(join(outputDir, size.name));
  }

  // Generate ICO file
  await processedImage
    .clone()
    .resize(32, 32)
    .toFile(join(__dirname, '../public/favicon.ico'));

  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error); 