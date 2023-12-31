package capgemini.casestudy.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.User;

public interface BookingRepository extends JpaRepository<Booking , Integer>{

	@Query(value = "SELECT * FROM booking WHERE fk_room_id = ?1",nativeQuery = true)
	Booking findByRoomId(Long id);


	
	

}
