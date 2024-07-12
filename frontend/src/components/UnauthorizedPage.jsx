import React from 'react';
import { FaLock } from 'react-icons/fa';
import '../styles/UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <FaLock className="unauthorized-icon" />
      <h1>401 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default UnauthorizedPage;
