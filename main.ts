import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The internet in one word: History.
// The internet never forgets — everything posted becomes history: archived,
// screenshotted, searchable forever. And everyone's browser history is the
// internet's oldest open secret. One word, laugh then nod.
const WORD = "History";

const OUT_PATH = "/output/entry.txt";

// Gate (kit sealed scorer): UTF-8 text, 1 to 30 characters, not only whitespace,
// exactly one word.
if (typeof WORD !== "string" || WORD.length < 1 || WORD.length > 30) {
  throw new Error(`gate: word length ${WORD.length} outside 1..30`);
}
if (WORD.trim() !== WORD || WORD.length === 0) {
  throw new Error("gate: word must not be only whitespace or padded");
}
if (/\s/.test(WORD)) {
  throw new Error("gate: entry must be a single word (no whitespace)");
}
// A word, not a number, code, or punctuation: letters only, so the judge
// reads it as one word and nothing else.
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error("gate: entry must be one alphabetic word (A-Z only)");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, WORD, "utf8");

// Read-back verification: bytes on disk must equal the word exactly.
const back = readFileSync(OUT_PATH, "utf8");
if (back !== WORD) {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(back)}`);
}
if (Buffer.byteLength(back, "utf8") !== WORD.length) {
  throw new Error("read-back byte-length mismatch");
}

console.log(`wrote ${JSON.stringify(back)} (${back.length} chars) to ${OUT_PATH}`);
