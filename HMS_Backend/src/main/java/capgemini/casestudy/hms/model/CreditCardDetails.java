package capgemini.casestudy.hms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Table(name = "credit_card_details")
@Data
public class CreditCardDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private Integer expirationMonth;
    
    @Column(nullable = false)
    private Integer expirationYear;

    @Column(nullable = false)
    private String cvv;
    
    

   

}
