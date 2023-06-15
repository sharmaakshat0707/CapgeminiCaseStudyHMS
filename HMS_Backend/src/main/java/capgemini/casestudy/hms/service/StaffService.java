package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffService {

    Staff createStaffMember(Staff staff);

    List<Staff> getAllStaffMembers();

    Optional<Staff> getStaffMemberById(Long id);

    Staff updateStaffMember(Staff staff);

    void deleteStaffMember(Long id);
}
