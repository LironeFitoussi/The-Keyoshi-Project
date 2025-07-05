import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512.png' }
];

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function generateFavicons() {
  const imageUrl = 'https://wallpapercave.com/wp/wp7916843.jpg';
  const outputDir = join(__dirname, '../public/favicon');

  console.log('Downloading image...');
  const imageBuffer = await downloadImage(imageUrl);
  
  console.log('Creating output directory...');
  await mkdir(outputDir, { recursive: true });

  console.log('Processing image...');
  const processedImage = sharp(imageBuffer)
    .resize(512, 512, {
      fit: 'cover',
      position: 'centre'
    })
    .composite([{
      input: Buffer.from(`<svg><rect x="0" y="0" width="512" height="512" rx="0" ry="0" fill="#000000" fill-opacity="0.2"/></svg>`),
      blend: 'overlay'
    }]);

  console.log('Generating favicons...');
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

  await processedImage
    .clone()
    .resize(32, 32)
    .toFile(join(__dirname, '../public/favicon.ico'));

  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error); 