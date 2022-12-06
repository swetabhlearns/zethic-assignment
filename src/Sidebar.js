import React from "react";
import "./sidebar.css";

const Sidebar = ({ individualInfo, setShowSideBar, showSideBar }) => {
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        X
      </button>
      <div className="sidebar-info" key={individualInfo.id}>
        <h1>{individualInfo.name} </h1>
        <h4>{individualInfo.job}</h4>
        {/* <p> Drives: {individualInfo.vehicleInfo.company} </p> */}
        <div className="contact">
          <h2>Contact Me: </h2>
          <p>{individualInfo.phone}</p>
          <p> {`${individualInfo.address},  ${individualInfo.country}`} </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
