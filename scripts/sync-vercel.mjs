// Rewrites vercel.json's headers from security/headers.js.
import { readFileSync, writeFileSync } from 'node:fs';
import { vercelHeaders } from '../security/headers.js';

const file = new URL('../vercel.json', import.meta.url);
let config = {};
try {
  config = JSON.parse(readFileSync(file, 'utf8'));
} catch {
  /* first run */
}
config = { $schema: 'https://openapi.vercel.sh/vercel.json', framework: 'vite', ...config, headers: vercelHeaders() };
writeFileSync(file, JSON.stringify(config, null, 2) + '\n');
console.log('vercel.json updated');
