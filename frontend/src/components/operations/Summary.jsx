import React from "react";
import "../../styles/Summary.css";
import PieChart from "./PieChart";

const Summary = ({ itineraries, enquiries }) => {
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

  const itinerariesThisMonth = itineraries?.filter((itinerary) => {
    const itineraryDate = new Date(itinerary.createdAt); // Assuming 'date' field exists in itinerary object
    return (
      itineraryDate.getMonth() === currentMonth &&
      itineraryDate.getFullYear() === currentYear
    );
  });

  console.log("This month : ", itinerariesThisMonth);

  const total = itinerariesThisMonth?.reduce((acc, itinerary) => {
    if (itinerary.status !== "Archived") {
      acc += 1;
    }
    return acc;
  }, 0);

  const completed = enquiries.reduce((acc, en) => {
    if (
      Array.isArray(en.itineraries) &&
      en.itineraries.length > 0
    ) {
      acc += 1;
    }
    return acc;
  }, 0)

  const pending = enquiries.reduce((acc, en) => {
    if (!Array.isArray(en.itineraries) || en.itineraries.length == 0) {
      acc += 1;
    }

    console.log(en);
    return acc;
  }, 0);

  return (
    <div className="centre-section1">
      <div className="section1">
        <div className="month-div">
          <h2>{months[currentMonth]}'s Itineraries</h2>
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
              <h4>Completed</h4>
              <h5 style={{ color: "#F3BF39" }}>
                {completed}
              </h5>
            </div>
          </div>
          {/* <div className="infodiv">
            <div className="info-div-flex">
              <h4>Itineraries</h4>
              <h5 style={{ color: "#9E7C9C" }}>{itineraries?.length}</h5>
            </div>
          </div> */}
        </div>
      </div>
      <div className="pie">
        <PieChart pending={pending} completed={completed} />
      </div>
    </div>
  );
};

export default Summary;
