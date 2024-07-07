import React from 'react';
import Enquiry from './Enquiry';
import '../styles/DayEnquiry.css';

const DayEnquiry = ({ date, enquiries }) => {
  return (
    <div className="day-enquiry">
      <h5 className="date">{date}</h5>
      {enquiries.map((enquiry, index) => (
        <Enquiry
          key={index}
          title={enquiry.title}
          budget={enquiry.budget}
          details={enquiry.details}
        />
      ))}
    </div>
  );
};

export default DayEnquiry;
