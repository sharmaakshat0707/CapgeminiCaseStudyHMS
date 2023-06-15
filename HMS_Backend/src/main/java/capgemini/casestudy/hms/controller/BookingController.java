package capgemini.casestudy.hms.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.dto.GuestDTO;
import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.Guest;
import capgemini.casestudy.hms.service.BookingService;
import capgemini.casestudy.hms.service.EmailService;
import capgemini.casestudy.hms.service.GuestService;

@CrossOrigin("*")
@RestController
@RequestMapping("/bookings")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@Autowired
	private GuestService guestService;
	
	@Autowired EmailService emailService;

	@GetMapping
	public String get() {
		return "index";
	}

	@PostMapping
	public ResponseEntity<?> saveGuest(@RequestBody Guest guest) {
		Guest savedGuest = guestService.addGuest(guest);
		return ResponseEntity.created(URI.create("/guests/" + savedGuest.getId())).build();
	}

	@PreAuthorize("hasAnyRole('USER', 'RECEPTIONIST','OWNER')")
	@PostMapping("/bookingpost")
	  public ResponseEntity<?> addBooking(@RequestBody BookingDTO bookingDTO) throws NotFoundException {
        Booking booking = bookingService.saveBooking(bookingDTO);
        if (booking == null) {
            return ResponseEntity.badRequest().build();
        }
        
        
        Long guestId = bookingDTO.getGuestIds().get(0);
        Guest guest = guestService.getGuest(guestId);
        if (guest == null) {
            return ResponseEntity.notFound().build();
        }
        String recipientEmail = guest.getEmail();

        // Send email notification
        String subject = "Booking Confirmation";
        String message = "Your booking has been confirmed. Booking ID: " + booking.getBookingId() + "\n" +"Your check in date and check out date are:" + " checkInDate: " + booking.getCheckInDate()+" " + "\n" + " checkOutDate: " + booking.getCheckOutDate() +"\n\n\n"+ "Enjoy Your Stay";

        emailService.sendBookingDetails(recipientEmail, subject, message);

        return ResponseEntity.ok(booking);
    }

	// get employee by id rest api
	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER','USER')")
	@GetMapping("/allBookings")
	public List<Booking> getAllBookings() {
		return bookingService.getAllBookings();

	}

	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
		bookingService.deleteBooking(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
	@PutMapping("/{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable int id, @RequestBody Booking booking)
			throws NotFoundException {
		Booking updatedBooking = bookingService.updateBooking(id, booking);
		return ResponseEntity.ok(updatedBooking);
	}

	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
	@GetMapping("/{id}")
	public ResponseEntity<Booking> getBooking(@PathVariable int id) throws NotFoundException {
		Booking booking = bookingService.getBooking(id);
		return ResponseEntity.ok(booking);
	}

	@ExceptionHandler(ConversionFailedException.class)
	public ResponseEntity<String> handleConversionFailedException(ConversionFailedException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Please use yyyy-MM-dd format.");
	}

}