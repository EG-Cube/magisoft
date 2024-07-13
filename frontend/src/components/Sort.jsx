import React, { useEffect } from "react";
import "../styles/Sort.css";

const Sort = ({ sortCriteria, setSortCriteria }) => {

  return (
    <div className="sort">
      <h2>Sort :</h2>
      <div className="sort1">
        <input
          type="button"
          value="Date"
          onClick={() => {
            console.log(sortCriteria);
            setSortCriteria("Date");
          }}
        />
        <input
          type="button"
          value="Budget"
          onClick={() => {
            console.log(sortCriteria);
            setSortCriteria("Budget");
          }}
        />
        <input
          type="button"
          value="Start Date"
          onClick={() => {
            console.log(sortCriteria);
            setSortCriteria("Start Date");
          }}
        />
        <input
          type="button"
          value="Passengers"
          onClick={() => {
            console.log(sortCriteria);
            setSortCriteria("Passengers");
          }}
        />
      </div>
    </div>
  );
};

export default Sort;
