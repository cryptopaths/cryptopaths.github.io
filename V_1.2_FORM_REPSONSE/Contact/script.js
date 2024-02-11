function validate() {
    let form_name = document.getElementById("form_name").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error_message = document.getElementById("error_message");
  
    error_message.style.padding = "10px";
  
    let errors = [];
  
    if (form_name.length < 4) {
      errors.push("Please Enter a Valid Name");
    }
    if (subject.length < 5) {
      errors.push("Please Enter a Correct Subject");
    }
    if (isNaN(phone) || phone.length <= 6) {
      errors.push("Please Enter a Valid Phone Number");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("Please Enter a Valid Email");
    }
    if (message.length <= 20) {
      errors.push("Please Enter More Than 20 Characters");
    }
  
    if (errors.length > 0) {
      // Show the error message and set its content
      error_message.style.display = "block";
      error_message.innerHTML = errors.join("<br>");
      return false;
    } else {
      // Hide the error message if there are no errors
      error_message.style.display = "none";
  
      // Show the success dialog box
      alert("Form Submitted Successfully\n\nThank you, for showing your interest.\nWe will contact you shortly!");
      return true;
    }
  }

  function sendDataToGoogleForm() {
    // Get form data
    let form_name = document.getElementById("form_name").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
  
    // Create a FormData object
    let formData = new FormData();
    formData.append("entry.537061384", form_name);  // Name
    formData.append("entry.1048721482", subject);   // Subject
    formData.append("entry.533703581", phone);      // Phone
    formData.append("entry.2019774403", email);     // Email
    formData.append("entry.436540176", message);    // Message

    // Send data to Google Form using fetch API
    // NOT WORKING !!
    fetch('https://docs.google.com/forms/d/1bqcQPBo2Q1NkYF4_RZMdo5b_bkuzL6Al_SjAohMHsyo/formResponse', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // You can handle the response from the server here if needed
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }