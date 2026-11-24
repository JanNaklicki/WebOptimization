(function () {
  function initCarousel(root) {
    if (!root) return;
    var items = root.querySelectorAll("[data-carousel-item]");
    if (items.length === 0) return;
    var index = 0;
    setInterval(function () {
      items[index].classList.remove("active");
      index = (index + 1) % items.length;
      items[index].classList.add("active");
    }, 4000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCarousel(document.querySelector("[data-carousel]"));
  });
})();
