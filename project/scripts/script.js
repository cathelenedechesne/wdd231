document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById("lastModified").textContent = "Last modified: " + lastModifiedDate;

    //---Hamburger Button---
    const hamburgerElement = document.querySelector("#myButton");
    const navElement = document.querySelector("#animateme");

    if (hamburgerElement && navElement) {
        hamburgerElement.addEventListener("click", () => {
            navElement.classList.toggle("open");
            hamburgerElement.classList.toggle("open");
        });
    }

    // --- Weather Section ---

    const urlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=-38.1428899770511&lon=145.1180952744731&units=metric&appid=70e30a19e9ac5a9a016e519299c1e279";

    async function fetchWeatherData(url, displayFunction) {
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

    function displayCurrentWeather(data) {
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

    // Fetch weather data and display
    fetchWeatherData(urlCurrent, displayCurrentWeather);

    // --- Map section ---   

    document.getElementById("directions-btn").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showDirections, handleError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function showDirections(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const destinationLat = -38.1428899770511;
        const destinationLng = 145.1180952744731;

        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

        window.open(directionsUrl, '_blank');
    }

    function handleError(error) {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location.");
    }
});
