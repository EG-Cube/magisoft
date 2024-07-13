import React from 'react';
import { FaLock } from 'react-icons/fa';
import '../styles/UnauthorizedPage.css';

const NotFound = () => {
  return (
    <div className="unauthorized-container">
      <FaLock className="unauthorized-icon" />
      <h1>404 - NotFound</h1>
      <p>Page doesn't exist</p>
    </div>
  );
};

export default NotFound;
