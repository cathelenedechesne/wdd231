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

// --- Dialog Section ---

// Get the dialog element
const courseDetails = document.getElementById('course-details');

// Function to display course details in the dialog/modal
function displayCourseDetails(course) {
    courseDetails.innerHTML = `        
        <h2>${course.subject} ${course.number}: ${course.title}</h2>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <button id="closeModal">Close</button>
    `;
    courseDetails.showModal(); // Use showModal() to open the dialog

    // Add event listener to close modal button
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
        courseDetails.close(); // Use close() to close the dialog
    });
}

// Function to set up course details click event
function setupCourseDetailsClick() {
    const courseElements = document.querySelectorAll('#certificate .content p');
    courseElements.forEach(courseElement => {
        courseElement.addEventListener('click', () => {
            const courseId = courseElement.textContent.trim();
            const course = courses.find(c => `${c.subject} ${c.number}` === courseId);
            if (course) {
                displayCourseDetails(course);
            }
        });
    });
}

// Call the function to set up course details click events
setupCourseDetailsClick();


// --- Hamburger Menu ---

function toggleMenu() {
    const nav = document.querySelector('header > nav');
    nav.classList.toggle('active');

    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('active');
}

//--- Course Card ---

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
