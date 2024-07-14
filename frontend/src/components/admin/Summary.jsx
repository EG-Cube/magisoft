import React from "react";
import "../../styles/Summary.css";
import PieChart from "./PieChart";

const Summary = ({ users }) => {
  const total = users?.length;

  const sales = users?.reduce((acc, user) => {
    if (
      user.roles.find((r) => r === "Sales") &&
      !user.roles.find((r) => r === "Admin")
    ) {
      acc += 1;
    }
    return acc;
  }, 0);

  const operations = users?.reduce((acc, user) => {
    if (
      user.roles.find((r) => r === "Operations") &&
      !user.roles.find((r) => r === "Admin")
    ) {
      acc += 1;
    }
    return acc;
  }, 0);

  const accounting = users?.reduce((acc, user) => {
    if (
      user.roles.find((r) => r === "Accounting") &&
      !user.roles.find((r) => r === "Admin")
    ) {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div className="centre-section1">
      <div className="section1">
        <div className="month-div">
          <h2>Total Users</h2>
          <h1>{total}</h1>
        </div>
        <div className="pen3div">
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Sales</h4>
              <h5 style={{ color: "#652361" }}>{sales}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Operations</h4>
              <h5 style={{ color: "#F3BF39" }}>{operations}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Accounting</h4>
              <h5 style={{ color: "#9E7C9C" }}>{accounting}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="pie">
        <PieChart
          operations={operations}
          sales={sales}
          accounting={accounting}
        />
      </div>
    </div>
  );
};

export default Summary;
