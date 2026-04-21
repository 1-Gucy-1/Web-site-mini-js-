export function initUI() {
  initActiveNav();
  initThemeToggle();
  initBackToTop();
  initYear();
  initMenuToggle();
  initAccordion();
  initModal();
}

// Активна сторінка
function initActiveNav() {
  const links = document.querySelectorAll(".nav-list a");
  const current = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === current) {
      link.classList.add("active");
    }
  });
}

// Тема
function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  const saved = localStorage.getItem("siteTheme");
  if (saved === "dark") {
    document.body.classList.add("theme-dark");
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");

    const theme = document.body.classList.contains("theme-dark")
      ? "dark"
      : "light";

    localStorage.setItem("siteTheme", theme);
  });
}

// Вгору
function initBackToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.hidden = window.scrollY < 200;
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Рік
function initYear() {
  const footer = document.querySelector(".site-footer p");
  if (footer) {
    footer.textContent = `© ${new Date().getFullYear()}`;
  }
}

// Меню
function initMenuToggle() {
  const btn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-list");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}

// Акордеон
function initAccordion() {
  const btns = document.querySelectorAll(".acc-btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.hidden = !content.hidden;
    });
  });
}

// Модалка
function initModal() {
  const modal = document.querySelector(".modal");
  const modalImg = document.getElementById("modal-img");
  const images = document.querySelectorAll("img");

  if (!modal) return;

  images.forEach((img) => {
    img.addEventListener("click", () => {
      modal.hidden = false;
      modalImg.src = img.src;
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  });
}
