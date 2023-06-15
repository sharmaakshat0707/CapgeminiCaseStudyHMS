package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.Guest;
import capgemini.casestudy.hms.model.Room;
import capgemini.casestudy.hms.model.User;
import capgemini.casestudy.hms.repository.BookingRepository;
import capgemini.casestudy.hms.repository.GuestRepository;
import capgemini.casestudy.hms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private GuestRepository guestRepository;
    
   


    @Transactional
    @Override
    public Booking saveBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setNumNights(bookingDTO.getNumNights());
        booking.setCheckInDate(LocalDate.parse((CharSequence) bookingDTO.getCheckInDate()));
        booking.setCheckOutDate(LocalDate.parse((CharSequence) bookingDTO.getCheckOutDate()));
        Booking savedBooking = bookingRepository.save(booking);
        for (Long roomId : bookingDTO.getRoomIds()) {
            Room room = roomRepository.findById(roomId).get();
            room.setBooking(savedBooking);
            roomRepository.save(room);
        }
        
        for(Long guestId: bookingDTO.getGuestIds()) {
        	Guest guest = guestRepository.findById(guestId).get();
        	guest.setBooking(savedBooking);
        	guestRepository.save(guest);
        }
        
        List<Room> rooms = roomRepository.findAllByBooking(savedBooking);
        
        List<Guest> guests = guestRepository.findAllByBooking(savedBooking);
        
        Booking booking2 =  bookingRepository.findById(savedBooking.getBookingId()).get();
        booking2.setRooms(rooms);
        booking2.setGuest(guests);
        
        return booking2;
    }

    @Transactional
    @Override
    public void deleteBooking(int id) {
    	Booking booking = bookingRepository.findById(id).get();
    	List<Room> rooms = roomRepository.findAllByBooking(booking);
    	for(Room room: rooms) {
    		room.setBooking(null);
    		roomRepository.save(room);
    	}
    	List<Guest> guests = guestRepository.findAllByBooking(booking);
    	for(Guest guest:guests) {
    		guest.setBooking(null);
    		guestRepository.save(guest);
    	}
        bookingRepository.deleteById(id);
        
    }

    @Override
    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();
        bookingRepository.findAll().forEach(bookings::add);
        return bookings;
    }

    @Override
    public Booking updateBooking(int id, Booking booking) throws NotFoundException {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        existingBooking.setCheckInDate(booking.getCheckInDate());
        existingBooking.setCheckOutDate(booking.getCheckOutDate());
        existingBooking.setNumAdults(booking.getNumAdults());
        existingBooking.setNumChildren(booking.getNumChildren());
        existingBooking.setNumNights(booking.getNumNights());

        return bookingRepository.save(existingBooking);
    }

    @Override
    public Booking getBooking(int id) throws NotFoundException {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());
    }
}