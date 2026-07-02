import sharp from 'sharp';
import { readdirSync, statSync, copyFileSync, renameSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public/_originals';
const LARGE_FILE_THRESHOLD = 500 * 1024;
const MAX_WIDTH = 1920;

if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR);

const files = readdirSync(PUBLIC_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

console.log(`Found ${files.length} image files.\n`);

let totalSaved = 0;

for (const file of files) {
  const fullPath = join(PUBLIC_DIR, file);
  const { size } = statSync(fullPath);

  if (size < LARGE_FILE_THRESHOLD) continue;

  const { name, ext } = parse(file);
  const backupPath = join(BACKUP_DIR, file);
  const tempPath = join(PUBLIC_DIR, `${name}.tmp${ext}`);

  if (existsSync(backupPath)) {
    console.log(`SKIP ${file} (already optimized — backup exists)`);
    continue;
  }

  try {
    copyFileSync(fullPath, backupPath);

    const img = sharp(fullPath);
    const meta = await img.metadata();
    const resized = meta.width && meta.width > MAX_WIDTH
      ? img.resize({ width: MAX_WIDTH })
      : img;

    if (ext.toLowerCase() === '.png') {
      await resized.png({ quality: 85, compressionLevel: 9, palette: true }).toFile(tempPath);
    } else {
      await resized.jpeg({ quality: 82, mozjpeg: true }).toFile(tempPath);
    }

    renameSync(tempPath, fullPath);

    const newSize = statSync(fullPath).size;
    const savings = size - newSize;
    totalSaved += savings;
    console.log(
      `OK   ${file}: ${(size / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${(((size - newSize) / size) * 100).toFixed(1)}%)`
    );
  } catch (err) {
    console.error(`FAIL ${file}:`, err.message);
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
console.log(`Originals backed up to: ${BACKUP_DIR}`);
