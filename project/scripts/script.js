import { fetchWeatherData, displayCurrentWeather, weatherUrl } from './weather.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;

    // Set last modified date
    const lastModifiedDate = document.lastModified;
    document.getElementById("lastModified").textContent = "Last modified: " + lastModifiedDate;

    // Hamburger menu toggle
    const hamburgerElement = document.querySelector("#myButton");
    const navElement = document.querySelector("#animateme");

    if (hamburgerElement && navElement) {
        hamburgerElement.addEventListener("click", () => {
            navElement.classList.toggle("open");
            hamburgerElement.classList.toggle("open");
        });
    }

    document.getElementById('join').addEventListener('click', function () {
        window.location.href = 'https://cathelenedechesne.github.io/wdd231/project/subscribe.html';
    });

    // Fetch weather data and display
    fetchWeatherData(weatherUrl, displayCurrentWeather);

    // Map section
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

