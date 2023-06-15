package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Guest;
import capgemini.casestudy.hms.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestServiceImpl implements GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
    public Guest addGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    @Override
    public void deleteGuest(Long guestId) {
        guestRepository.deleteById(guestId);
    }

    @Override
    public List<Guest> getAllGuests() {
        List<Guest> guests = new ArrayList<>();
        guestRepository.findAll().forEach(guests::add);
        return guests;
    }

    @Override
    public Guest updateGuest(Long guestId, Guest guest) throws NotFoundException {
        Guest existingGuest = guestRepository.findById(guestId)
                .orElseThrow(() -> new NotFoundException());

        existingGuest.setName(guest.getName());
        existingGuest.setEmail(guest.getEmail());
        existingGuest.setPhone(guest.getPhone());

        return guestRepository.save(existingGuest);
    }

    @Override
    public Guest getGuest(Long guestId) throws NotFoundException {
        return guestRepository.findById(guestId)
                .orElseThrow(() -> new NotFoundException());
    }
}
