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

    async function fetchAndDisplayMembers() {
        try {
            const response = await fetch('data/members.json'); // Adjusted URL
            const data = await response.json();

            const memberContainer = document.getElementById('member-container');

            if (memberContainer) {
                // Clear existing content
                memberContainer.innerHTML = '';

                data.members.forEach(member => {
                    // Create card element
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <div class="card-image">
                            <img src="${member.image}" alt="${member.name}">
                        </div>
                        <div class="card-details">
                            <h2>${member.name}</h2>
                            <p><strong>Address:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phoneNumber}</p>
                            ${member.websiteUrl ? `<p><strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a></p>` : ''}
                            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                            <p><strong>Social Media:</strong> <a href="${member.socialMedia}" target="_blank">Visit</a></p>
                        </div>
                    `;
                    memberContainer.appendChild(card);
                });
            } else {
                console.warn('member-container element not found. Skipping member display.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    // Fetch and display only three member cards
    async function fetchAndDisplayThreeMembers() {
        try {
            const response = await fetch('data/members.json'); // Adjusted URL
            const data = await response.json();

            const goldSilverMembers = data.members.filter(member => {
                return member.membershipLevel === 'gold' || member.membershipLevel === 'silver';
            });

            // Shuffle function to randomly sort array
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            const shuffledMembers = shuffle(goldSilverMembers);

            const memberContainerHome = document.getElementById('member-container-home');

            if (memberContainerHome) {
                // Clear existing content
                memberContainerHome.innerHTML = '';

                shuffledMembers.slice(0, 3).forEach(member => {
                    // Create card element
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <div class="card-image">
                            <img src="${member.image}" alt="${member.name}">
                        </div>
                        <div class="card-details">
                            <h2>${member.name}</h2>
                            <p><strong>Address:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phoneNumber}</p>
                            ${member.websiteUrl ? `<p><strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a></p>` : ''}
                            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                            <p><strong>Social Media:</strong> <a href="${member.socialMedia}" target="_blank">Visit</a></p>
                        </div>
                    `;
                    memberContainerHome.appendChild(card);
                });
            } else {
                console.warn('member-container-home element not found. Skipping member display.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call the function to fetch and display members when the page loads
    fetchAndDisplayMembers();
    fetchAndDisplayThreeMembers();

    // Function to toggle between grid and list views
    function toggleView(viewType) {
        const memberContainer = document.getElementById('member-container');
        if (memberContainer) {
            memberContainer.classList.remove('grid', 'list');
            memberContainer.classList.add(viewType);
        } else {
            console.error('Error: member-container element not found.');
        }
    }

    // Event listeners for toggle buttons
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', () => toggleView('grid'));
        listViewBtn.addEventListener('click', () => toggleView('list'));
    }

    document.getElementById('join').addEventListener('click', function () {
        window.location.href = 'https://cathelenedechesne.github.io/wdd231/chamber/join.html';
    });

// Weather section

const urlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=-35.280192266512806&lon=149.13108649601466&units=metric&appid=70e30a19e9ac5a9a016e519299c1e279";
const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=-35.280192266512806&lon=149.13108649601466&units=metric&appid=70e30a19e9ac5a9a016e519299c1e279";

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

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');

    // Clear existing content
    forecastContainer.innerHTML = '';

    // Display forecast for next 5 days
    const forecasts = data.list.filter((item, index) => index % 8 === 0); // Select every 8th item for daily forecast

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to Date object
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = forecast.main.temp.toFixed(0); // Format temperature to zero decimal points
        const icon = forecast.weather[0].icon;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p class="forecast-date">${day}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p class="forecast-temp">${temp}&deg;C</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// Fetch weather data and display
fetchWeatherData(urlCurrent, displayCurrentWeather);
fetchWeatherData(urlForecast, displayForecast);


});

//--- join.html ---

document.addEventListener('DOMContentLoaded', (event) => {
    // Set the timestamp field
    let timestampField = document.getElementById('timestamp');
    let currentDateTime = new Date().toISOString();
    timestampField.value = currentDateTime;

    // Modal functionality
    let modal = document.getElementById("membershipModal");
    let btn = document.getElementById("learnMoreBtn");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function (event) {
        event.preventDefault();  // Prevent the default link behavior
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

//Display on thankyou.html
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('first-name').textContent = urlParams.get('first');
    document.getElementById('last-name').textContent = urlParams.get('last');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phone').textContent = urlParams.get('phone');
    document.getElementById('organization').textContent = urlParams.get('organization-business-name');
    document.getElementById('organizational').textContent = urlParams.get('organizational');
    document.getElementById('membership').textContent = urlParams.get('membership');
    document.getElementById('description').textContent = urlParams.get('description');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
});
