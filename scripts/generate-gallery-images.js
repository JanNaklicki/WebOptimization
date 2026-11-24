/**
 * Creates responsive WebP variants from the 4K baseline JPEG files.
 *
 * The originals stay untouched so they can still be used as the baseline and
 * as a fallback for browsers without WebP support.
 */
const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join(__dirname, "..", "public", "images");
const OUTPUT_DIR = path.join(SOURCE_DIR, "optimized");
const WIDTHS = [480, 960, 1600];
const QUALITY = 78;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

async function main() {
  const { optimizeImage } = await import("wasm-image-optimization");
  const sourceFiles = fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => /^gallery-\d{2}\.jpg$/.test(file))
    .sort();

  if (sourceFiles.length === 0) {
    throw new Error(`No baseline JPEG files found in ${SOURCE_DIR}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedFiles = [];
  let totalBytes = 0;

  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(SOURCE_DIR, sourceFile);
    const source = fs.readFileSync(sourcePath);
    const stem = path.basename(sourceFile, ".jpg");

    for (const width of WIDTHS) {
      const result = await optimizeImage({
        image: source,
        width,
        format: "webp",
        quality: QUALITY,
        fit: "contain",
      });
      const outputName = `${stem}-${width}.webp`;
      const outputPath = path.join(OUTPUT_DIR, outputName);
      const output = Buffer.from(result.data);

      fs.writeFileSync(outputPath, output);
      totalBytes += output.length;
      generatedFiles.push(outputPath);
      console.log(`${outputName}: ${result.width}x${result.height}, ${formatMiB(output.length)}`);
    }
  }

  if (totalBytes > MAX_TOTAL_BYTES) {
    throw new Error(
      `Optimized image set is ${formatMiB(totalBytes)}; the limit is ${formatMiB(MAX_TOTAL_BYTES)}.`
    );
  }

  console.log(
    `\nGenerated ${generatedFiles.length} responsive WebP files (${formatMiB(totalBytes)} total).`
  );
  console.log(`Budget remaining: ${formatMiB(MAX_TOTAL_BYTES - totalBytes)}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
