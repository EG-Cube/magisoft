import React from "react";
import "../../styles/Sort.css";

const Sort = () => {
  return (
    <div className="sort">
      <h2>Sort :</h2>
      <div className="sort1">
        <input type="button" value="Date" />
        <input type="button" value="Budget" />
        <input type="button" value="Package" />
      </div>
    </div>
  );
};

export default Sort;
