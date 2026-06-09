const getUsersBtn = document.getElementById("getUsersBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const createBtn = document.getElementById("createBtn");

const loader = document.getElementById("loader");
const message = document.getElementById("message");
const error = document.getElementById("error");
const usersList = document.getElementById("usersList");

const API_URL = "https://dummyjson.com/users";

getUsersBtn.addEventListener("click", getUsers);
searchBtn.addEventListener("click", searchUsers);
createBtn.addEventListener("click", createUser);

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showMessage(text) {
  error.classList.add("hidden");
  message.textContent = text;
  message.classList.remove("hidden");
}

function showError(text) {
  message.classList.add("hidden");
  error.textContent = text;
  error.classList.remove("hidden");
}

async function getUsers() {
  usersList.innerHTML = "";
  message.classList.add("hidden");
  error.classList.add("hidden");
  showLoader();

  try {
    const response = await fetch(API_URL + "?limit=10");

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    const data = await response.json();
    hideLoader();
    renderUsers(data.users);
  } catch (err) {
    hideLoader();
    showError("Failed to load users");
    console.log(err);
  }
}

async function searchUsers() {
  const query = searchInput.value;
  const url = API_URL + "/search?q=" + encodeURIComponent(query);

  usersList.innerHTML = "";
  message.classList.add("hidden");
  error.classList.add("hidden");
  showLoader();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    const data = await response.json();
    hideLoader();
    renderUsers(data.users);
  } catch (err) {
    hideLoader();
    showError("Failed to load users");
    console.log(err);
  }
}

async function createUser() {
  const newUser = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    age: Number(ageInput.value),
    email: emailInput.value,
  };

  showLoader();

  try {
    const response = await fetch(API_URL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    await response.json();
    hideLoader();
    showMessage("User created successfully.");

    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
  } catch (err) {
    hideLoader();
    showError("Failed to create user");
    console.log(err);
  }
}

async function updateUser(id) {
  showLoader();

  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastName: "Shevchenko" }),
    });

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    await response.json();
    hideLoader();
    showMessage("User updated successfully.");
  } catch (err) {
    hideLoader();
    showError("Failed to update user");
    console.log(err);
  }
}

async function deleteUser(id, card) {
  const confirmed = confirm("Delete this user?");
  if (!confirmed) {
    return;
  }

  showLoader();

  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    await response.json();
    hideLoader();
    card.remove();
    showMessage("User deleted successfully.");
  } catch (err) {
    hideLoader();
    showError("Failed to delete user");
    console.log(err);
  }
}

function renderUsers(users) {
  usersList.innerHTML = "";

  if (!users || users.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No users found.";
    usersList.append(empty);
    return;
  }

  users.forEach(function (user) {
    const card = document.createElement("div");
    card.className = "user-card";

    const name = document.createElement("h3");
    name.textContent = user.firstName + " " + user.lastName;

    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    const phone = document.createElement("p");
    phone.textContent = "Телефон: " + user.phone;

    const age = document.createElement("p");
    age.textContent = "Вік: " + user.age;

    const buttons = document.createElement("div");
    buttons.className = "card-buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      updateUser(user.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteUser(user.id, card);
    });

    buttons.append(editBtn, deleteBtn);
    card.append(name, email, phone, age, buttons);
    usersList.append(card);
  });
}
