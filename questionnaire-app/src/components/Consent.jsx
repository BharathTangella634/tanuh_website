// // src/components/Consent.jsx
// import React, { useState } from 'react';
// import './Consent.css';

// function Consent({ onAccept }) {
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <div className="consent-container">
//       <h2>Consent</h2>
//       <p>By participating in this survey, you agree to provide your information for the purpose of this research. Your participation is completely voluntary.</p>

//       <h3>Purpose</h3>
//       <p>The information you provide will be used for research to better understand the risk factors for breast cancer in the Indian population. Our goal is to create a model that can help individuals assess their personal risk and empower them to make informed health decisions. The model will calculate a 5-year and lifetime breast cancer risk score for each participant. This study is for research purposes only, and the information will not be used to provide a medical diagnosis or treatment plan.</p>

//       <h3>Security</h3>
//       <p>All data you submit will be stored securely. No personally identifiable information are collected. The data will be de-identified and analyzed in an aggregated format, so it will be impossible to link your responses back to you.</p>
      
//       <h3>Transparency (Data Usage)</h3>
//       <p>The data collected will be used exclusively for academic research related to breast cancer risk factors and assessment. It may be shared with other researchers and collaborators for the same purpose, but it will always be in a de-identified and aggregated format. The results of this study may be published in scientific journals or presented at conferences.</p>

//       <div className="consent-checkbox">
//         <input
//           type="checkbox"
//           id="consent-check"
//           checked={isChecked}
//           onChange={() => setIsChecked(!isChecked)}
//         />
//         <label htmlFor="consent-check">I agree to the above consent statement</label>
//       </div>

//       <button onClick={onAccept} disabled={!isChecked}>
//         Accept & Continue
//       </button>
//     </div>
//   );
// }

// export default Consent;


import React, { useState } from 'react';
import './Consent.css';

function Consent({ onAccept }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="consent-container">

      <img src="/tanuh.png" alt="TANUH Logo" className="logo tanuh-logo" />
      <img src="/IISc_logo.png" alt="IISC Logo" className="logo iisc-logo" />

      <h2>E-Consent</h2>

      <div className="consent-header">
        <p><strong>Study Title:</strong> Development of a Breast Cancer Screening Tool for the Indian Population</p>
        <p><strong>Sponsor/Institution:</strong> TANUH Foundation</p>
        <p><strong>Program Manager:</strong> Dr. Ashwin RaajKumar (ashwin.mecon@gmail.com)</p>
        <p><strong>IEC Approval No.:</strong> [IEC protocol number and date]</p>
      </div>

      <div className="consent-section">
        <h3>1) Invitation & Voluntary Participation</h3>
        <p>You are invited to take part in a research study about breast cancer risk factors in the Indian population. Participation is entirely voluntary. You may decline to participate without any penalty or loss of benefits.</p>
        <p className="sub-point"><strong>Eligibility:</strong> You must be 18 years or older. If you are under 18, please do not proceed.</p>
      </div>

      <div className="consent-section">
        <h3>2) Purpose of the Study</h3>
        <p>We will analyze survey responses to understand breast cancer risk factors in India and to develop a research-only model that estimates 5-year and lifetime risk. This tool is under development, not for clinical use, and does not provide a medical diagnosis or treatment.</p>
      </div>
      
      <div className="consent-section">
        <h3>3) What You Will Do</h3>
        <p>Complete a one-time questionnaire on demographic and health-related factors. The estimated time is approximately 5-7 minutes. You may skip any question you are uncomfortable answering.</p>
      </div>

      <div className="consent-section">
        <h3>4) Risks & Discomforts</h3>
        <p>The risks are minimal and may include discomfort with personal questions. There is a small risk of a data breach, for which we apply the safeguards described in the "Data & Privacy" section below.</p>
      </div>

      <div className="consent-section">
        <h3>5) Benefits</h3>
        <p>There may be no direct benefit to you. The findings may improve the understanding of breast cancer risk factors in India and guide future research tools.</p>
      </div>
      
      <div className="important-notice">
        <h3>6) Important: Research-Only; Not Medical Advice</h3>
        <p>Any score or output from this tool is experimental and for research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. This tool is not approved by CDSCO and is not a certified Software as a Medical Device (SaMD). For any health concerns, please consult a qualified physician.</p>
      </div>

      <div className="consent-section">
        <h3>7) Data & Privacy (Anonymous Survey)</h3>
        <p>We do not collect any personal identifiers (e.g., name, phone, email, precise address, national ID). Responses are recorded without any link to your identity. Because submissions are anonymous, once you submit your responses, they cannot be withdrawn or deleted, as we cannot identify which responses are yours.</p>
        <p className="sub-point"><strong>Technical logs:</strong> We configure systems to avoid storing IP addresses or device identifiers beyond transient processing. If minimal infrastructure logs are generated for security or performance, they are not linked to your responses and are deleted per institutional policy.</p>
        <p className="sub-point"><strong>Security:</strong> Data are stored on secure, access-controlled systems with reasonable technical and organizational measures, such as encryption and role-based access controls.</p>
      </div>

      <div className="consent-section">
        <h3>8) Data Use, Sharing & Retention</h3>
        <p className="sub-point"><strong>Purpose limitation:</strong> Data will be used exclusively for academic research on breast cancer risk factors and model development/validation.</p>
        <p className="sub-point"><strong>Sharing:</strong> Only de-identified or aggregated datasets may be shared with research collaborators and academic partners for the same purpose. Publications will report aggregate results that do not identify individuals.</p>
        <p className="sub-point"><strong>Retention:</strong> Anonymous datasets may be retained as per institutional/IEC policy for reproducibility and audit.</p>
      </div>

      <div className="consent-section">
        <h3>9) Costs & Compensation</h3>
        <p>There is no cost to you for participating, and you will not be paid. No compensation is available for injury, as this is a minimal-risk, survey-only study.</p>
      </div>

      <div className="consent-checkbox">
        <input
          type="checkbox"
          id="consent-check"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="consent-check">I have read the above information and voluntarily agree to participate in this study.</label>
      </div>

      <button onClick={onAccept} disabled={!isChecked}>
        Accept & Continue
      </button>
    </div>
  );
}

export default Consent;