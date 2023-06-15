package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.CreditCardDetails;

import java.util.List;

public interface CreditCardDetailsService {

    CreditCardDetails addCreditCardDetails(CreditCardDetails creditCardDetails);

    CreditCardDetails getCreditCardDetailsById(Long id);

    CreditCardDetails updateCreditCardDetails(Long id, CreditCardDetails updatedCreditCardDetails);

    boolean deleteCreditCardDetails(Long id);

    List<CreditCardDetails> fetchAllCreditCardDetails();
}
