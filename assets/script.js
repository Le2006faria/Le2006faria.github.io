(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var closeBtn = document.getElementById("lightbox-close");
  var lastFocused = null;

  function openLightbox(src, alt, triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lightboxImg.src = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  // Attach click handlers to every card image trigger
  var triggers = document.querySelectorAll(".card__img[data-full]");
  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-alt"), btn);
    });
  });

  // Close interactions
  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    // Close when clicking the backdrop (not the image itself)
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
