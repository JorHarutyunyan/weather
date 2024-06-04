document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const searchButton = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    let lastCity = '';

    searchButton.addEventListener('click', () => {
        const APIKey = '28541c8a38440417b8883888e9b07b01';
        const city = document.querySelector('.search-box input').value.trim();

        if (city === '') {
            console.log('City is empty');
            return;
        }

        console.log(`Fetching weather for ${city}`);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        console.error(`City not found: ${city}`);
                    } else {
                        console.error(`HTTP error! status: ${response.status}`);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                if (json.cod === '404') {
                    lastCity = city;
                    container.style.height = '555px';
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error404.classList.add('active');
                    return;
                }

                if (lastCity === city) {
                    return;
                }

                lastCity = city;

                console.log('Weather data:', json);

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                container.style.height = '550px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/arew.png';
                        break;
                    case 'Rain':
                        image.src = 'images/andzrew.png';
                        break;
                    case 'Snow':
                        image.src = 'images/lusin.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/arew-amp.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/qami.png';
                        break;
                    default:
                        image.src = 'images/arew-amp.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                container.style.height = '555px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
            });
    });
});
