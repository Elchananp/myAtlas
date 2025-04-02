const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const pushToLocalStorage = (element, favoritesArr, arrayData) => {
  const country = arrayData.find((item) => item.name.common === element);
  // if (!favoritesArr.some((item) => item.name.common === element)) {
  if (!isItemInLocalStorage(element)) {
    favoritesArr.push(country);

    localStorage.setItem("favorites", JSON.stringify(favoritesArr));
  }
};

const removeFromLocalStorage = (element, favoritesArr) => {
  const index = favoritesArr.findIndex((item) => item.name.common === element);
  if (index !== -1) {
    favoritesArr.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favoritesArr));
  }
};

const localStorageManager = (element, favoritesArr, arrayData, btn) => {
  if (btn.textContent.trim() === "Save") {
    pushToLocalStorage(element, favoritesArr, arrayData);
    btn.textContent = "Remove";
    btn.classList.add("btn-danger");
    btn.classList.remove("btn-success");
  } else {
    removeFromLocalStorage(element, favoritesArr);
    btn.textContent = "Save";
    btn.classList.add("btn-success");
    btn.classList.remove("btn-danger");

  }
};

const isItemInLocalStorage = (itemName) => {
  const itemExists = favorites.some((item) => item.name.common === itemName);

  return itemExists;
};

export { favorites, localStorageManager, isItemInLocalStorage };
