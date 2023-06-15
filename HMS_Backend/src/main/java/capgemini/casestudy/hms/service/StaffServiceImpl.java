package capgemini.casestudy.hms.service;

import capgemini.casestudy.hms.model.Staff;
import capgemini.casestudy.hms.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffServiceImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public Staff createStaffMember(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public List<Staff> getAllStaffMembers() {
        return (List<Staff>) staffRepository.findAll();
    }

    @Override
    public Optional<Staff> getStaffMemberById(Long id) {
        return staffRepository.findById(id);
    }

    @Override
    public Staff updateStaffMember(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public void deleteStaffMember(Long id) {
        staffRepository.deleteById(id);
    }
}
