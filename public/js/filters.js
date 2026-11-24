/**
 * Placeholder filter helpers — loaded on events page for extra request count.
 */
window.EventHubFilters = {
  normalize: function (value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  },
  matchCity: function (eventCity, query) {
    var q = this.normalize(query);
    if (!q) return true;
    return this.normalize(eventCity).indexOf(q) !== -1;
  },
};
