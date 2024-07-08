import React from "react";
import "../styles/CentreSection.css";
import Summary from "./Summary";
import Sort from "./Sort";
import DayEnquiry from "./DayEnquiry";

const CentreSection = ({ children }) => {
  return <div className="CentreSection">{children}</div>;
};

export default CentreSection;
