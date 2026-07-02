import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC = './src';

// Files that contain main CTAs to convert from slate to blue
const CTA_FILES = [
  'src/components/HeroBanner.tsx',
  'src/components/ProductCard.tsx',
  'src/components/StickyProductBar.tsx',
  'src/components/PainPointSection.tsx',
  'src/app/producto/[handle]/page.tsx',
];

// Patterns that indicate a CTA button - we replace the slate inside them with blue.
// These are exact-match substrings that we'll convert in-place.
// We look for the specific button-like usages.
const ctaPatterns = [
  // bg-slate-800 → bg-blue-600 in button contexts (with hover, etc)
  { from: 'bg-slate-800 hover:bg-slate-900', to: 'bg-blue-600 hover:bg-blue-700' },
  { from: 'bg-slate-800 text-white', to: 'bg-blue-600 text-white' },
];

for (const file of CTA_FILES) {
  let content = readFileSync(file, 'utf8');
  const original = content;
  for (const { from, to } of ctaPatterns) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    writeFileSync(file, content);
    console.log('  Updated:', file);
  }
}

console.log('\nDone.');
