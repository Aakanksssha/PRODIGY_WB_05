const apiKey = '09dd0aea4d59486f8d6142803242509'; // Replace with your WeatherAPI key

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            const temperature = data.current.temp_c;
            const description = data.current.condition.text;
            const cityName = data.location.name;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;
            const feelsLike = data.current.feelslike_c;
            const iconUrl = data.current.condition.icon;

            // Clear previous weather info
            weatherInfo.innerHTML = '';

            // Create weather card
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weather-card';
            weatherCard.innerHTML = `
                <h2>${cityName}</h2>
                <img src="${iconUrl}" alt="${description}" />
                <p>Temperature: ${temperature}°C</p>
                <p>Feels Like: ${feelsLike}°C</p>
                <p>Condition: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} kph</p>
            `;
            weatherInfo.appendChild(weatherCard);
        })
        .catch(error => {
            alert(error.message);
        });
}
