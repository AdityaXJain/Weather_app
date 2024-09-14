const button = document.getElementById("search-button");
const input = document.getElementById("input-City");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(cityname) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=721ad0c07f4149af87c134750240105&q=${cityname}&aqi=yes`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data;
    } catch (error) {
        alert('Error fetching data: ' + error.message);
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();

    if (!value) {
        alert('Please enter a city name before searching.');
        return;
    }

    const result = await getData(value);
    if (result) {
        cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTime.innerText = result.location.localtime;
        cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
    } else {
        alert('City not found. Please try again with a valid city name.');
    }
});
