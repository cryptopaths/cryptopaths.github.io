document.addEventListener('DOMContentLoaded', function () {
    const downArrow = document.getElementById('down-arrow');
    const studentButton = document.getElementById('scroll-to-student');
    const aboutUsContainer = document.querySelector('.about-us');
    const studentSection = document.querySelector('.students');
    const contact_button = document.getElementById('scroll-to-contact-us');
    const contactHeader = document.querySelector('.name-contact');

    // Scroll to the next section when the down arrow is clicked
    downArrow.addEventListener('click', function () {
        aboutUsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to the student section when the student button is clicked
    studentButton.addEventListener('click', function () {
        studentSection.scrollIntoView({ behavior: 'smooth' });
    });

    contact_button.addEventListener('click', function() {
        contactHeader.scrollIntoView({ behavior: 'smooth' });
    });

    // Form submission logic
    const form = document.getElementById('myform');
    const submitButton = document.getElementById('submit_button');
    const error_message = document.getElementById('error_message');

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        console.log("Form submitted Successfully !");
        validate(); // Call the validate function before sending the email
    });

    function validate() {
        let form_name = document.getElementById("form_name").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        error_message.style.padding = "10px";

        let errors = [];

        if (form_name.length < 3) {
            errors.push("Please enter a Valid Name");
        }
        if (subject.length < 5) {
            errors.push("Please enter a correct Subject");
        }
        if (isNaN(phone) || phone.length <= 6) {
            errors.push("Please enter a valid Phone Number");
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.push("Please enter a valid Email");
        }
        if (message.length <= 20) {
            errors.push("Please enter a message of more than 20 characters");
        }

        if (errors.length > 0) {
            // Show the error message and set its content
            error_message.style.display = "block";
            error_message.innerHTML = errors.join("<br>");
            return false;
        } else {
            // Hide the error message if there are no errors
            error_message.style.display = "none";
            // Disable the submit button to prevent multiple submissions
            submitButton.disabled = true;
            // Send email only if validation passes
            sendEmail();

            return true;
        }
    }

    function sendEmail() {
        const result = document.getElementById('result');

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait ..."

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                result.innerHTML = jsonResponse.message;
                window.alert(jsonResponse.message);
            } else {
                console.log(response);
                result.innerHTML = jsonResponse.message;
                window.alert(jsonResponse.message);
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            window.alert("Something went wrong !");
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
                submitButton.disabled = false; // Re-enable submit button after a timeout
            }, 3000);
        });
    }
});
