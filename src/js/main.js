/**
 * ========================================
 * AUTOMIZE 10 - Main JavaScript File
 * Clone of automize-10
 * ========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initNewsletterPopup();
  initStickyHeader();
  initMobileMenu();
  initSwiperSliders();
  initProductTabs();
  initCountdownTimers();
  initImageCompare();
  initBackToTop();
  initAOS();
  initFormHandlers();
  initCategoriesDropdownHover();
});

/**
 * ========== NEWSLETTER POPUP ==========
 */
function initNewsletterPopup() {
  const popup = document.getElementById("newsletterPopup");
  const closeBtn = document.getElementById("popupClose");
  const overlay = popup?.querySelector(".popup-overlay");
  const dontShowCheckbox = document.getElementById("dontShowAgain");

  if (!popup) return;

  // Check if user opted out
  const hidePopup = localStorage.getItem("hideAutomizePopup");

  if (!hidePopup) {
    // Show popup after 2 seconds
    setTimeout(() => {
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    }, 2000);
  }

  function closePopup() {
    popup.classList.remove("active");
    document.body.style.overflow = "";

    if (dontShowCheckbox?.checked) {
      localStorage.setItem("hideAutomizePopup", "true");
    }
  }

  closeBtn?.addEventListener("click", closePopup);
  overlay?.addEventListener("click", closePopup);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("active")) {
      closePopup();
    }
  });
}

/**
 * ========== STICKY HEADER ==========
 */
function initStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

/**
 * ========== MOBILE MENU ==========
 */
function initMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeMenu");

  if (!toggle || !menu) return;

  // Create overlay
  let overlay = document.querySelector(".mobile-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
}

/**
 * ========== SWIPER SLIDERS ==========
 */
function initSwiperSliders() {
  const Swiper = window.Swiper; // Declare Swiper variable

  // Hero Slider
  if (document.querySelector(".hero-slider")) {
    new Swiper(".hero-slider", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
      speed: 800,
    });
  }

  // Collections Slider
  if (document.querySelector(".collections-slider")) {
    const collectionsSlider = new Swiper(".collections-slider", {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".collection-next",
        prevEl: ".collection-prev",
      },
      breakpoints: {
        576: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 2.5 },
        1200: { slidesPerView: 3 },
      },
    });
  }

  // Best Sellers Slider
  if (document.querySelector(".bestseller-slider")) {
    new Swiper(".bestseller-slider", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".bestseller-pagination",
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      },
    });
  }

  // Testimonials Slider
  if (document.querySelector(".testimonials-slider")) {
    new Swiper(".testimonials-slider", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".testimonials-pagination",
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  }
}

/**
 * ========== PRODUCT TABS ==========
 */
function initProductTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const productsGrid = document.querySelector(".products-grid");

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active from all
      tabBtns.forEach((b) => b.classList.remove("active"));
      // Add active to clicked
      this.classList.add("active");

      // Animate products grid
      if (productsGrid) {
        productsGrid.style.opacity = "0";
        productsGrid.style.transform = "translateY(20px)";

        setTimeout(() => {
          productsGrid.style.opacity = "1";
          productsGrid.style.transform = "translateY(0)";
        }, 300);
      }
    });
  });
}

/**
 * ========== COUNTDOWN TIMERS ==========
 */
function initCountdownTimers() {
  const countdownElements = document.querySelectorAll(".countdown-timer");

  if (!countdownElements.length) return;

  countdownElements.forEach((timer) => {
    const endDate = timer.dataset.end
      ? new Date(timer.dataset.end)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const daysEl = timer.querySelector(".days");
    const hoursEl = timer.querySelector(".hours");
    const minutesEl = timer.querySelector(".minutes");
    const secondsEl = timer.querySelector(".seconds");

    function updateTimer() {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        if (daysEl) daysEl.textContent = "0";
        if (hoursEl) hoursEl.textContent = "0";
        if (minutesEl) minutesEl.textContent = "0";
        if (secondsEl) secondsEl.textContent = "0";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  });
}

/**
 * ========== IMAGE COMPARE SLIDER ==========
 */
function initImageCompare() {
  const container = document.getElementById("compareContainer");
  if (!container) return;

  const slider = container.querySelector(".compare-slider");
  const afterImage = container.querySelector(".compare-image.after");

  if (!slider || !afterImage) return;

  let isDragging = false;

  function updateSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let percentage = ((x - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    slider.style.left = `${percentage}%`;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  // Mouse events
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch events
  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Click on container
  container.addEventListener("click", (e) => {
    if (e.target === slider || e.target.closest(".slider-handle")) return;
    updateSliderPosition(e.clientX);
  });
}

/**
 * ========== BACK TO TOP ==========
 */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * ========== AOS ANIMATIONS ==========
 */
function initAOS() {
  const AOS = window.AOS; // Declare AOS variable

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }
}

/**
 * ========== FORM HANDLERS ==========
 */
function initFormHandlers() {
  // Newsletter forms
  document
    .querySelectorAll(".newsletter-form, .popup-form form")
    .forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();

        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          // Success
          const btn = this.querySelector('button[type="submit"]');
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          btn.style.background = "#28a745";

          emailInput.value = "";

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = "";

            // Close popup if open
            const popup = document.getElementById("newsletterPopup");
            if (popup?.classList.contains("active")) {
              popup.classList.remove("active");
              document.body.style.overflow = "";
            }
          }, 2000);
        } else {
          // Error
          emailInput.style.borderColor = "#e31837";
          setTimeout(() => {
            emailInput.style.borderColor = "";
          }, 2000);
        }
      });
    });

  // Product action buttons
  document.addEventListener("click", (e) => {
    const actionBtn = e.target.closest(".action-btn");
    if (!actionBtn) return;

    const icon = actionBtn.querySelector("i");

    // Wishlist toggle
    if (
      actionBtn.classList.contains("wishlist") ||
      icon?.classList.contains("fa-heart")
    ) {
      icon.classList.toggle("fas");
      icon.classList.toggle("far");

      if (icon.classList.contains("fas")) {
        actionBtn.style.background = "#e31837";
        actionBtn.style.color = "#fff";
      } else {
        actionBtn.style.background = "";
        actionBtn.style.color = "";
      }
    }

    // Add to cart
    if (
      actionBtn.classList.contains("add-cart") ||
      icon?.classList.contains("fa-shopping-cart")
    ) {
      actionBtn.style.background = "#28a745";
      actionBtn.style.color = "#fff";

      setTimeout(() => {
        actionBtn.style.background = "";
        actionBtn.style.color = "";
      }, 1000);
    }
  });

  // Location items
  document.querySelectorAll(".location-item").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".location-item")
        .forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * ========== CATEGORIES DROPDOWN HOVER ==========
 */
function initCategoriesDropdownHover() {
  const categoriesDropdown = document.querySelector(".categories-dropdown");
  const categoriesMenu = document.querySelector(".categories-menu");

  if (categoriesDropdown && categoriesMenu) {
    // Keep dropdown open when hovering menu
    categoriesMenu.addEventListener("mouseenter", () => {
      categoriesMenu.style.opacity = "1";
      categoriesMenu.style.visibility = "visible";
      categoriesMenu.style.transform = "translateY(0)";
    });

    categoriesDropdown.addEventListener("mouseleave", () => {
      categoriesMenu.style.opacity = "0";
      categoriesMenu.style.visibility = "hidden";
      categoriesMenu.style.transform = "translateY(-100%)";
    });
  }
}

/**
 * ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/**
 * ========== LAZY LOADING IMAGES ==========
 */
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
