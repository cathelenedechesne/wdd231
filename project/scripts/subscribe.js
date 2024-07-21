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

    // Add timestamp to form submission
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const currentDateTime = new Date().toISOString();
        timestampField.value = currentDateTime;
        // Store timestamp in localStorage (if needed)
        localStorage.setItem('timestamp', currentDateTime);
    }


    // Display form data on thankyou.html
    if (window.location.pathname.includes('thankyou.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('first-name').textContent = urlParams.get('first') || 'N/A';
        document.getElementById('last-name').textContent = urlParams.get('last') || 'N/A';
        document.getElementById('email').textContent = urlParams.get('email') || 'N/A';
        document.getElementById('phone').textContent = urlParams.get('phone') || 'N/A';
        document.getElementById('timestamp').textContent = urlParams.get('timestamp') || 'N/A';
    }
});