document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

    const cards = document.querySelector('#cards');

    async function getProphetData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Log the response to check if it's valid JSON
            displayProphets(data.prophets); // Reference the prophets array of the JSON data object
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    getProphetData(url); // Ensure the URL is passed correctly here

    const displayProphets = (prophets) => {
        prophets.forEach((prophet) => {
            // Create elements to add to the div.cards element
            let card = document.createElement('section');
            let fullName = document.createElement('h2'); // h2 element for the prophet's full name
            let portrait = document.createElement('img');
            let birthDate = document.createElement('p');
            let birthPlace = document.createElement('p');

            // Build the h2 content out to show the prophet's full name
            fullName.textContent = `${prophet.name} ${prophet.lastname}`;

            // Build the image portrait by setting all the relevant attributes
            portrait.setAttribute('src', prophet.imageurl);
            portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
            portrait.setAttribute('loading', 'lazy');
            portrait.setAttribute('width', '340');
            portrait.setAttribute('height', '440');

            // Add Date of Birth and Place of Birth
            birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
            birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

            // Append the section(card) with the created elements
            card.appendChild(fullName);
            card.appendChild(portrait);
            card.appendChild(birthDate);
            card.appendChild(birthPlace);

            cards.appendChild(card);
        }); // end of arrow function and forEach loop
    }
});
