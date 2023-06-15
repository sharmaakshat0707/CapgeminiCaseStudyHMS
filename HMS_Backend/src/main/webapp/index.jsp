<!DOCTYPE html>
<html>
<head>
	<title>Booking Form</title>
    <script>
    // Get the booking form and error message elements
const bookingForm = document.getElementById('booking-form');
const errorMessage = document.getElementById('error-message');

// Add event listener to the booking form submit button
bookingForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const formData = new FormData(bookingForm);

  // Create a new request object
  const request = new XMLHttpRequest();

  // Define the request method, URL, and asynchronous flag
  request.open('POST', '/bookingpost', true);

  // Set the request headers
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Add event listener for request completion
  request.addEventListener('load', () => {
    // Check if the request was successful
    if (request.status === 200) {
      // Redirect to the booking confirmation page
      window.location.href = '/bookingconfirmation';
    } else {
      // Display an error message
      errorMessage.textContent = 'There was an error processing your booking. Please try again later.';
    }
  });

  // Send the form data
  request.send(new URLSearchParams(formData));
});
</script>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f2f2f2;
		}

		.container {
			margin: auto;
			padding: 20px;
			max-width: 500px;
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		}

		h1 {
			text-align: center;
			color: #666;
		}

		label {
			display: block;
			margin-bottom: 5px;
			color: #666;
		}

		input[type="text"],
		input[type="email"],
		input[type="tel"] {
			width: 100%;
			padding: 10px;
			margin-bottom: 20px;
			border: 1px solid #ccc;
			border-radius: 5px;
			box-sizing: border-box;
			font-size: 16px;
		}

		select {
			width: 100%;
			padding: 10px;
			margin-bottom: 20px;
			border: 1px solid #ccc;
			border-radius: 5px;
			box-sizing: border-box;
			font-size: 16px;
		}

		.btn {
			background-color: #4CAF50;
			color: #fff;
			padding: 10px;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			font-size: 16px;
			margin-bottom: 10px;
		}

		.btn:hover {
			background-color: #3e8e41;
		}

		.error {
			color: red;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Booking Form</h1>
		<div id="error-message"></div>
		<form id="booking-form">
			<div>
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" required>
			</div>
			<div>
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required>
			</div>
			<div>
				<label for="phone">Phone:</label>
				<input type="tel" id="phone" name="phone" required>
			</div>
			<div>
				<label for="street">Street:</label>
				<input type="text" id="street" name="street" required>
			</div>
			<div>
				<label for="number">Number:</label>
				<input type="text" id="number" name="number" required>
			</div>
			<div>
				<label for="city">City:</label>
				<input type="text" id="city" name="city" required>
			</div>
			<div>
				<label for="country">Country:</label>
				<input type="text" id="country" name="country" required>
			</div>
			<button type="submit" class="btn">Book Now</button>
		</form>
	</div>

	<!-- <script>
		const form = document.getElementById('booking-form');
		const errorMessage = document.getElementById('error-message');

		form.addEventListener('submit', function(event) {
			event.preventDefault -->
