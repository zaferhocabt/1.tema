import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

async function buildScormZip() {
  console.log('Building SCORM 1.2 ZIP package...');

  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Please run "npm run build" first.');
    process.exit(1);
  }

  const zip = new JSZip();

  function addFolderToZip(folderPath, zipFolder) {
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subZip = zipFolder.folder(item);
        addFolderToZip(fullPath, subZip);
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }

  // Ensure imsmanifest.xml is at root of ZIP
  const manifestPath = path.join(rootDir, 'public', 'imsmanifest.xml');
  if (fs.existsSync(manifestPath)) {
    zip.file('imsmanifest.xml', fs.readFileSync(manifestPath));
  }

  // Add all dist files
  addFolderToZip(distDir, zip);

  const outputPath = path.join(rootDir, 'TeknoMacera5_1Tema_SCORM.zip');
  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(outputPath, buffer);

  console.log(`SCORM package successfully created at: ${outputPath}`);
}

buildScormZip().catch(console.error);
