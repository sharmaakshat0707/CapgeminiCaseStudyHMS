<!DOCTYPE html>
<html>
<head>
	<title>Make a reservation</title>
	<!-- Include Bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
	<div class="container mt-5">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<form action="bookings/bookingpost" method="post">
					<div class="form-group">
						<label for="numChildren">Number of children:</label>
						<input type="number" name="numChildren" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="numAdults">Number of adults:</label>
						<input type="number" name="numAdults" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="checkInDate">Check-in date:</label>
						<input type="date" name="checkInDate" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="checkOutDate">Check-out date:</label>
						<input type="date" name="checkOutDate" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="numNights">Number of nights:</label>
						<input type="number" name="numNights" class="form-control" required>
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	</div>
<!-- Include Bootstrap JS -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html> 