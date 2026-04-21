import { initUI } from "./ui.js";
import { initContactForm } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  initContactForm();
});
/*document.addEventListener("DOMContentLoaded", init);

function init() {
  initActiveNav();
  initThemeToggle();
  initBackToTop();
  initYear();
  initMenuToggle();
  initAccordion();
  initModal();
  initContactForm();
}

// Активна сторінка
function initActiveNav() {
  const links = document.querySelectorAll(".nav-list a");
  const path = window.location.pathname;

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

// Кнопка вгору
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

// Мобільне меню
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

// Форма
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const textarea = form.querySelector("textarea");
  const counter = document.querySelector(".char-count");
  const result = document.getElementById("result");

  const key = "contactDraft";

  // відновлення
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  Object.keys(saved).forEach((name) => {
    if (form.elements[name]) {
      form.elements[name].value = saved[name];
    }
  });

  // введення
  form.addEventListener("input", () => {
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem(key, JSON.stringify(data));

    if (counter) {
      counter.textContent = `${textarea.value.length}/200`;
    }
  });

  // submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    if (data.name.length < 2) return alert("Ім'я коротке");
    if (!data.email.includes("@")) return alert("Email не ок");
    if (!data.message) return alert("Напиши щось");

    if (result) {
      result.innerHTML = `
        <p>Дякую, ${data.name}!</p>
        <p>${data.message}</p>
      `;
    }

    localStorage.removeItem(key);
    form.reset();
  });
}
*/
