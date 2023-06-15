package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Guest;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.util.List;

public interface GuestService {
    Guest addGuest(Guest guest);
    void deleteGuest(Long guestId);
    List<Guest> getAllGuests();
    Guest updateGuest(Long guestId, Guest guest) throws NotFoundException;
    Guest getGuest(Long guestId) throws NotFoundException;
}
