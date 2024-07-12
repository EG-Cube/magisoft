import React from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "../styles/RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <Calendar />
    </div>
  );
};

export default RightSide;
