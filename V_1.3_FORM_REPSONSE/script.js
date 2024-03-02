function validate() {
  let form_name = document.getElementById("form_name").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let error_message = document.getElementById("error_message");

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
      document.getElementById("submit_button").disabled = true;
      // Send email only if validation passes
      sendEmail();

      return true;
  }
}

function sendEmail() {
  const form = document.getElementById('myform');
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
          let json = await response.json();
          if (response.status == 200) {
              result.innerHTML = json.message;
          } else {
              console.log(response);
              result.innerHTML = json.message;
          }
      })
      .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
      })
      .then(function () {
          form.reset();
          setTimeout(() => {
              result.style.display = "none";
          }, 3000);
      });
}

const form = document.getElementById('myform');
const submitButton = document.getElementById('submit_button');

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Form submitted Successfully");
    validate(); // Call the validate function before sending the email
});