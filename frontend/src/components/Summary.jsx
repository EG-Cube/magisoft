import React from 'react';
import '../styles/Summary.css';
import PieChart from './PieChart';

const Summary = ({ month, total, pending, ongoing, completed }) => {
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
              <h5 style={{ color: '#652361' }}>{pending}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Ongoing</h4>
              <h5 style={{ color: '#F3BF39' }}>{ongoing}</h5>
            </div>
          </div>
          <div className="infodiv">
            <div className="info-div-flex">
              <h4>Completed</h4>
              <h5 style={{ color: '#9E7C9C' }}>{completed}</h5>
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
