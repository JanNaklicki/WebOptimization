window.EventHubModal = {
  open: function (html) {
    var overlay = document.createElement("div");
    overlay.className = "eh-modal-overlay";
    overlay.innerHTML =
      '<div class="eh-modal">' + html + '<button type="button" data-close>Zamknij</button></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.getAttribute("data-close") !== null) {
        overlay.remove();
      }
    });
  },
};
