package capgemini.casestudy.hms.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "booking")
public class Booking {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookingId;
	private Integer numChildren;
	private Integer numAdults;
	private Integer numNights;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate checkInDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate checkOutDate;

	@OneToMany(mappedBy = "booking")
	private List<Room> rooms;
	
	@OneToMany(mappedBy = "booking")
	private List<Guest> Guest;

}
