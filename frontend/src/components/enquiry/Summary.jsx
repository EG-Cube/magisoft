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
  let month = months[d.getMonth()];

  const total = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status !== "Archived") {
      acc += 1;
    }
    return acc;
  }, 0);

  const ongoing = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status === "Ongoing") {
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

  const completed = enquiries?.reduce((acc, enquiry) => {
    if (enquiry.status === "Completed") {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div className="centre-section1">
      <div className="section1">
        <div className="month-div">
          <h2>{month}'s Enquiries</h2>
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
              <h4>Ongoing</h4>
              <h5 style={{ color: "#F3BF39" }}>{ongoing}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Completed</h4>
              <h5 style={{ color: "#9E7C9C" }}>{completed}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="pie">
        <PieChart pending={pending} ongoing={ongoing} completed={completed} />
      </div>
    </div>
  );
};

export default Summary;
