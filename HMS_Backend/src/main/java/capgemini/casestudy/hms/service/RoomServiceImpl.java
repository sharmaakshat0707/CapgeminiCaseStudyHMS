package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.exception.NotFoundException;
import capgemini.casestudy.hms.model.Booking;
import capgemini.casestudy.hms.model.Room;
import capgemini.casestudy.hms.repository.BookingRepository;
import capgemini.casestudy.hms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long id) throws NotFoundException {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            return optionalRoom.get();
        } else {
            throw new NotFoundException("Room not found");
        }
    }

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room updatedRoom) throws NotFoundException {
        Room room = getRoomById(id);
        room.setRoomNumber(updatedRoom.getRoomNumber());
        room.setRoomType(updatedRoom.getRoomType());
        room.setMaxCapacity(updatedRoom.getMaxCapacity());
        room.setRoomDescription(updatedRoom.getRoomDescription());
        room.setImage(updatedRoom.getImage());
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long id) throws NotFoundException {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            roomRepository.delete(room);
        } else {
            throw new NotFoundException("Room not found");
        }
    }

    @Transactional
    @Override
    public List<Room> getAllAvailableByDateAndCapacity(BookingDTO availMap) {
        List<Booking> bookings = bookingRepository.findAll();
        LocalDate checkInDate = LocalDate.parse(availMap.getCheckInDate());
        LocalDate checkOutDate = LocalDate.parse(availMap.getCheckOutDate());
        int numAdults = availMap.getNumAdults();
        int numChildren = availMap.getNumChildren();
        int numGuests = numAdults + numChildren;
        
        List<Room> availableRooms = new ArrayList<>();
        availableRooms.addAll(roomRepository.findAllByBookingIsNullAndMaxCapacityGreaterThanEqual(numGuests));

        for (Booking booking : bookings) {
            LocalDate savedCheckOutDate = booking.getCheckOutDate();
            int isCheckInPossible = checkInDate.compareTo(savedCheckOutDate);
            int isCheckOutPossible = checkOutDate.compareTo(savedCheckOutDate);

            if (isCheckInPossible >= 0 && isCheckOutPossible > 0) {
                List<Room> allRooms = roomRepository.findAllByBookingAndMaxCapacityGreaterThanEqual(booking, numGuests);
                availableRooms.addAll(allRooms);
            }
        }

        return availableRooms;
    }

	
	
	
	

	

}
