import {
  insertToDropList,
  closeNavbarOnMainClick,
  dropdownMenu,
} from "./navbar.js";
import { createModal, updateModal } from "./modal.js";
import {
  cardsPerPage,
  currentPage,
  nextBtn,
  prevBtn,
  createPageNavigation,
  getCardsPerPage,
  changeBtnNavigation,
  setCurrentPage,
} from "./pagination.js";
import { renderMap, removeMap } from "./map.js";
import {
  favorites,
  localStorageManager,
  isItemInLocalStorage,
} from "./favorites.js";
let arrayData = [];
let isInFavoritesPage = false;

const url = "https://restcountries.com/v3.1/all";
const containerCards = document.querySelector(".container-cards");

// document.addEventListener("DOMContentLoaded", function () {

//   const myModal = new bootstrap.Modal(
//     document.getElementById("staticBackdrop")
//   );
//   // setTimeout(() => {
//   //   myModal.show()
//   // },5000)

//   myModal.show()

// });
async function getData(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch: " + res.status);

    let data = await res.json();

    // console.log(data.find((item) => item.name.common === "Israel"));

    console.log(data);
    // console.log(data[0]);
    // insertToDropList(data);
    // renderCards(getCardsPerPage(data.slice(0, 20)));
    // renderCards(getCardsPerPage(data))

    // renderCards(data);
    // arrayData = data;
    // console.log(arrayData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const search = (data) => {
  console.log(data);

  const searchInput = document.querySelector(".form-control");
  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = data.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchValue) ||
        country.name.official.toLowerCase().includes(searchValue)
      );
    });
    // console.log(data);

    console.log(e.target.value);
    console.log(filteredData);
    renderCards(getCardsPerPage(filteredData));
  });
};

const init = async () => {
  const data = await getData(url);
  arrayData = data;
  console.log(arrayData);
  // listeners();

  listeners();
  insertToDropList(arrayData);
  renderCards(getCardsPerPage(arrayData));
};

// const renderCards = (data) => {
//   const cards = data
//     .map((item) => {
//       return `<div class="card" data-of-country="${item.name.common}" style="width: 18rem; id="${item.name.common}">
//             <img src="${item.flags.png}" class="card-img-top" alt="Flag of ${item.name.common}">
//             <div class="card-body">
//               <h5 class="card-title">${item.name.common}</h5>
//               <p class="card-text"><strong>continents: </strong> ${item.continents}</p>
//               <a href="#" id="localStorage" class="btn btn-primary"> Save</a>
//             </div>
//         </div>`;
//     })
//     .join("");
//   containerCards.innerHTML = cards;
// };

const renderCards = (data) => {
  const cards = data
    .map((item) => {
      const countryName = item.name.common;

      // בודקים אם המדינה כבר ב-localStorage
      const isInStorage = isItemInLocalStorage(countryName);

      // בוחרים את הטקסט והקלאס של הכפתור לפי אם המדינה נמצאת או לא ב-localStorage
      const buttonText = isInStorage ? "Remove" : "Save";
      const buttonClass = isInStorage ? "btn-danger" : "btn-success";

      return `<div class="card" data-of-country="${countryName}" style="width: 18rem;" id="${countryName}">
            <img src="${item.flags.png}" class="card-img-top" alt="Flag of ${countryName}">
            <div class="card-body">
              <h5 class="card-title">${countryName}</h5>
              <p class="card-text"><strong>continents: </strong> ${item.continents}</p>
              <a href="#" id="localStorage" class="btn ${buttonClass}">${buttonText}</a>
            </div>
        </div>`;
    })
    .join("");

  containerCards.innerHTML = cards;
};

const navbarListener = () => {
  const navbar = document.querySelector(".navbar");
  
  const navbarToggler = document.querySelector(".navbar-toggler"); // כפתור ה-navbar-toggler


  navbar.addEventListener("click", (e) => {
    if (e.target === navbarToggler) {
      return;
    }

    if (e.target.textContent.trim() === "Home") {
      renderCards(getCardsPerPage(arrayData));
      isInFavoritesPage = false;
    } else if (e.target.textContent.trim() === "Favorites") {
      if (favorites && favorites.length > 0) {
        renderCards(getCardsPerPage(favorites));
        isInFavoritesPage = true;
        console.log(isInFavoritesPage);
      } else {
        document.querySelector(
          ".container-cards"
        ).innerHTML = `<h2 class="text-center">No favorites yet</h2>`;
      }
    } else {
      isInFavoritesPage = false;
    }
  });
};

