package capgemini.casestudy.hms.service;

import java.util.List;

import capgemini.casestudy.hms.dto.UserDto;
import capgemini.casestudy.hms.model.User;

public interface UserService {
    User save(UserDto user);
    List<User> findAll();
    User findOne(String username);
}