package capgemini.casestudy.hms.repository;

import org.springframework.data.repository.CrudRepository;

import capgemini.casestudy.hms.model.Staff;

public interface StaffRepository extends CrudRepository<Staff , Long> {
	
	

}
