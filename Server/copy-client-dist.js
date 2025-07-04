const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'Client', 'dist');
const destDir = path.join(__dirname, 'client-dist');

console.log('Copying client build files...');
console.log(`Source: ${srcDir}`);
console.log(`Destination: ${destDir}`);

// Remove existing destination directory if it exists
if (fs.existsSync(destDir)) {
  console.log('Removing existing client-dist directory...');
  fs.rmSync(destDir, { recursive: true });
}

// Create destination directory
fs.mkdirSync(destDir, { recursive: true });

// Copy files recursively
if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✓ Client build files copied successfully!');
} else {
  console.error('Error: Client dist directory not found!');
  process.exit(1);
} 