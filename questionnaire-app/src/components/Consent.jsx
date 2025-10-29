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
import consentData from '../assets/consent_form.json' with { type: 'json' };

function Consent({ onAccept }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="consent-container">

      <img src="/tanuh.png" alt={consentData.logos.tanuhAlt} className="logo tanuh-logo" />
      <img src="/IISc_logo.png" alt={consentData.logos.iiscAlt} className="logo iisc-logo" />

      <h2>{consentData.title}</h2>

      <div className="consent-header">
        <p><strong>Study Title:</strong> {consentData.header.studyTitle}</p>
        <p><strong>Sponsor/Institution:</strong> {consentData.header.sponsor}</p>
        <p><strong>Program Manager:</strong> {consentData.header.programManager}</p>
        <p><strong>IEC Approval No.:</strong> {consentData.header.iecApproval}</p>
      </div>

      {consentData.sections.map((section, idx) => (
        <div key={idx} className={section.className ? section.className : 'consent-section'}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((para, pIdx) => (
            <p key={pIdx} className={para.className || undefined}>
              {para.strong && <strong>{para.strong} </strong>}
              {para.text}
            </p>
          ))}
        </div>
      ))}

      <div className="consent-checkbox">
        <input
          type="checkbox"
          id="consent-check"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="consent-check">{consentData.checkboxLabel}</label>
      </div>

      <button onClick={onAccept} disabled={!isChecked}>
        {consentData.buttonText}
      </button>
    </div>
  );
}

export default Consent;