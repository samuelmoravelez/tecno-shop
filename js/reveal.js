/**
 * reveal.js — Animación sutil al entrar secciones en viewport.
 * Una sola vez por elemento; respeta prefers-reduced-motion.
 */
(function () {
    "use strict";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("is-visible");
        });
        return;
    }

    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) {
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
        observer.observe(el);
    });
})();
