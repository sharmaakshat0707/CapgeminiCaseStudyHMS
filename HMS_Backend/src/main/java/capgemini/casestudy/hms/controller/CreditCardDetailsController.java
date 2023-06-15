package capgemini.casestudy.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import capgemini.casestudy.hms.model.CreditCardDetails;
import capgemini.casestudy.hms.service.CreditCardDetailsService;

@RestController
@CrossOrigin("*")
@RequestMapping("/credit-card-details")
public class CreditCardDetailsController {

    private final CreditCardDetailsService creditCardDetailsService;

    @Autowired
    public CreditCardDetailsController(CreditCardDetailsService creditCardDetailsService) {
        this.creditCardDetailsService = creditCardDetailsService;
    }

    @PostMapping
    public ResponseEntity<CreditCardDetails> addCreditCardDetails(@RequestBody CreditCardDetails creditCardDetails) {
        CreditCardDetails createdCreditCardDetails = creditCardDetailsService.addCreditCardDetails(creditCardDetails);
        return new ResponseEntity<>(createdCreditCardDetails, HttpStatus.CREATED);
    }
    
    @GetMapping("/allCardDetails")
    public ResponseEntity<List<CreditCardDetails>> getAllCreditCardDetails() {
        List<CreditCardDetails> cardDetails = creditCardDetailsService.fetchAllCreditCardDetails();
        return new ResponseEntity<>(cardDetails, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditCardDetails> getCreditCardDetailsById(@PathVariable Long id) {
        CreditCardDetails creditCardDetails = creditCardDetailsService.getCreditCardDetailsById(id);
        if (creditCardDetails != null) {
            return new ResponseEntity<>(creditCardDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CreditCardDetails> updateCreditCardDetails(@PathVariable Long id, @RequestBody CreditCardDetails creditCardDetails) {
        CreditCardDetails updatedCreditCardDetails = creditCardDetailsService.updateCreditCardDetails(id, creditCardDetails);
        if (updatedCreditCardDetails != null) {
            return new ResponseEntity<>(updatedCreditCardDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCreditCardDetails(@PathVariable Long id) {
        boolean deleted = creditCardDetailsService.deleteCreditCardDetails(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
