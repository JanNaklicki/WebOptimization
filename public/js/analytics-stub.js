/**
 * Fake analytics bundle — baseline render-blocking script (not minified).
 */
(function analyticsStub(global) {
  var queue = [];

  function track(eventName, payload) {
    queue.push({ eventName: eventName, payload: payload || {}, at: Date.now() });
    if (global.console && global.console.log) {
      global.console.log("[EventHub Analytics]", eventName, payload);
    }
  }

  global.EventHubAnalytics = {
    track: track,
    flush: function () {
      return queue.slice();
    },
  };

  track("page_init", { version: "baseline-0.1.0" });
})(window);
