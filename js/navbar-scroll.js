/**
 * navbar-scroll.js
 *
 * Oculta la barra de navegación al hacer scroll hacia abajo y la muestra
 * al hacer scroll hacia arriba. Requiere JavaScript porque CSS no puede
 * detectar la dirección del scroll (solo la posición).
 */
(function () {
    "use strict";

    var header = document.querySelector(".header-bar");
    if (!header) {
        return;
    }

    /* Si el usuario prefiere menos movimiento, no aplicamos el comportamiento */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    var lastScrollY = window.scrollY;
    var ticking = false;

    /* Píxeles mínimos de desplazamiento para considerar cambio de dirección */
    var SCROLL_THRESHOLD = 8;

    /* Cerca del inicio de la página la barra siempre permanece visible */
    var TOP_VISIBLE_OFFSET = 24;

    function updateNavbar() {
        var currentScrollY = window.scrollY;

        if (currentScrollY <= TOP_VISIBLE_OFFSET) {
            header.classList.remove("header-bar--hidden");
        } else if (currentScrollY > lastScrollY + SCROLL_THRESHOLD) {
            /* Scroll hacia abajo → ocultar */
            header.classList.add("header-bar--hidden");
        } else if (currentScrollY < lastScrollY - SCROLL_THRESHOLD) {
            /* Scroll hacia arriba → mostrar */
            header.classList.remove("header-bar--hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener(
        "scroll",
        function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        },
        { passive: true }
    );
})();
