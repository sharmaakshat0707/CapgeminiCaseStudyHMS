package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Contact;
import capgemini.casestudy.hms.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact createContactMessage(Contact contactMessage) {
        return contactRepository.save(contactMessage);
    }
}
