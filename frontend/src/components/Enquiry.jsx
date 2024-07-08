import React from 'react';
import '../styles/Enquiry.css';

const Enquiry = ({ title, budget, details }) => {
  return (
    <div className="enq">
      <div className="left">
        <div className="title" style={{ marginLeft: '10px' }}>{title}</div>
        <div className="budget">${budget}</div>
        <div className="details">
          <span>A</span>{details[0]}
          <span>C</span>{details[1]}
          <span>I</span>{details[2]}
        </div>
      </div>
      <div className="right">
        <div className="package">Dubai (4D 3N)</div>
        <div className="status">Pending</div>
      </div>
    </div>
  );
};

export default Enquiry;
