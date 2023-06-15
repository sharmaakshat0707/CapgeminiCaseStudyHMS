import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStaffs, deleteStaffById } from '../services/StaffService';
import { Button, ButtonGroup } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ListStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaffs, setFilteredStaffs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStaffMembers = async () => {
      try {
        const response = await getAllStaffs(token);
        setStaffs(response.data);
        setFilteredStaffs(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching staff members:', error);
        }
      }
    };

    if (token) {
      fetchStaffMembers();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = staffs.filter((staff) => {
      const staffName = staff.name.toLowerCase();
      const staffEmail = staff.email.toLowerCase();
      const query = searchQuery.toLowerCase();
      return staffName.includes(query) || staffEmail.includes(query);
    });
    setFilteredStaffs(filtered);
  }, [searchQuery, staffs]);

  const deleteStaffMember = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await deleteStaffById(id, token);
      setStaffs((prevStaffs) => prevStaffs.filter((staff) => staff.id !== id));
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    const tableData = filteredStaffs.map((staff) => [
      staff.id,
      staff.name,
      staff.email,
      staff.salary,
      staff.designation
    ]);

    doc.setFontSize(12);
    doc.text('List Staff', 14, 15);

    doc.autoTable({
      head: [['Staff ID', 'Staff Name', 'Staff Email', 'Staff Salary', 'Staff Designation']],
      body: tableData,
      startY: 20
    });

    doc.save('staffs.pdf');
  };

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <div>
        <ButtonGroup>
          <Button tag={Link} to="/owner/dashboard">
            Home
          </Button>
          <Button tag={Link} to="/listOfRoom">
            Rooms
          </Button>
          <Button tag={Link} to="/listOfBooking">
            Bookings
          </Button>
          <Button tag={Link} to="/listOfStaff">
            Staff
          </Button>
          <Button tag={Link} to="/listOfGuest">
            Guest
          </Button>
        </ButtonGroup>
      </div>
      <h2 className='text-center'>List Staff</h2>
      <div className='text-right'>
        <Link to='/ownerStaffList' className='btn btn-primary mb-2'>
          Add Staff
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='search'
            placeholder='Search by staff name or email'
            onChange={handleSearch}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <button className='btn btn-primary ml-auto' onClick={generatePdf}>
            Generate PDF
          </button>
        </div>
      </div>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Staff Name</th>
            <th>Staff Email</th>
            <th>Staff Salary</th>
            <th>Staff Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffs.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.salary}</td>
              <td>{staff.designation}</td>
              <td>
                <Link className='btn btn-info' to={`/ownerEditStaff/${staff.id}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteStaffMember(staff.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStaff;
