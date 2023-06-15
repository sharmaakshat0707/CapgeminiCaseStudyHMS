package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.CreditCardDetails;
import capgemini.casestudy.hms.repository.CreditCardDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardDetailsServiceImpl implements CreditCardDetailsService {

    private final CreditCardDetailsRepository creditCardDetailsRepository;

    @Autowired
    public CreditCardDetailsServiceImpl(CreditCardDetailsRepository creditCardDetailsRepository) {
        this.creditCardDetailsRepository = creditCardDetailsRepository;
    }

    @Override
    public CreditCardDetails addCreditCardDetails(CreditCardDetails creditCardDetails) {
        return creditCardDetailsRepository.save(creditCardDetails);
    }

    @Override
    public CreditCardDetails getCreditCardDetailsById(Long id) {
        return creditCardDetailsRepository.findById(id).orElse(null);
    }

    @Override
    public CreditCardDetails updateCreditCardDetails(Long id, CreditCardDetails updatedCreditCardDetails) {
        CreditCardDetails existingCreditCardDetails = creditCardDetailsRepository.findById(id).orElse(null);
        if (existingCreditCardDetails != null) {
            existingCreditCardDetails.setCardNumber(updatedCreditCardDetails.getCardNumber());
            existingCreditCardDetails.setCardHolderName(updatedCreditCardDetails.getCardHolderName());
            existingCreditCardDetails.setExpirationMonth(updatedCreditCardDetails.getExpirationMonth());
            existingCreditCardDetails.setExpirationYear(updatedCreditCardDetails.getExpirationYear());
            existingCreditCardDetails.setCvv(updatedCreditCardDetails.getCvv());
            return creditCardDetailsRepository.save(existingCreditCardDetails);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteCreditCardDetails(Long id) {
        if (creditCardDetailsRepository.existsById(id)) {
            creditCardDetailsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<CreditCardDetails> fetchAllCreditCardDetails() {
        return (List<CreditCardDetails>) creditCardDetailsRepository.findAll();
    }
}
