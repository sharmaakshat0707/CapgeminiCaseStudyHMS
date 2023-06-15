package capgemini.casestudy.hms;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import capgemini.casestudy.hms.model.CreditCardDetails;
import capgemini.casestudy.hms.model.Role;
import capgemini.casestudy.hms.model.User;
import capgemini.casestudy.hms.repository.RoleRepository;
import capgemini.casestudy.hms.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class AppStartupRunner implements ApplicationRunner {

	private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
    	List<Role> roles = roleRepository.findAll();
    	Role role = new Role();
    	if(roles.isEmpty()) {
    		role.setName("RECEPTIONIST");
    		Role role2 = new Role();
    		role2.setName("USER");
    		Role role3 = new Role();
    		role3.setName("OWNER");
    		Role role4  = new Role();
    		role4.setName("MANAGER");
    		roleRepository.save(role);
    		roleRepository.save(role2);
    		roleRepository.save(role3);
    		roleRepository.save(role4);
    	}
    	
    	User isReceptionistExist = userRepository.findByUsername("isha");
    	if(isReceptionistExist==null) {
    		User user = new User();
    		user.setPassword(bCryptPasswordEncoder.encode("123456789e"));
    		user.setUsername("isha");
    		user.setEmail("IshaAgrawal123@gmail.com");
    		user.setFirstName("Isha");
    		user.setLastName("Agrawal");
    		user.setCity("Shahdol");
    		Role getRole = roleRepository.findRoleByName("RECEPTIONIST");
    		user.setRole(getRole);
    		userRepository.save(user);    		
    	}
    	
    	User isOwnerExist = userRepository.findByUsername("Akshat");
    	if (isOwnerExist == null) {
    		User ownerUser = new User();
    		ownerUser.setPassword(bCryptPasswordEncoder.encode("AkshatLTO1@#$"));
    		ownerUser.setUsername("Akshat");
    		ownerUser.setEmail("sharmaakshat007@gmail.com");
    		ownerUser.setFirstName("Akshat");
    		ownerUser.setLastName("Sharma");
    		ownerUser.setCity("Gwalior");
    		Role ownerRole = roleRepository.findRoleByName("OWNER");
    		ownerUser.setRole(ownerRole);
    		userRepository.save(ownerUser);    		
    	}
    	User isManagerExist = userRepository.findByUsername("Miti");
    	if (isManagerExist == null) {
    		User managerUser = new User();
    		managerUser.setPassword(bCryptPasswordEncoder.encode("Miti1234"));
    		managerUser.setUsername("Miti");
    		managerUser.setEmail("mitiparashar2@gmail.com");
    		managerUser.setFirstName("Miti");
    		managerUser.setLastName("Parashar");
    		managerUser.setCity("Bhopal");
    		Role managerRole = roleRepository.findRoleByName("MANAGER");
    		managerUser.setRole(managerRole);
    		userRepository.save(managerUser);    		
    	}
    }
}