let cardsPerPage = 12;
let currentPage = 0;

function getCardsPerPage(data) {
  let start = cardsPerPage * currentPage;
  let end = start + cardsPerPage;
  console.log(`Page ${currentPage}:`, data.slice(start, end));
  changeBtnNavigation(data);
  return data.slice(start, end);
}

function nextBtn(data) {
  // חישוב מספר העמודים (מעוגל כלפי מעלה)
  let totalPages = Math.ceil(data.length / cardsPerPage);

  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);

  if (currentPage < totalPages - 1) {
    currentPage++;
    getCardsPerPage(data);
  }
}

function prevBtn(data) {
  // חישוב מספר העמודים (מעוגל כלפי מעלה)
  let totalPages = Math.ceil(data.length / cardsPerPage);
  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);

  if (currentPage > 0) {
    currentPage--;
    getCardsPerPage(data);
  }
}

const createPageNavigation = () => {
  const main = document.querySelector("main");

  const pagination = ` <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>`;
  main.insertAdjacentHTML("beforeend", pagination);
};

const changeBtnNavigation = (data) => {

  // const realCurrentPage = currentPage
  const paginationBtn = document.querySelector(".pagination");
  const totalPages = Math.ceil(data.length / cardsPerPage);
  console.log("totalPages " + totalPages);

  const prev = paginationBtn.children[0];
  const next = paginationBtn.children[paginationBtn.children.length - 1];

  prev.classList.toggle("disabled", currentPage === 0);
  next.classList.toggle("disabled", currentPage === totalPages - 1);

  if (currentPage === 0) {
    paginationBtn.children[1].querySelector("a").textContent = 1;
    paginationBtn.children[2].querySelector("a").textContent = 2;
    paginationBtn.children[3].querySelector("a").textContent = 3;
  } else if (currentPage === totalPages - 1) {
    paginationBtn.children[1].querySelector("a").textContent = totalPages - 2;
    paginationBtn.children[2].querySelector("a").textContent = totalPages - 1;
    paginationBtn.children[3].querySelector("a").textContent = totalPages;
  } else {
    paginationBtn.children[1].querySelector("a").textContent = currentPage;
    paginationBtn.children[2].querySelector("a").textContent = currentPage + 1;
    paginationBtn.children[3].querySelector("a").textContent = currentPage + 2;
  }
  hideBtn(totalPages, paginationBtn);
};

// const hideBtn = (totalPages, paginationBtn) => {
//   if (totalPages <= 1) {
//     paginationBtn.classList.toggle(".hidden");
//   } else if (totalPages === 2) {
//     paginationBtn.children[2].classList.toggle(".hidden");
//   }
// };

const hideBtn = (totalPages, paginationBtn) => {
  if (totalPages <= 1) {
    paginationBtn.classList.add("hidden"); // מוסיף את הקלאס "hidden" אם יש עמוד אחד בלבד
  } else if (totalPages === 2) {
    paginationBtn.children[3].classList.add("hidden"); // מסתיר את כפתור העמוד השלישי אם יש שני עמודים
  } else {
    paginationBtn.classList.remove("hidden"); // מוודא שהכפתורים מוצגים אם יש יותר מעמוד אחד
  }
};

//   const listenerToPaginationBtn = () => {
//     document.querySelector(".pagination").addEventListener("click", (e) => {
//        const btnAction = e.target;
//         if (btnAction.textContent) {

//         }
//     })
//   }

// const listenerToPaginationBtn = (data) => {
//     const totalPages = Math.ceil(data.length / cardsPerPage);

//     document.querySelector(".pagination").addEventListener("click", (e) => {
//       const btnAction = e.target.closest(".page-link"); // מבטיח שלחצת על כפתור

//       if (!btnAction) return; // אם לא לחצו על כפתור – לא לעשות כלום

//       const btnText = btnAction.textContent.trim(); // תוכן הכפתור

//       if (btnText === "Previous") {
//         if (currentPage > 0) {
//           currentPage--;
//         }
//       } else if (btnText === "Next") {
//         if (currentPage < totalPages - 1) {
//           currentPage++;
//         }
//       } else {
//         const pageNumber = Number(btnText); // ממיר את הטקסט למספר
//         if (!isNaN(pageNumber)) {
//           currentPage = pageNumber - 1; // מעדכן את העמוד
//         }
//       }
//       renderCards(getCardsPerPage(data))
//       console.log("Current Page:", currentPage); // לבדיקה
//     });
//   };

const setCurrentPage = (num) => {
  currentPage = num;
};

export {
  cardsPerPage,
  currentPage,
  nextBtn,
  prevBtn,
  createPageNavigation,
  getCardsPerPage,
  changeBtnNavigation,
  setCurrentPage,
  // listenerToPaginationBtn
};
