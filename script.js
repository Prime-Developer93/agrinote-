"use strict";

(function () {
  var header = document.querySelector(".site-header");
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("site-nav");

  // Mobile menu
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  burger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Header shadow after scrolling (light and throttled)
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
        ticking = false;
      });
    },
    { passive: true }
  );

  // Gentle reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Keep the APK link working from any GitHub Pages repo:
  // https://USER.github.io/REPO/  ->  https://github.com/USER/REPO/releases/latest/download/AgriNote.apk
  try {
    var host = location.hostname;
    var repo = location.pathname.split("/")[1];
    if (/\.github\.io$/.test(host) && repo) {
      var apk = "https://github.com/" + host.split(".")[0] + "/" + repo + "/releases/latest/download/AgriNote.apk";
      document.querySelectorAll("a[data-apk]").forEach(function (a) { a.href = apk; });
    }
  } catch (e) {}

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
