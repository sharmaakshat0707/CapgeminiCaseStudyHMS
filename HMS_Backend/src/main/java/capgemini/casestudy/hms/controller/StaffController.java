package capgemini.casestudy.hms.controller;

import capgemini.casestudy.hms.model.Staff;
import capgemini.casestudy.hms.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/staff")
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','OWNER')")
    @PostMapping("/postStaff")
    public ResponseEntity<Staff> createStaffMember(@RequestBody Staff staff) {
        Staff createdStaff = staffService.createStaffMember(staff);
        return new ResponseEntity<>(createdStaff, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('MANAGER','OWNER')")
    @GetMapping("/allStaff")
    public ResponseEntity<List<Staff>> getAllStaffMembers() {
        List<Staff> staffMembers = staffService.getAllStaffMembers();
        return new ResponseEntity<>(staffMembers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('MANAGER','OWNER')")
    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffMemberById(@PathVariable("id") Long id) {
        Optional<Staff> staffMember = staffService.getStaffMemberById(id);
        return staffMember.map(staff -> new ResponseEntity<>(staff, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAnyRole('MANAGER','OWNER')")
    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaffMember(@PathVariable("id") Long id, @RequestBody Staff staff) {
        Optional<Staff> existingStaff = staffService.getStaffMemberById(id);
        if (existingStaff.isPresent()) {
            staff.setId(id);
            Staff updatedStaff = staffService.updateStaffMember(staff);
            return new ResponseEntity<>(updatedStaff, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyRole('MANAGER','OWNER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaffMember(@PathVariable("id") Long id) {
        Optional<Staff> existingStaff = staffService.getStaffMemberById(id);
        if (existingStaff.isPresent()) {
            staffService.deleteStaffMember(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
