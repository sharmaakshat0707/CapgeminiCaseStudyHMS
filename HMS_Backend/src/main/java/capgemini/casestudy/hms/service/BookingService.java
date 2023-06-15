package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.repository.BookingRepository;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.util.List;

public interface BookingService {
    Booking saveBooking(BookingDTO bookingDTO);
    void deleteBooking(int id);
    List<Booking> getAllBookings();
    Booking updateBooking(int id, Booking booking) throws NotFoundException;
    Booking getBooking(int id) throws NotFoundException;
}
