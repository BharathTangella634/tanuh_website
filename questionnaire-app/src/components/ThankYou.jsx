// src/components/ThankYou.jsx
import React from 'react';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thank-you-overlay">
      <div className="thank-you-dialog">
        <button className="close-button">&times;</button>
        <h3>This page says</h3>
        <p>Thank you for completing the questionnaire!</p>
        <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
      </div>
    </div>
  );
}

export default ThankYou;