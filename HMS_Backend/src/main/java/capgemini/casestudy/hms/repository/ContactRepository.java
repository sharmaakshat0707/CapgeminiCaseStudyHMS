package capgemini.casestudy.hms.repository;

import org.springframework.data.repository.CrudRepository;

import capgemini.casestudy.hms.model.Contact;

public interface ContactRepository extends CrudRepository<Contact,Long> {

}
