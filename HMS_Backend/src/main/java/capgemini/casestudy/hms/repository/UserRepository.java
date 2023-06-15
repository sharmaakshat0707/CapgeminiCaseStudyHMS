package capgemini.casestudy.hms.repository;

import org.springframework.data.repository.CrudRepository;

import capgemini.casestudy.hms.model.User;

public interface UserRepository extends CrudRepository<User,Long>  {
	
	User findByUsername(String username);
	
	
}
