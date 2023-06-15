package capgemini.casestudy.hms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "rooms")
@Data
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false, unique = true)
    private Integer roomNumber;

    @Column(nullable = false)
    private String roomType;
    
    private Double price;

    @Column(nullable = false)
    private Integer maxCapacity;
    
    private String roomDescription;
    
    @Lob
    @Type(type = "org.hibernate.type.ImageType")
	private byte[] image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
    
//    @Transient
//    private int count;
    
}
