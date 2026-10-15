// Copies a JPEG while dropping its metadata segments: EXIF (which can hold GPS
// location and device details), XMP, IPTC and comments. Pixels are untouched.
// Usage: node scripts/strip-photo-metadata.mjs <input.jpg> <output.jpg>
import { readFileSync, writeFileSync } from 'node:fs';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/strip-photo-metadata.mjs <input.jpg> <output.jpg>');
  process.exit(1);
}

const src = readFileSync(input);
if (src[0] !== 0xff || src[1] !== 0xd8) {
  console.error(`${input} is not a JPEG. Export it as JPEG first.`);
  process.exit(1);
}

const DROP = new Map([
  [0xe1, 'EXIF/XMP'],
  [0xed, 'IPTC'],
  [0xfe, 'comment'],
]);
const kept = [src.subarray(0, 2)];
const removed = new Set();
let orientation = 1;
let hadGps = false;
let foundImageData = false;

// Reads the two EXIF fields that matter here: orientation (stripping it would
// show a rotated photo sideways) and whether a GPS block is present.
function readExif(data) {
  if (data.toString('latin1', 0, 6) !== 'Exif\0\0') return;
  const tiff = data.subarray(6);
  const le = tiff.toString('latin1', 0, 2) === 'II';
  const r16 = (o) => (le ? tiff.readUInt16LE(o) : tiff.readUInt16BE(o));
  const r32 = (o) => (le ? tiff.readUInt32LE(o) : tiff.readUInt32BE(o));
  try {
    const ifd = r32(4);
    const count = r16(ifd);
    for (let k = 0; k < count; k++) {
      const entry = ifd + 2 + k * 12;
      const tag = r16(entry);
      if (tag === 0x0112) orientation = r16(entry + 8);
      if (tag === 0x8825) hadGps = true;
    }
  } catch {
    /* malformed EXIF; it's being dropped anyway */
  }
}

let i = 2;
while (i < src.length) {
  if (src[i] !== 0xff) {
    console.error(`Unexpected byte at offset ${i}; the file may be corrupt.`);
    process.exit(1);
  }
  const marker = src[i + 1];
  if (marker === 0xff) {
    i += 1; // fill byte
    continue;
  }
  if (marker === 0xda) {
    // Start of scan: everything from here on is image data.
    kept.push(src.subarray(i));
    foundImageData = true;
    break;
  }
  const length = src.readUInt16BE(i + 2);
  const segment = src.subarray(i, i + 2 + length);
  if (DROP.has(marker)) {
    removed.add(DROP.get(marker));
    if (marker === 0xe1) readExif(segment.subarray(4));
  } else {
    kept.push(segment);
  }
  i += 2 + length;
}

if (!foundImageData) {
  console.error('No image data found; the file may be corrupt.');
  process.exit(1);
}
if (orientation !== 1) {
  console.error(
    'This photo relies on an EXIF rotation flag, so stripping metadata would show it sideways.\n' +
      'Export it from the Photos app instead (File → Export, Location Information off).',
  );
  process.exit(1);
}

writeFileSync(output, Buffer.concat(kept));
const before = (src.length / 1024).toFixed(0);
const after = (Buffer.concat(kept).length / 1024).toFixed(0);
console.log(`Saved ${output} (${before} KB → ${after} KB).`);
console.log(removed.size ? `Removed: ${[...removed].join(', ')}${hadGps ? ' (including GPS location)' : ''}.` : 'No metadata found to remove.');
