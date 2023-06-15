import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createStaff,
  getStaffById,
  updateStaffById,
} from '../services/StaffService';

const OwnerAddStaffForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchStaff();
    }
  }, [id]);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getStaffById(id, token);
      const staffData = response.data;
      setName(staffData.name);
      setEmail(staffData.email);
      setSalary(staffData.salary);
      setDesignation(staffData.designation);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const saveStaff = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const staff = { name, email, salary, designation };

    try {
      if (id) {
        await updateStaffById(id, staff, token);
      } else {
        await createStaff(staff, token);
      }
      navigate('/listOfStaff');
      alert("Update Successful")
    } catch (error) {
      console.error('Error saving/updating staff:', error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Salary:</label>
                  <input
                    type="text"
                    placeholder="Enter salary"
                    name="salary"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Designation:</label>
                  <input
                    type="text"
                    placeholder="Enter designation"
                    name="designation"
                    className="form-control"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                <button className="btn btn-success" onClick={saveStaff}>
                  {id ? 'Update' : 'Submit'}
                </button>
                <Link to="/listOfStaff" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAddStaffForm;