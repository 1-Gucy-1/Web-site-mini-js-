const getUsersBtn = document.getElementById("getUsersBtn");
const loader = document.getElementById("loader");
const usersList = document.getElementById("usersList");
const controls = document.getElementById("controls");
const searchInput = document.getElementById("searchInput");
const cityFilter = document.getElementById("cityFilter");
const sortSelect = document.getElementById("sortSelect");

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "favoriteUsers";

let allUsers = [];

getUsersBtn.addEventListener("click", getUsers);
searchInput.addEventListener("input", updateList);
cityFilter.addEventListener("change", updateList);
sortSelect.addEventListener("change", updateList);

async function getUsers() {
  usersList.innerHTML = "";
  controls.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Помилка запиту: " + response.status);
    }

    allUsers = await response.json();
    loader.classList.add("hidden");
    controls.classList.remove("hidden");

    fillCityFilter(allUsers);
    updateList();
  } catch (error) {
    loader.classList.add("hidden");
    showError();
    console.log(error);
  }
}

function fillCityFilter(users) {
  const cities = [];

  users.forEach(function (user) {
    if (!cities.includes(user.address.city)) {
      cities.push(user.address.city);
    }
  });

  cityFilter.innerHTML = '<option value="all">All cities</option>';

  cities.forEach(function (city) {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.append(option);
  });
}

function searchUsers(users, query) {
  const text = query.toLowerCase();

  return users.filter(function (user) {
    return (
      user.name.toLowerCase().includes(text) ||
      user.username.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text) ||
      user.company.name.toLowerCase().includes(text) ||
      user.address.city.toLowerCase().includes(text)
    );
  });
}

function filterByCity(users, city) {
  if (city === "all") {
    return users;
  }

  return users.filter(function (user) {
    return user.address.city === city;
  });
}

function sortUsers(users, sortType) {
  const sorted = users.slice();

  sorted.sort(function (a, b) {
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortType === "username") {
      return a.username.localeCompare(b.username);
    }
    if (sortType === "city") {
      return a.address.city.localeCompare(b.address.city);
    }
    if (sortType === "company") {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  return sorted;
}

function updateList() {
  let result = searchUsers(allUsers, searchInput.value);
  result = filterByCity(result, cityFilter.value);
  result = sortUsers(result, sortSelect.value);

  renderUsers(result);
}

function getFavorites() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(function (favId) {
      return favId !== id;
    });
  } else {
    favorites.push(id);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function renderUsers(users) {
  usersList.innerHTML = "";

  if (users.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No users found.";
    usersList.append(empty);
    return;
  }

  const favorites = getFavorites();

  users.forEach(function (user) {
    const card = document.createElement("div");
    card.className = "user-card";

    const favBtn = document.createElement("button");
    favBtn.className = "fav-btn";
    favBtn.textContent = "★";
    if (favorites.includes(user.id)) {
      favBtn.classList.add("active");
    }
    favBtn.addEventListener("click", function () {
      toggleFavorite(user.id);
      favBtn.classList.toggle("active");
    });

    const name = document.createElement("h2");
    name.textContent = user.name;

    const username = document.createElement("p");
    username.textContent = "Username: " + user.username;

    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    const phone = document.createElement("p");
    phone.textContent = "Телефон: " + user.phone;

    const city = document.createElement("p");
    city.textContent = "Місто: " + user.address.city;

    const company = document.createElement("p");
    company.textContent = "Компанія: " + user.company.name;

    const website = document.createElement("p");
    website.textContent = "Website: " + user.website;

    card.append(favBtn, name, username, email, phone, city, company, website);
    usersList.append(card);
  });
}

function showError() {
  const errorMessage = document.createElement("p");
  errorMessage.className = "error";
  errorMessage.textContent = "Failed to load users";
  usersList.append(errorMessage);
}
