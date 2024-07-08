import React, { useEffect } from "react";
import "../styles/Enquiry.css";

const EnquiryCard = ({ enquiry }) => {
  useEffect(() => {
    console.log(enquiry);
  }, []);

  return (
    <div className="enq">
      {/* {enquiry} */}
      <div className="left">
        <div className="title" style={{ marginLeft: "10px" }}>
          {enquiry?.firstName} {enquiry?.lastName}
        </div>
        <div className="budget">${enquiry?.budget}</div>
        <div className="details">
          <span>A</span>
          {enquiry?.passengers?.adults}
          <span>C</span>
          {enquiry?.passengers?.children}
          <span>I</span>
          {enquiry?.passengers?.infants}
        </div>
      </div>
      <div className="right">
        <div className="package">
          {enquiry?.destinations} ({enquiry?.numberOfDays}D)
        </div>
        <div className="status">{enquiry?.status}</div>
      </div>
    </div>
  );
};

export default EnquiryCard;
