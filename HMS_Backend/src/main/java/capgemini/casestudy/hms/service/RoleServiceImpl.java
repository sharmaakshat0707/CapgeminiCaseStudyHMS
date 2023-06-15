package capgemini.casestudy.hms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import capgemini.casestudy.hms.model.Role;
import capgemini.casestudy.hms.repository.RoleRepository;

@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public Role findByName(String name) {
		Role role = roleRepository.findRoleByName(name);
		return role;
	}
}