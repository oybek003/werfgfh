const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const countryInfo = document.getElementById("countryInfo");

async function fetchCountries(countryName) {
    try {
        const url = `https://restcountries.com/v3.1/name/${countryName}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data || data.status === 404) {
            countryInfo.innerHTML = "<p>Country not found. Try again.</p>";
            return;
        }

        
        const country = data[0];

        console.log(country);

        const countryTitle = document.createElement('h2');
        countryTitle.textContent = country.name.common;

        const countryCapital = document.createElement('p');
        countryCapital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;

        const countryArea = document.createElement('p');
        countryArea.textContent = `Area: ${country.area} km²`;

        const countryPopulation = document.createElement('p');
        countryPopulation.textContent = `Population: ${country.population}`;

        const countryFlag = document.createElement('img');
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} flag`;

        countryInfo.innerHTML = "";
        countryInfo.appendChild(countryTitle);
        countryInfo.appendChild(countryCapital);
        countryInfo.appendChild(countryArea);
        countryInfo.appendChild(countryPopulation);
        countryInfo.appendChild(countryFlag);
    } catch (error) {
        console.log("Ошибка", error);
        countryInfo.innerHTML = "<p>Failed to load country data.</p>";
    }
}

searchButton.addEventListener("click", () => {
    const countryNameInput = countryInput.value.toLowerCase().trim();
    if (countryNameInput) {
        fetchCountries(countryNameInput);
    }
});
