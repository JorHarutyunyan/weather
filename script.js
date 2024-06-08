document.getElementById('search-button').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value;
    if (cityName) {
        getWeatherForecast(cityName);
    }
});

function getWeatherForecast(city) {
    const apiKey = '28541c8a38440417b8883888e9b07b01'
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';

    data.list.forEach(item => {
        const weatherWidget = document.createElement('div');
        weatherWidget.className = 'weather-widget';

        const date = new Date(item.dt * 1000).toLocaleString();
        const temp = Math.round(item.main.temp);
        const minTemp = Math.round(item.main.temp_min);
        const maxTemp = Math.round(item.main.temp_max);
        const windSpeed = item.wind.speed;
        const windDeg = item.wind.deg;
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        weatherWidget.innerHTML = `
            <img src="${icon}" alt="Weather icon">
            <p>${temp} °C</p>
            <p>${date}</p>
            <p>Minimal: ${minTemp} °C</p>
            <p>Maximal: ${maxTemp} °C</p>
            <p>Wind: ${windSpeed} m/s</p>
            // <img src="arrow.png" class="arrow" style="transform: rotate(${windDeg}deg);">
            `;

        weatherContainer.appendChild(weatherWidget);
    });
}
