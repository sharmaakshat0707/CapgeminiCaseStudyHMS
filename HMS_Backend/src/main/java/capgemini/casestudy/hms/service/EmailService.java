package capgemini.casestudy.hms.service;

public interface EmailService {

    void sendBookingDetails(String recipientEmail, String subject, String message);
}
