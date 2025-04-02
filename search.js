const search = (data) => {
    console.log(data);
    
    const searchInput = document.querySelector('.form-control');
    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredData = data.filter(country => {
            return country.name.common.toLowerCase().includes(searchValue) || country.name.official.toLowerCase().includes(searchValue);
        });
        // console.log(data);
        
        console.log(e.target.value);
        console.log(filteredData);
        renderCards(getCardsPerPage(filteredData));

        

        
    })
}

export {search};