
const createModal = () => {
    return `<div class="modal fade" id="staticBackdrop"  data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="modal-left">
          <div>
            <h2>Country Information</h2>
            <p><strong>Common Name:</strong></p>
            <p><strong>Official Name:</strong></p>
            <p><strong>Native Name:</strong></p>
            <p><strong>Borders:</strong></p>
            <p><strong>Status:</strong></p>
            <p><strong>UN Member:</strong></p>
            <p><strong>Currency:</strong></p>
            <p><strong>Calling Code:</strong></p>
            <p><strong>Capital:</strong></p>
            <p><strong>Region:</strong></p>
            <p><strong>Language:</strong></p>
            <p><strong>Landlocked:</strong></p>
            <p><strong>Area:</strong></p>
            <p><strong>Population:</strong></p>
            <p><strong>Flag:</strong></p>
            <p><strong>Time Zone:</strong></p>
            <p><strong>Continent:</strong></p>
            <p><strong>Start of the Week:</strong></p>
        </div>
        
        </div>
        <div class="modal-right" id="modal_right"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>`
}




const updateModal = (country) => {
    document.querySelector("#staticBackdropLabel").textContent = country.name?.common || "No title";
    document.querySelector(".modal-body .modal-left").innerHTML = `
        <p><strong>Common Name:</strong> ${country.name?.common || "N/A"}</p>
        <p><strong>Official Name:</strong> ${country.name?.official || "N/A"}</p>
        <p><strong>Native Name:</strong> ${country.name?.nativeName?.heb?.common || "N/A"}</p>
        <p><stron g>Status:</stron> ${country.status || "N/A"}</p>
        <p><strong>UN Member:</strong> ${country.unMember ? "Yes" : "No"}</p>
        <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(", ") : "N/A"}</p>
        <p><strong>Calling Code:</strong> ${country.idd?.root ? `${country.idd.root}${country.idd?.suffixes?.join(", ")}` : "N/A"}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region || "N/A"}</p>
        <p><strong>Language:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
        <p><strong>Landlocked:</strong> ${country.landlocked ? "Yes" : "No"}</p>
        <p><strong>Area:</strong> ${country.area ? country.area + " km²" : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population || "N/A"}</p>
        <p><strong>Flag:</strong> ${country.flags?.png ? `<img src="${country.flags.png}" alt="Flag" width="50">` : "N/A"}</p>
        <p><strong>Time Zone:</strong> ${country.timezones?.[0] || "N/A"}</p>
        <p><strong>Continent:</strong> ${country.continents?.join(", ") || "N/A"}</p>
        <p><strong>Start of the Week:</strong> ${country.startOfWeek || "N/A"}</p>
    `;
};

const renderModalContent  = (arrayData) => {
  const modalElement = document.getElementById("staticBackdrop");
  const countryName = modalElement.getAttribute("data-country"); 
  const countryData = arrayData.find(item => item.name.common === countryName);

  if (countryData) {
    updateModal(countryData);
    console.log("Country Data: ", countryData.name.common);

    const containerMap = document.querySelector(".modal-right");
    renderMap(countryData.latlng, containerMap);
  }
}

export {createModal, updateModal, renderModalContent }




{/* <p><strong>Borders:</strong> ${country.borders?.join(", ") || "None"}</p> */}

