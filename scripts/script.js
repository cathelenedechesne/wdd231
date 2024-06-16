// --- Footer Content ---

// Get the current year
const currentYear = new Date().getFullYear();

// Update the content of the span with id "2024" to display the current year
document.getElementById("2024").textContent = currentYear;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Update the content of the paragraph with id "lastModified" to display the last modified date
document.getElementById("lastModified").textContent = "Last modified: " + lastModifiedDate;


// --- "Web and Computer Programming Certificate" Section" ---
function showContent(id) {
    // Hide all content divs
    var contents = document.querySelectorAll('.content');
    contents.forEach(function (content) {
        content.classList.remove('active');
    });

    if (id === 'content1') {
        // Show the content for button 1, 2, and 3
        document.getElementById('content2').classList.add('active');
        document.getElementById('content3').classList.add('active');
    } else {
        // Show the selected content div
        document.getElementById(id).classList.add('active');
    }
}

// --- Hamburger Menu ---

function toggleMenu() {
    const nav = document.querySelector('header > nav');
    nav.classList.toggle('active');
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('active');
}