// const renderCards = (data) => {
//   const favoritesArr = JSON.parse(localStorage.getItem("favorites")) || [];

//   const cards = data
//     .map((item) => {
//       // בדיקה אם המדינה קיימת בלוקאל סטורג'
//       const isSaved = favoritesArr.some(fav => fav.name.common === item.name.common);

//       return `<div class="card" data-of-country="${item.name.common}" style="width: 18rem;" id="${item.name.common}">
//             <img src="${item.flags.png}" class="card-img-top" alt="Flag of ${item.name.common}">
//             <div class="card-body">
//               <h5 class="card-title">${item.name.common}</h5>
//               <p class="card-text"><strong>Continents: </strong> ${item.continents}</p>
//               <a href="#" id="localStorage" class="btn ${isSaved ? "btn-success" : "btn-primary"}">
//                 ${isSaved ? "Saved" : "Save"}
//               </a>
//             </div>
//         </div>`;
//     })
//     .join("");

//   containerCards.innerHTML = cards;
// };

// const listenerToPaginationBtn = (data) => {
//   console.log(data);

//   const totalPages = Math.ceil(data.length / cardsPerPage);

//   document.querySelector(".pagination").addEventListener("click", (e) => {
//     const btnAction = e.target.closest(".page-link"); // מבטיח שלחצת על כפתור
//     console.log(data);

//     if (!btnAction) return; // אם לא לחצו על כפתור – לא לעשות כלום

//     const btnText = btnAction.textContent.trim(); // תוכן הכפתור

//     if (btnText === "Previous") {
//       if (currentPage > 0) {
//         // currentPage--;
//         setCurrentPage(currentPage - 1)
//       }
//     } else if (btnText === "Next") {
//       if (currentPage < totalPages - 1) {
//         // currentPage++;
//         setCurrentPage(currentPage + 1)
//       }
//     } else {
//       const pageNumber = Number(btnText); // ממיר את הטקסט למספר
//       if (!isNaN(pageNumber)) {
//         // currentPage = pageNumber - 1; // מעדכן את העמוד
//         setCurrentPage(pageNumber - 1)
//       }
//     }
//     renderCards(getCardsPerPage(data))
//     console.log(data);

//     console.log("Current Page:", currentPage); // לבדיקה
//   });
// };

// const listenerToPaginationBtn = (data) => {
//   const totalPages = Math.ceil(data.length / cardsPerPage);

//   document.querySelector(".pagination").addEventListener("click", (e) => {
//     const btnAction = e.target.closest(".page-link"); // מבטיח שלחצת על כפתור

//     if (!btnAction) return; // אם לא לחצו על כפתור – לא לעשות כלום

//     const btnText = btnAction.textContent.trim(); // תוכן הכפתור

//     if (btnText === "Previous") {
//       if (currentPage > 0) {
//         currentPage--;
//       }
//     } else if (btnText === "Next") {
//       if (currentPage < totalPages - 1) {
//         currentPage++;
//       }
//     } else {
//       const pageNumber = Number(btnText); // ממיר את הטקסט למספר
//       if (!isNaN(pageNumber)) {
//         currentPage = pageNumber - 1; // מעדכן את העמוד
//       }
//     }
//     renderCards(getCardsPerPage(data))
//     console.log("Current Page:", currentPage); // לבדיקה
//   });
// };

// const navbarListener = () => {
//   const navbar = document.querySelector(".navbar");
//   navbar.addEventListener("click", (e) => {
//     // הפעלת אירוע - שמירת אלמנט שהפעיל את האירוע
//     const clickedElement = e.target;
//     console.log("Clicked element:", clickedElement);
//     console.log("Element's text content:", clickedElement.textContent.trim());

