package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.exception.NotFoundException;
import capgemini.casestudy.hms.model.Room;

import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(Long id) throws NotFoundException;
    Room saveRoom(Room room);
    Room updateRoom(Long id, Room updatedRoom) throws NotFoundException;
    void deleteRoom(Long id) throws NotFoundException;
	List<Room> getAllAvailableByDateAndCapacity(BookingDTO availMap);
	
}
