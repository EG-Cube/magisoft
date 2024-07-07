import React from "react";
import "../styles/CentreSection.css";
import Summary from "./Summary";
import Sort from "./Sort";
import DayEnquiry from "./DayEnquiry";

const CentreSection = () => {
  const month = "July";
  const pending = 4;
  const ongoing = 6;
  const completed = 10;
  const total = pending + ongoing + completed;

  const enquiriesDay1 = [
    { title: "Elon Musk", budget: 300, details: [4, 1, 0] },
    { title: "Jeff Bezos", budget: 500, details: [2, 3, 1] },
  ];

  const enquiriesDay2 = [
    { title: "Bill Gates", budget: 400, details: [3, 2, 2] },
  ];

  return (
    <div className="CentreSection">
      <Summary month={month} total={total} pending={pending} ongoing={ongoing} completed={completed} />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for an enquiry"
      />
      <Sort />
      <DayEnquiry date="July 7, 2024" enquiries={enquiriesDay1} />
      <DayEnquiry date="July 8, 2024" enquiries={enquiriesDay2} />
    </div>
  );
};

export default CentreSection;