//     // אם לוחצים על "Home"
//     if (clickedElement.textContent.trim() === "Home") {
//       renderCards(getCardsPerPage(arrayData));
//       isInFavoritesPage = false;
//     } 
//     // אם לוחצים על "Favorites"
//     else if (clickedElement.textContent.trim() === "Favorites") {
//       if (favorites && favorites.length > 0) {
//         renderCards(getCardsPerPage(favorites));
//         isInFavoritesPage = true;
//       } else {
//         document.querySelector(".container-cards").innerHTML = `<h2 class="text-center">No favorites yet</h2>`;
//       }
//     } 
//     // אם לוחצים על כל דבר אחר
//     else {
//       isInFavoritesPage = false;
//     }
//   });
// };

const listenerToPaginationBtn = () => {
  document.querySelector(".pagination").addEventListener("click", (e) => {
    const btnAction = e.target.closest(".page-link"); // מזהה אם לחצו על כפתור עימוד
    if (!btnAction) return;

    btnAction.blur(); // מסיר את הפוקוס מהכפתור

    const totalPages = Math.ceil(arrayData.length / cardsPerPage);
    const btnText = btnAction.textContent.trim();

    if (btnText === "Previous") {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    } else if (btnText === "Next") {
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      const pageNumber = Number(btnText);
      if (!isNaN(pageNumber)) {
        setCurrentPage(pageNumber - 1);
      }
    }
    renderCards(getCardsPerPage(arrayData));
  });
};

// listenerToPaginationBtn(arrayData)

const listeners = () => {
  navbarListener();
  createPageNavigation();
  listenerToPaginationBtn();

  closeNavbarOnMainClick();

  if (!document.getElementById("staticBackdrop")) {
    document.body.insertAdjacentHTML("beforeend", createModal());
  }

  const modalElement = document.getElementById("staticBackdrop");
  if (!modalElement) {
    console.error("Modal element not found!");
    return;
  }

  let modal = new bootstrap.Modal(modalElement);

  // מאזין ללחיצה על כרטיסים – כאן שומרים את המידע על המדינה
  document.querySelector(".container-cards").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    // // listener to btn of localStorage
    // if (e.target.id === "localStorage") {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   console.log(isInFavoritesPage);

    //   const countryName = card.getAttribute("data-of-country");
    //   console.log(countryName);
    //   localStorageManager(countryName, favorites, arrayData, e.target);
    //   if (isInFavoritesPage) {
    //     console.log(isInFavoritesPage);

    //     renderCards(getCardsPerPage(favorites));
    //   }
    //   return;
    // }

    if (e.target.id === "localStorage") {
      e.preventDefault();
      e.stopPropagation();
      console.log(isInFavoritesPage);  // בדוק את הערך הנוכחי של isInFavoritesPage
  
      const countryName = card.getAttribute("data-of-country");
      console.log(countryName);
      localStorageManager(countryName, favorites, arrayData, e.target);
      
      // אם אנחנו עדיין בעמוד המועדפים
      if (isInFavoritesPage) {
        console.log(isInFavoritesPage);  // בדוק שוב את הערך של isInFavoritesPage
        renderCards(getCardsPerPage(favorites));  // עדכון התצוגה אם אנחנו במועדפים
      }
      return;
    }

    const countryName = card.getAttribute("data-of-country");
    modalElement.setAttribute("data-country", countryName); // שמירת שם המדינה במודל
    modal.show();
  });

  // מאזין לפתיחת המודל – כאן מקבלים את המידע המעודכן
  modalElement.addEventListener("shown.bs.modal", () => {
    const countryName = modalElement.getAttribute("data-country"); // עכשיו יש נתון מעודכן
    const countryData = arrayData.find(
      (item) => item.name.common === countryName
    );

    if (countryData) {
      const containerMap = document.querySelector(".modal-right");
      updateModal(countryData);
      renderMap(countryData.latlng, containerMap);
    }
  });

  modalElement.addEventListener("hide.bs.modal", removeMap);

  dropdownMenu.addEventListener("click", (e) => {
    const countryName = e.target.getAttribute("data-of-country");
    console.log(countryName);
    const countryData = arrayData.find(
      (item) => item.name.common === countryName
    );

    renderCards([countryData]);
  });

  console.log(arrayData);

  // search input event listener
  search(arrayData);
};

init();
