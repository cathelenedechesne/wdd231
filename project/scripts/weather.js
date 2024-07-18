// weather.js

const urlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=-38.1428899770511&lon=145.1180952744731&units=metric&appid=70e30a19e9ac5a9a016e519299c1e279";

export async function fetchWeatherData(url, displayFunction) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayFunction(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

export function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('#weather-caption');

    // Format temperature to zero decimal points
    const formattedTemp = data.main.temp.toFixed(0);

    if (currentTemp && weatherIcon && captionDesc) {
        currentTemp.innerHTML = `${formattedTemp}&deg;C`;
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
    } else {
        console.error('Error: Weather elements not found.');
    }
}

export const weatherUrl = urlCurrent;
