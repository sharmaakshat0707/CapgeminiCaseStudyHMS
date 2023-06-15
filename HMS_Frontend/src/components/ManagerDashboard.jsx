import React from "react";
import ManagerNavbar from "./ManagerNavbar";
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';

const ManagerDashboard = () => {
  return (
    <div>
      <div>
        <ButtonGroup style={{marginTop:"100px"}}>
          <Button tag={Link} to="/listRooms">
            Rooms
          </Button>
          <Button tag={Link} to="/listStaff">
            Staff
          </Button>
        </ButtonGroup>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
