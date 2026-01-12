/* =====================================================
   MAIN JS – ALL FEATURES IN ONE FILE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =======================
       SWIPER INIT
    ======================= */
    if (typeof Swiper !== "undefined") {
        new Swiper(".mySwiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
            },
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
        });
    }

    /* =======================
       MOBILE MENU
    ======================= */
    const menuBtn = document.getElementById("menuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = !mobileNav.classList.contains("hidden");
            mobileNav.classList.toggle("hidden");
            menuBtn.setAttribute("aria-expanded", String(!isOpen));
            menuBtn.innerHTML = isOpen
                ? '<i class="fa-solid fa-bars text-lg"></i>'
                : '<i class="fa-solid fa-times text-lg"></i>';
        });

        mobileNav.querySelectorAll("a").forEach((a) => {
            a.addEventListener("click", () => mobileNav.classList.add("hidden"));
        });
    }

    /* =======================
       SMOOTH SCROLL
    ======================= */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const el = document.querySelector(targetId);
            if (!el) return;

            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    /* =======================
       SCROLL ANIMATIONS
    ======================= */
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove(
                        "opacity-0",
                        "translate-y-8",
                        "translate-x-8",
                        "translate-x-[-20px]",
                        "translate-x-[20px]",
                        "scale-95"
                    );
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
    });

   
    // setTimeout(openPopup, 6000);

    /* =======================
       FORM SUBMIT
    ======================= */
    window.handleFormSubmit = function (e) {
        e.preventDefault();
        closePopup();
        // window.location.href = "Thankyou.html";
    };

    /* =======================
       IMAGE VIEWER
    ======================= */
    const viewer = document.getElementById("imageViewer");
    const viewerImg = document.getElementById("viewerImage");

    let galleryImages = [];
    let currentIndex = 0;

    window.openViewer = function (img) {
        galleryImages = Array.from(document.querySelectorAll("#gallery img"));
        currentIndex = galleryImages.indexOf(img);
        viewerImg.src = img.src;
        viewer.classList.remove("hidden");
        viewer.classList.add("flex");
    };

    window.closeViewer = function () {
        viewer.classList.add("hidden");
        viewer.classList.remove("flex");
    };

    window.nextImage = function () {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        viewerImg.src = galleryImages[currentIndex].src;
    };

    window.prevImage = function () {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        viewerImg.src = galleryImages[currentIndex].src;
    };

    if (viewer) {
        viewer.addEventListener("click", (e) => {
            if (e.target === viewer) closeViewer();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!viewer || viewer.classList.contains("hidden")) return;

        if (e.key === "Escape") closeViewer();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const popupModal = document.getElementById("popupModal");
    const popupContent = document.getElementById("popupContent");
    const closePopupBtn = document.getElementById("closeBtnWebsites");
   console.log(popupModal);
   console.log(popupContent);
   console.log(closePopupBtn);
   
    let popupShown = false;
    console.log(popupShown);
    
    function openPopup() {
        if (!popupModal || popupShown) return;
        popupShown = true;

        popupModal.classList.remove("hidden");

        // Animate
        setTimeout(() => {
            popupContent.classList.remove("scale-95", "opacity-0");
            popupContent.classList.add("scale-100", "opacity-100");
        }, 10);
    }

    function closePopup() {
        if (!popupModal) return;
        setTimeout(() => {
            popupModal.classList.add("hidden");
            popupShown = false;
        }, 300);
    }

    // Expose globally if needed
    window.openPopup = openPopup;
    window.closePopup = closePopup;

    // Close button listener
    if (closePopupBtn) {
     closePopupBtn.addEventListener("click", (e) => {
    console.log("Button clicked!");
    e.stopPropagation();
    closePopup();
});

    }

    // Close when clicking outside popup content
    if (popupModal) {
        popupModal.addEventListener("click", (e) => {
            if (!popupContent.contains(e.target)) closePopup();
        });
    }

    // Form submit handler
    window.handleFormSubmit = function (e) {
        e.preventDefault();
        closePopup();
        // You can redirect after form submission if needed
        // window.location.href = "Thankyou.html";
    };

    // Optional: Auto open after delay
    setTimeout(openPopup, 30000);
});
