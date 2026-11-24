const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_PATH = path.join(__dirname, "data", "events.json");

/** Baseline: sztuczne opóźnienia (ms) — wyłącz przez BASELINE_LATENCY=0 */
const LATENCY_MS = Number(process.env.BASELINE_LATENCY_MS ?? 800);
const LATENCY_API_MS = Number(process.env.BASELINE_API_LATENCY_MS ?? 1200);
const LATENCY_IMAGE_MS = Number(process.env.BASELINE_IMAGE_LATENCY_MS ?? 450);
const TELEMETRY_PAYLOAD_KB = Number(process.env.BASELINE_TELEMETRY_KB ?? 768);

function sleep(ms) {
  if (!ms || ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readEvents() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function baselineLatencyFor(pathname) {
  if (pathname.startsWith("/images/")) return LATENCY_IMAGE_MS;
  if (pathname.startsWith("/api/")) return LATENCY_API_MS;
  if (pathname === "/" || pathname.endsWith(".html")) return LATENCY_MS;
  if (pathname.startsWith("/css/") || pathname.startsWith("/js/")) return Math.floor(LATENCY_MS * 0.6);
  return Math.floor(LATENCY_MS * 0.4);
}

app.use(async (req, res, next) => {
  await sleep(baselineLatencyFor(req.path));
  next();
});

app.use(express.json());

app.get("/api/telemetry/bootstrap", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const size = TELEMETRY_PAYLOAD_KB * 1024;
  res.json({
    version: "baseline-heavy",
    generatedAt: new Date().toISOString(),
    padding: "X".repeat(size),
  });
});

app.get("/api/events", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(readEvents());
});

app.get("/api/events/:id", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const events = readEvents();
  const event = events.find((e) => String(e.id) === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  return res.json(event);
});

app.use(
  express.static(path.join(__dirname, "public"), {
    etag: false,
    lastModified: false,
    setHeaders(res) {
      res.set("Cache-Control", "no-store");
    },
  })
);

app.listen(PORT, () => {
  console.log(`EventHub (baseline SLOW) at http://localhost:${PORT}`);
  console.log(
    `Latency ms — page: ${LATENCY_MS}, api: ${LATENCY_API_MS}, images: ${LATENCY_IMAGE_MS}`
  );
});
