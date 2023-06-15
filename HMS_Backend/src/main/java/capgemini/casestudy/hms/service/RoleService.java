package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Role;

public interface RoleService {
    Role findByName(String name);
}