import React from "react";
import Enquiry from "./EnquiryCard";
import "../styles/DayEnquiry.css";

const DayEnquiry = ({ date, enquiries }) => {
  return (
    <div className="day-enquiry">
      <h5 className="date">{date}</h5>
      {enquiries?.map((enquiry, index) => (
        <Enquiry key={index} data={enquiry} />
      ))}
    </div>
  );
};

export default DayEnquiry;
