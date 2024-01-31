document.addEventListener('DOMContentLoaded', function () {
    const downArrow = document.getElementById('down-arrow');
    const studentButton = document.getElementById('scroll-to-student');
    const aboutUsContainer = document.querySelector('.about-us');
    const studentSection = document.querySelector('.students');

    // Scroll to the next section when the down arrow is clicked
    downArrow.addEventListener('click', function () {
        aboutUsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to the student section when the student button is clicked
    studentButton.addEventListener('click', function () {
        studentSection.scrollIntoView({ behavior: 'smooth' });
    });
});
