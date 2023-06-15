package capgemini.casestudy.hms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.Room;

public interface RoomRepository extends JpaRepository<Room , Long> {
	
	@Query(value = "select u from Room u where u.booking IS NULL")
	List<Room> findAllByBookingIsNull();

	List<Room> findAllByBooking(Booking booking);
	
	
	 @Query(value = "SELECT r FROM Room r WHERE r.booking IS NULL AND r.maxCapacity >= :numGuests")
	    List<Room> findAllByBookingIsNullAndMaxCapacityGreaterThanEqual(int numGuests);

	    @Query(value = "SELECT r FROM Room r WHERE r.booking = :booking AND r.maxCapacity >= :numGuests")
	    List<Room> findAllByBookingAndMaxCapacityGreaterThanEqual(Booking booking, int numGuests);
	

}
