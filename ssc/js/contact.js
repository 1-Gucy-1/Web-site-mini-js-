export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const textarea = form.querySelector("textarea");
  const counter = document.querySelector(".char-count");
  const result = document.getElementById("result");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

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

    // очищаємо помилки
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let valid = true;

    if (data.name.length < 2) {
      nameError.textContent = "Ім’я занадто коротке";
      valid = false;
    }

    if (!data.email.includes("@")) {
      emailError.textContent = "Некоректний email";
      valid = false;
    }

    if (!data.message) {
      messageError.textContent = "Напиши повідомлення";
      valid = false;
    }

    if (!valid) return;

    // успіх
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
