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

    async function fetchData() {
        try {
            const response = await fetch('data/resto-hotel.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            populateRestaurants(data.restaurants);
            populateHotels(data.hotels);
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('food-card').innerHTML = '<p>Error loading restaurant data.</p>';
            document.getElementById('hotel-card').innerHTML = '<p>Error loading hotel data.</p>';
        }
    }

    function populateRestaurants(restaurants) {
        const restaurantCard = document.getElementById('food-card');
        restaurantCard.innerHTML = '<h2 class="title-card">Restaurants</h2>';

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('card-content');

        const visibleItems = restaurants.slice(0, 3);
        const remainingItems = restaurants.slice(3);

        if (visibleItems.length) {
            visibleItems.forEach(restaurant => {
                const card = document.createElement('div');
                card.classList.add('item', 'card');
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${restaurant.image}" alt="${restaurant.name}">
                    </div>
                    <div class="card-details">
                        <h2>${restaurant.name}</h2>
                        <p>${restaurant.description}</p>
                        <a href="${restaurant.menu}" target="_blank">View Menu</a>
                        <p>${restaurant.location}</p>
                    </div>
                `;
                contentDiv.appendChild(card);
            });

            restaurantCard.appendChild(contentDiv);

            if (remainingItems.length) {
                const showMoreBtn = document.createElement('button');
                showMoreBtn.classList.add('show-more');
                showMoreBtn.textContent = 'Show More';
                showMoreBtn.addEventListener('click', () => {
                    openModal(remainingItems, 'Restaurants');
                });
                restaurantCard.appendChild(showMoreBtn);
            }
        } else {
            restaurantCard.innerHTML += '<p>No restaurants found.</p>';
        }
    }

    function populateHotels(hotels) {
        const hotelCard = document.getElementById('hotel-card');
        hotelCard.innerHTML = '<h2 class="title-card">Hotels</h2>';

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('card-content');

        const visibleItems = hotels.slice(0, 3);
        const remainingItems = hotels.slice(3);

        if (visibleItems.length) {
            visibleItems.forEach(hotel => {
                const card = document.createElement('div');
                card.classList.add('item', 'card');
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${hotel.image}" alt="${hotel.name}">
                    </div>
                    <div class="card-details">
                        <h2>${hotel.name}</h2>
                        <p>${hotel.description}</p>
                        <a href="${hotel.website}" target="_blank">Website</a>
                        <p>Rating: ${hotel.rating}</p>
                        <p>${hotel.location}</p>
                    </div>
                `;
                contentDiv.appendChild(card);
            });

            hotelCard.appendChild(contentDiv);

            if (remainingItems.length) {
                const showMoreBtn = document.createElement('button');
                showMoreBtn.classList.add('show-more');
                showMoreBtn.textContent = 'Show More';
                showMoreBtn.addEventListener('click', () => {
                    openModal(remainingItems, 'Hotels');
                });
                hotelCard.appendChild(showMoreBtn);
            }
        } else {
            hotelCard.innerHTML += '<p>No hotels found.</p>';
        }
    }

    function openModal(items, type) {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${type}</h2>
                <div class="card-content">
                    ${items.map(item => `
                        <div class="item card">
                            <div class="card-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="card-details">
                                <h2>${item.name}</h2>
                                <p>${item.description}</p>
                                <a href="${type === 'Restaurants' ? item.menu : item.website}" target="_blank">${type === 'Restaurants' ? 'View Menu' : 'Website'}</a>
                                <p>${item.location}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Show the modal
        modal.style.display = 'block';

        // Close the modal when the user clicks on <span> (x)
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });

        // Optional: Close modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            }
        });
    }

    fetchData();
});
