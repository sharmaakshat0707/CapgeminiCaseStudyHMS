package capgemini.casestudy.hms.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    
    
    private String firstName;
    
    
    private String lastName;
    
    private String city;
    
    @NonNull
    private String username;
    
    @NonNull
    @JsonIgnore
    private String password;
    
    
    private String email;
    

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "role_id",nullable = false)
    private Role role;
    
    
    

}