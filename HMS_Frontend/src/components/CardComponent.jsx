import React from "react";
import "../css/CardComponent.css";

const CardComponent = () => {
  return (
    <div className="card-background">
       <div className="cardfirst">
        <img src="https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
       </div>
       <div className="cardfirst">
        <img src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
       </div>
       <div className="cardfirst">
        <img src="https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
       </div>
    </div>
  );
};

export default CardComponent;