// src/components/ThankYou.jsx
// import React from 'react';
// import './ThankYou.css';

// function ThankYou() {
//   return (
//     <div className="thank-you-overlay">
//       <div className="thank-you-dialog">
//         <button className="close-button">&times;</button>
//         <h3>This page says</h3>
//         <p>Thank you for completing the questionnaire!</p>
//         <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
//       </div>
//     </div>
//   );
// }

// export default ThankYou;


import React from 'react';
import './ThankYou.css';

// NEW: The component now accepts `riskResult` as a prop
function ThankYou({ riskResult }) {
  return (
    <div className="thank-you-overlay">
      <div className="thank-you-dialog">
        <button className="close-button" onClick={() => window.location.reload()}>&times;</button>
        <h3>Submission Complete</h3>
        <p>Thank you for completing the questionnaire!</p>
        
        {/* NEW: Conditionally render the risk result section if the value exists */}
        {riskResult !== null && (
          <div className="risk-result-container">
            <p>Your estimated lifetime risk of breast cancer is:</p>
            <h2 className="risk-percentage">{riskResult}%</h2>
          </div>
        )}

        <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
      </div>
    </div>
  );
}

export default ThankYou;