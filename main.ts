import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Understood";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT ?? "/output";

if (TEXT.length < 1 || TEXT.length > 99) {
  throw new Error(`text length must be 1-99 characters, got ${TEXT.length}`);
}

if (TEXT.trim() !== TEXT || TEXT.split(/\s+/).length !== 1) {
  throw new Error("text must be exactly one word with no spaces");
}

if (/\s/.test(TEXT)) {
  throw new Error("text must contain no whitespace");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), TEXT + "\n", "utf8");

const written = readFileSync(join(OUTPUT_DIR, "entry.txt"), "utf8");
if (written !== TEXT + "\n") {
  throw new Error("written entry does not match expected text");
}
