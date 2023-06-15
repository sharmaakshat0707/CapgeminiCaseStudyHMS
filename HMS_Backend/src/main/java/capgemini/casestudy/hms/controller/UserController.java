package capgemini.casestudy.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capgemini.casestudy.hms.dto.AuthToken;
import capgemini.casestudy.hms.dto.LoginUser;
import capgemini.casestudy.hms.dto.UserDto;
import capgemini.casestudy.hms.model.User;
import capgemini.casestudy.hms.service.EmailService;
import capgemini.casestudy.hms.service.UserService;
import capgemini.casestudy.hms.utility.TokenProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

   @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> generateToken(@RequestBody LoginUser loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        User user = userService.findOne(loginUser.getUsername());
        return ResponseEntity.ok(new AuthToken(token,user.getRole().getName()));
    }

    @PostMapping("/register")
    public User saveUser(@RequestBody UserDto user){
    	 User savedUser = userService.save(user);

         // Send email notification
         String recipientEmail = user.getEmail();
         String subject = "Registration Successful";
         String message = "Dear " + user.getFirstName() + ",\n\nThank you for expressing your interest in staying at Lemon Tree. We are thrilled to inform you that your registration has been successfully processed, and we warmly welcome you to our establishment. We are confident that your experience with us will be nothing short of exceptional.";
         emailService.sendBookingDetails(recipientEmail, subject, message);

         return savedUser;
     }
    

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PreAuthorize("hasAnyRole('USER', 'OWNER','MANAGER','RECEPTIONIST')")
    @GetMapping("/userping")
    public String userPing(){
        return "Any User Can Read This";
    }
    
    @PreAuthorize("hasRole('OWNER')")
    @GetMapping("/adminping")
    public String adminPing() {
    	return "Only admin can read this";
    }

}