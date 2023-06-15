package capgemini.casestudy.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import capgemini.casestudy.hms.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	
	Role findRoleByName(String name);
}