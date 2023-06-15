package capgemini.casestudy.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import capgemini.casestudy.hms.dto.BookingDTO;
import capgemini.casestudy.hms.dto.RoomDTO;
import capgemini.casestudy.hms.exception.NotFoundException;
import capgemini.casestudy.hms.model.Room;
import capgemini.casestudy.hms.service.RoomService;


import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;
	
	@Autowired
	private RoomDTO dto;

	// Create a new room
	@PreAuthorize("hasAnyRole('MANAGER','OWNER')")
	@PostMapping("/roompost")
	public ResponseEntity<RoomDTO> createRoom(@RequestParam("roomNumber") Integer roomNumber,
            @RequestParam("roomType") String roomType,
            @RequestParam("price") Double price,
            @RequestParam("maxCapacity") Integer maxCapacity,
            @RequestParam("roomDescription") String roomDescription,
            @RequestParam("image") MultipartFile imageFile) {
		try {
			byte[] imageBytes = null;
            if (!imageFile.isEmpty()) {
                imageBytes = imageFile.getBytes();
            }

            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setRoomNumber(roomNumber);
            roomDTO.setRoomType(roomType);
            roomDTO.setMaxCapacity(maxCapacity);
            roomDTO.setPrice(price);
            roomDTO.setImage(imageBytes);
            roomDTO.setRoomDescription(roomDescription);
            Room room = roomService.saveRoom(dto.convertRoomDTOToRoom(roomDTO));
		return ResponseEntity.status(HttpStatus.CREATED).body(dto.convertRoomToRoomDTO(room));
		}catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	// Get all rooms
	@PreAuthorize("hasAnyRole('MANAGER','OWNER')")
	@GetMapping
	public ResponseEntity<List<Room>> getAllRooms() {
		List<Room> rooms = roomService.getAllRooms();
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	@PostMapping("/checkAvailableRooms")
	public ResponseEntity<List<Room>> checkAvailabilityByDate(@RequestBody BookingDTO availMap) {
	    String currentDate = LocalDate.now().toString();
	    if (availMap.getCheckOutDate().compareTo(availMap.getCheckInDate()) >= 0) {
	        if (availMap.getCheckInDate().compareTo(currentDate) >= 0
	                && availMap.getCheckOutDate().compareTo(currentDate) >= 0) {
	            List<Room> availableRooms = roomService.getAllAvailableByDateAndCapacity(availMap);
	            return ResponseEntity.ok(availableRooms);
	        }
	    }
	    return ResponseEntity.badRequest().build();
	}

	// Get a single room by ID
	@PreAuthorize("hasAnyRole('MANAGER','OWNER')")
	@GetMapping("/{id}")
	public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
		try {
			Room room = roomService.getRoomById(id);
			return new ResponseEntity<>(room, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Update a room
	@PreAuthorize("hasAnyRole('MANAGER','OWNER')")
	@PutMapping("/{id}")
	public ResponseEntity<RoomDTO> updateRoom(@PathVariable Long id,
	        @RequestParam("roomNumber") Integer roomNumber,
	        @RequestParam("roomType") String roomType,
	        @RequestParam("price") Double price,
	        @RequestParam("maxCapacity") Integer maxCapacity,
	        @RequestParam("roomDescription") String roomDescription,
	        @RequestParam(value = "image", required = false) MultipartFile imageFile) {
	    try {
	        Room room = roomService.getRoomById(id);
	        room.setRoomNumber(roomNumber);
	        room.setRoomType(roomType);
	        room.setPrice(price);
	        room.setMaxCapacity(maxCapacity);
	        room.setRoomDescription(roomDescription);
	        
	        if (imageFile != null && !imageFile.isEmpty()) {
	            byte[] imageBytes = imageFile.getBytes();
	            room.setImage(imageBytes);
	        }
	        
	        Room updatedRoom = roomService.saveRoom(room);
	        RoomDTO roomDTO = dto.convertRoomToRoomDTO(updatedRoom);
	        
	        return ResponseEntity.ok(roomDTO);
	    } catch (NotFoundException e) {
	        return ResponseEntity.notFound().build();
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().build();
	    }
	}

	// Delete a room
	@PreAuthorize("hasAnyRole('MANAGER','OWNER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
		try {
			roomService.deleteRoom(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
