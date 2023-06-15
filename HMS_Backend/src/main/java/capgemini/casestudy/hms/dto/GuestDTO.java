package capgemini.casestudy.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuestDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private BookingDTO booking;
}
