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



const hideBtn = (totalPages, paginationBtn) => {
  if (totalPages <= 1) {
    // מוסיף את הקלאס "hidden" אם יש עמוד אחד בלבד
    paginationBtn.classList.add("hidden");
  } else if (totalPages === 2) {
    paginationBtn.children[3].classList.add("hidden"); // מסתיר את כפתור העמוד השלישי אם יש שני עמודים
  } else {
    paginationBtn.classList.remove("hidden"); // מוודא שהכפתורים מוצגים אם יש יותר מעמוד אחד
  }
};


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
};
