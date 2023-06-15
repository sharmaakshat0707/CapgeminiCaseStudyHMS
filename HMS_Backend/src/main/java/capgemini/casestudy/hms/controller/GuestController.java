package capgemini.casestudy.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capgemini.casestudy.hms.model.Guest;
import capgemini.casestudy.hms.service.GuestService;

@RequestMapping("/guest")
@CrossOrigin("*")
@RestController
public class GuestController {
	
	@Autowired 
	private GuestService guestService;
	
	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER','USER')")
    @PostMapping("/guests")
    public ResponseEntity<Guest> addGuest(@RequestBody Guest guest) {
        Guest savedGuest = guestService.addGuest(guest);
        return new ResponseEntity<>(savedGuest, HttpStatus.CREATED);//200 for sync 201 for async
    }
	
	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
    @RequestMapping("/guests")
	public List<Guest> getAllguests() {
		return guestService.getAllGuests();
		
	}

	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
    @DeleteMapping("/{guestId}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long guestId) {
        guestService.deleteGuest(guestId);
        return ResponseEntity.noContent().build();
    }
	

	@PreAuthorize("hasAnyRole('RECEPTIONIST','OWNER')")
    @PutMapping("/{guestId}")
    public ResponseEntity<Guest> updateGuest(@PathVariable Long guestId, @RequestBody Guest guest) throws NotFoundException {
        Guest updatedGuest = guestService.updateGuest(guestId, guest);
        return ResponseEntity.ok(updatedGuest);
    }

//    @GetMapping("/{guestId}")
//    public ResponseEntity<Guest> getGuest(@PathVariable Long guestId) throws NotFoundException {
//        Guest guest = guestService.getGuest(guestId);
//        return ResponseEntity.ok(guest);
//    }
	
	

}