import React from "react";
import "../../styles/Summary.css";
import PieChart from "./PieChart";

const Summary = ({ enquiries }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const currentMonth = d.getMonth();
  const currentYear = d.getFullYear();

  const enquiriesThisMonth = enquiries?.filter(enquiry => {
    const enquiryDate = new Date(enquiry.createdAt); // Assuming 'date' field exists in enquiry object
    return enquiryDate.getMonth() === currentMonth && enquiryDate.getFullYear() === currentYear;
  });

  console.log("This month : ",enquiriesThisMonth)

  const total = enquiriesThisMonth?.reduce((acc, enquiry) => {
    if (enquiry.status !== "Archived") {
      acc += 1;
    }
    return acc;
  }, 0);

  const verified = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status === "Verified") {
      acc += 1;
    }
    return acc;
  }, 0);

  const pending = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status === "Pending") {
      acc += 1;
    }
    return acc;
  }, 0);

  const archived = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status === "Archived") {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div className="centre-section1">
      <div className="section1">
        <div className="month-div">
          <h2>{months[currentMonth]}'s Enquiries</h2>
          <h1>{total}</h1>
        </div>
        <div className="pen3div">
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Pending</h4>
              <h5 style={{ color: "#652361" }}>{pending}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Verified</h4>
              <h5 style={{ color: "#F3BF39" }}>{verified}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Archived</h4>
              <h5 style={{ color: "#9E7C9C" }}>{archived}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="pie">
        <PieChart pending={pending} verified={verified} archived={archived} />
      </div>
    </div>
  );
};

export default Summary;
