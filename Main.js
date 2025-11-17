document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // === THEME TOGGLE ===
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  } else {
    root.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // === MOBILE NAVIGATION ===
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburger && navMenu && navOverlay) {
    const toggleNav = () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        navMenu.classList.remove("open");
        navOverlay.classList.remove("show");
        hamburger.textContent = "☰";
      } else {
        navMenu.classList.add("open");
        navOverlay.classList.add("show");
        hamburger.textContent = "✕";
      }
    };

    hamburger.addEventListener("click", toggleNav);
    navOverlay.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navOverlay.classList.remove("show");
      hamburger.textContent = "☰";
    });
  }

  // === ACCORDION ===
  function initAccordion(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    const items = container.querySelectorAll(".accordion-item");
    items.forEach((item) => {
      const toggle = item.querySelector(".accordion-toggle");
      const panel = item.querySelector(".accordion-panel");

      // Click handler for toggle button
      toggle.addEventListener("click", () => {
        const isOpen = panel.classList.contains("open");

        // Close all open panels
        container.querySelectorAll(".accordion-panel.open").forEach((p) => {
          p.classList.remove("open");
          p.previousElementSibling.setAttribute("aria-expanded", "false");
          p.hidden = true;
        });

        // Open current if it was closed
        if (!isOpen) {
          panel.classList.add("open");
          panel.hidden = false;
          toggle.setAttribute("aria-expanded", "true");
        } else {
          toggle.setAttribute("aria-expanded", "false");
          panel.hidden = true;
        }
      });

      // Keyboard accessibility: Enter or Space to toggle
      toggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle.click();
        }
      });
    });
  }
  initAccordion(".accordion");
  initAccordion(".faq-accordion");

  // === SMOOTH SCROLL FOR INTERNAL LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = document.querySelector(el.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // === SIMPLE FORM SUBMIT ===
  const form = document.getElementById("enroll");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks! Our counselor will contact you within 24 hours.");
    form.reset();
  });
});
