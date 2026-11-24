/**
 * Baseline: synchroniczna praca na wątku głównym (celowo wysoki TBT).
 */
(function heavyMainThreadBlock() {
  var blockMs = 1500;
  var start = Date.now();
  while (Date.now() - start < blockMs) {
    Math.hypot(Math.random(), Math.random(), Math.random());
  }
  if (window.EventHubAnalytics) {
    window.EventHubAnalytics.track("heavy_main_thread_done", { blockMs: blockMs });
  }
})();
