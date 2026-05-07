const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const backTop = document.querySelector(".back-top");
const galleryCards = document.querySelectorAll("[data-lightbox-src]");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target.matches("a")) {
            siteNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

if (backTop) {
    window.addEventListener("scroll", () => {
        backTop.classList.toggle("is-visible", window.scrollY > 520);
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function updateHeaderBlur() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderBlur();
window.addEventListener("scroll", updateHeaderBlur);

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
}

galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        lightboxImg.src = card.dataset.lightboxSrc;
        lightboxImg.alt = card.dataset.lightboxAlt || "";
        lightboxCaption.textContent = card.dataset.lightboxCaption || "";
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
