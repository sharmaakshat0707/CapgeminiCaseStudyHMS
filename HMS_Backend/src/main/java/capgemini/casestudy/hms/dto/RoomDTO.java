package capgemini.casestudy.hms.dto;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;

import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class RoomDTO {
	
	private Long roomId;
	private Integer roomNumber;
    private String roomType;
    private Double price;
    private Integer maxCapacity;
    private String roomDescription;
    
	private byte[] image;

    @JsonIgnore
    private Booking booking;
    
    public Room convertRoomDTOToRoom(RoomDTO roomDto) {
    	Room room = new Room();
    	BeanUtils.copyProperties(roomDto, room);
    	return room;
    }
    
    public RoomDTO convertRoomToRoomDTO(Room room) {
    	RoomDTO roomDTO = new RoomDTO();
    	BeanUtils.copyProperties(room, roomDTO);
    	return roomDTO;
    }
}
