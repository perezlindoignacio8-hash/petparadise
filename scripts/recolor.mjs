import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC = './src';

// Map red shades to slate (for general UI, backgrounds, text)
const slateMap = {
  'red-50': 'slate-50',
  'red-100': 'slate-100',
  'red-200': 'slate-200',
  'red-300': 'slate-300',
  'red-400': 'slate-400',
  'red-500': 'slate-700',
  'red-600': 'slate-800',
  'red-700': 'slate-900',
  'red-800': 'slate-900',
  'red-900': 'slate-950',
};

// CTAs (buttons, badges with bg-red-600 or hover:bg-red-700) → blue
// But for simplicity in this pass, we map ALL red to slate, then a second pass for explicit CTA buttons.
// User wants "blue accent" - we'll do this manually for the main CTAs.

function processFile(path) {
  let content = readFileSync(path, 'utf8');
  const original = content;

  // Replace red-X with slate-Y
  for (const [from, to] of Object.entries(slateMap)) {
    const regex = new RegExp(`\\bred-${from.split('-')[1]}\\b`, 'g');
    content = content.replace(regex, to);
  }

  // Handle bare "text-red", "bg-red" patterns (rare but possible)
  content = content.replace(/\bred-(\d{2,3})\b/g, (m, n) => {
    const k = `red-${n}`;
    return slateMap[k] || m;
  });

  // Replace hex #dc2626, #b91c1c (red-600/700) with slate equivalents
  content = content.replace(/#dc2626/gi, '#1e293b');
  content = content.replace(/#b91c1c/gi, '#0f172a');
  content = content.replace(/#ef4444/gi, '#334155');
  content = content.replace(/#fee2e2/gi, '#f1f5f9');

  // Replace rgba(220, 38, 38, ...) with slate equivalent
  content = content.replace(/rgba\(220,\s*38,\s*38,/g, 'rgba(30, 41, 59,');

  if (content !== original) {
    writeFileSync(path, content);
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      changed += walk(full);
    } else if (['.ts', '.tsx', '.css', '.js', '.jsx'].includes(extname(full))) {
      if (processFile(full)) {
        console.log('  ' + full.replace(SRC, ''));
        changed++;
      }
    }
  }
  return changed;
}

console.log('Recoloring src/...');
const count = walk(SRC);
console.log(`\nDone. ${count} files updated.`);
