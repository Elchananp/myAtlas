const dropdownMenu = document.querySelector(".dropdown-menu");
const insertToDropList = (data) => {
  const listOfCountries = data
    .map((item) => {
      return `<li>
  <a class="dropdown-item" data-of-country="${item.name.common}" href="#">
    ${item.name.common}  
    <img src="${item.flags.png}" alt="flag" class="flag-icon">
  </a>
</li>
`;
    })
    .join("");
  dropdownMenu.innerHTML = listOfCountries;
};
      // סוגר את התפריט בלחיצה על כל איזור במיין אם הוא פתוח

function closeNavbarOnMainClick() {
  document.querySelector("main").addEventListener("click", () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler.getAttribute("aria-expanded") === "true") {
      navbarToggler.click(); 
    }
  });
}




export { insertToDropList, closeNavbarOnMainClick ,dropdownMenu };
