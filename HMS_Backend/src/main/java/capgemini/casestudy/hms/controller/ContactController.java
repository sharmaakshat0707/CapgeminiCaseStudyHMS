package capgemini.casestudy.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import capgemini.casestudy.hms.model.Contact;
import capgemini.casestudy.hms.model.User;
import capgemini.casestudy.hms.service.ContactService;
import capgemini.casestudy.hms.service.EmailService;

@RestController
@CrossOrigin("*")
@RequestMapping("/contact")
public class ContactController {
	
	@Autowired
    private ContactService contactService;
	
	@Autowired
	private EmailService emailService;

    @PostMapping
    public Contact createContactMessage(@RequestBody Contact contactMessage) {
    	Contact sendContact = contactService.createContactMessage(contactMessage);
    	
    	 String recipientEmail = sendContact.getEmail();
         String subject = "Query Recieved";
         String message = "Dear " + sendContact.getName() + ",\n\n We recieved your query we will contact back to you within 24 hours.";
         emailService.sendBookingDetails(recipientEmail, subject, message);
        return sendContact;
    }
}
