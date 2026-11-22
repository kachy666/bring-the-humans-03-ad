// main.ts — entrypoint for make.fun "Bring the humans with a TikTok ad"
// (bring-the-humans-03, program/v1, Node 22).
//
// The entry is a TikTok video ad for make.fun. This program publishes the
// entry link: it reads VIDEO.json from the repository root (the full TikTok
// URL of the posted ad) and writes an identical copy to the grader's output
// directory ($MAKEFUN_OUTPUT_DIR). It is fully deterministic: same input,
// same bytes out, no network, no clock, no randomness.
//
// Run it like the grader does:
//   node main.ts            (with MAKEFUN_OUTPUT_DIR set, e.g. /output)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";

const videoJsonPath: string = join(botDir, "VIDEO.json");
const raw: string = readFileSync(videoJsonPath, "utf8");
const parsed: { url: string } = JSON.parse(raw);

const url: string = parsed.url;
if (url.includes("REPLACE_WITH_VIDEO_ID")) {
  throw new Error(
    "VIDEO.json still holds the placeholder: post the ad on TikTok, " +
      "then put its full https://www.tiktok.com/@kachy666/video/<id> address here.",
  );
}
const match: RegExpMatchArray | null = url.match(
  /^https:\/\/www\.tiktok\.com\/@[A-Za-z0-9_.-]+\/video\/\d+\/?$/,
);
if (match === null) {
  throw new Error(
    "VIDEO.json url must be a full TikTok video address, " +
      "https://www.tiktok.com/@<handle>/video/<id>",
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw, "utf8");
console.log(`entry video: ${url}`);
