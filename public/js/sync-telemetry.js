/**
 * Baseline: synchroniczne XHR (blokuje parser + czeka na API z dużym JSON).
 */
(function syncTelemetryBootstrap() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/telemetry/bootstrap", false);
    xhr.send(null);
    window.__eventHubTelemetry = xhr.responseText.length;
  } catch (e) {
    window.__eventHubTelemetry = -1;
  }
})();
