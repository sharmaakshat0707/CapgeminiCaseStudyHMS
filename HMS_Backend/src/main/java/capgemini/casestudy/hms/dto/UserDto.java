package capgemini.casestudy.hms.dto;

import capgemini.casestudy.hms.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String city;

    public User getUserFromDto(){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setCity(city);
        return user;
    } 
}