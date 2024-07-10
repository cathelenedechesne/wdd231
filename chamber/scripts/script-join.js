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

    //--- join.html ---
    // Missing closing curly brace for the previous event listener

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
});
