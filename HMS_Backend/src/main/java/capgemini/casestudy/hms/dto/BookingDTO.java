package capgemini.casestudy.hms.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
	
	private Integer bookingId;
	private Integer numChildren;
	private Integer numAdults;
	private Integer numNights;
	private String checkInDate;
	private String checkOutDate;
	private List<Long> roomIds;
	private List<Long> guestIds;
}