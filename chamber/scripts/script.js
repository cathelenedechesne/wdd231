// Get the current year
const currentYear = new Date().getFullYear();

// Update the content of the span with id "year" to display the current year
document.getElementById("year").textContent = currentYear;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Update the content of the paragraph with id "lastModified" to display the last modified date
document.getElementById("lastModified").textContent = "Last modified: " + lastModifiedDate;

//---Hamburger Button---

const hamburgerElement = document.querySelector("#myButton");
const navElement = document.querySelector("#animateme");

hamburgerElement.addEventListener("click", () => {
    navElement.classList.toggle("open");
    hamburgerElement.classList.toggle("open");
})

// Fetch and display member cards
async function fetchAndDisplayMembers() {
    try {
        const response = await fetch('data/members.json'); // Adjusted URL
        const data = await response.json();

        const memberContainer = document.getElementById('member-container');

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
                    <p><strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p><strong>Social Media:</strong> <a href="${member.socialMedia}" target="_blank">Visit</a></p>
                </div>
            `;
            memberContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Call the function to fetch and display members when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayMembers);

// Function to toggle between grid and list views
function toggleView(viewType) {
    const memberContainer = document.getElementById('member-container');
    memberContainer.classList.remove('grid', 'list');
    memberContainer.classList.add(viewType);
}

// Event listeners for toggle buttons
document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

