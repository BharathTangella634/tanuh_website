


// import React, { useState } from 'react';
// import Consent from './components/Consent';
// import Questionnaire from './components/Questionnaire';
// import ThankYou from './components/ThankYou';
// import './App.css';
// // Import the questionnaire data here as well
// import questionnaireData from './assets/questionnaire.json' with { type: 'json' };

// function App() {
//   const [appState, setAppState] = useState('consent');
//   const [sessionId, setSessionId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [riskResult, setRiskResult] = useState(null);
//   const [finalFormData, setFinalFormData] = useState(null);

//   // THIS FUNCTION IS NOW RESTORED
//   const handleConsent = async () => {
//     try {
//       const response = await fetch('api/session/start', {
//         method: 'POST',
//       });
//       const data = await response.json();

//       if (data.success && data.sessionId) {
//         console.log(`Frontend received new session ID: ${data.sessionId}`);
//         setSessionId(data.sessionId);
//         setAppState('questionnaire');
//       } else {
//         alert('Could not start a session. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error starting session:', error);
//       alert('Could not connect to the server to start a session.');
//     }
//   };

//   const handleSubmit = async (formData) => {
//     if (!sessionId) return alert('Session ID is missing. Cannot submit form.');
    
//     setIsSubmitting(true);
//     setFinalFormData(formData); 

//     try {
//       const response = await fetch('api/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ sessionId, formData }),
//       });
//       const result = await response.json();

//       if (result.success) {
//         setRiskResult(result.riskPercentage);
//         setAppState('submitted');
//       } else {
//         alert('There was an error submitting your form. Please try again.');
//         setFinalFormData(null);
//       }
//     } catch (error) {
//       alert('Could not connect to the server to submit the form.');
//       setFinalFormData(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       {appState === 'consent' && <Consent onAccept={handleConsent} />}
//       {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
//       {appState === 'submitted' && (
//         <ThankYou 
//           riskResult={riskResult} 
//           formData={finalFormData}
//           questionnaireData={questionnaireData}
//         />
//       )}
//     </div>
//   );
// }

// export default App;


// ✅ Final version of App.jsx to correctly handle API URLs inside Docker
// and fix the "Unexpected token '<'" JSON error.

import React, { useState } from 'react';
import Consent from './components/Consent';
import Questionnaire from './components/Questionnaire';
import ThankYou from './components/ThankYou';
import './App.css';
import questionnaireData from './assets/questionnaire.json' with { type: 'json' };

function App() {
  const [appState, setAppState] = useState('consent');
  const [sessionId, setSessionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [riskResult, setRiskResult] = useState(null);
  const [finalFormData, setFinalFormData] = useState(null);

  // ✅ Use environment variable or fallback to relative URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // ✅ Helper: wrap fetch to ensure 404s and HTML responses are caught early
  const safeFetch = async (url, options) => {
    const res = await fetch(url, options);
    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error(`❌ Invalid JSON from ${url}:`, text.slice(0, 200));
      throw new Error('Invalid JSON received from backend.');
    }
  };

  const handleConsent = async () => {
    try {
      const data = await safeFetch(`${API_URL}/api/session/start`, { method: 'POST' });

      if (data.success && data.sessionId) {
        console.log(`✅ Session started: ${data.sessionId}`);
        setSessionId(data.sessionId);
        setAppState('questionnaire');
      } else {
        alert('⚠️ Could not start a session. Please try again.');
      }
    } catch (error) {
      console.error('Error starting session:', error);
      alert('❌ Could not connect to the backend API. Check Docker network setup.');
    }
  };

  const handleSubmit = async (formData) => {
    if (!sessionId) return alert('⚠️ Session ID missing. Cannot submit form.');

    setIsSubmitting(true);
    setFinalFormData(formData);

    try {
      const result = await safeFetch(`${API_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, formData }),
      });

      if (result.success) {
        setRiskResult(result.riskPercentage);
        setAppState('submitted');
      } else {
        alert('⚠️ Error submitting form. Please try again.');
        setFinalFormData(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Could not connect to backend to submit form.');
      setFinalFormData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {appState === 'consent' && <Consent onAccept={handleConsent} />}
      {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      {appState === 'submitted' && (
        <ThankYou
          riskResult={riskResult}
          formData={finalFormData}
          questionnaireData={questionnaireData}
        />
      )}
    </div>
  );
}

export default App;
