


// import React, { useState } from 'react';
// import Consent from './components/Consent';
// import Questionnaire from './components/Questionnaire';
// import ThankYou from './components/ThankYou';
// import './App.css';

// function App() {
//   const [appState, setAppState] = useState('consent');
//   const [sessionId, setSessionId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   // NEW: State to store the calculated risk result from the backend
//   const [riskResult, setRiskResult] = useState(null);

//   const handleConsent = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/session/start', {
//         method: 'POST',
//       });
//       const data = await response.json();
//       if (data.success && data.sessionId) {
//         setSessionId(data.sessionId);
//         setAppState('questionnaire');
//       } else {
//         alert('Could not start a session. Please try again.');
//       }
//     } catch {
//       alert('Could not connect to the server to start a session.');
//     }
//   };

//   const handleSubmit = async (formData) => {
//     if (!sessionId) return alert('Session ID is missing. Cannot submit form.');
    
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:3001/api/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ sessionId, formData }),
//       });
//       const result = await response.json();

//       if (result.success) {
//         // NEW: Store the risk percentage from the backend response
//         setRiskResult(result.riskPercentage);
//         setAppState('submitted');
//       } else {
//         alert('There was an error submitting your form. Please try again.');
//       }
//     } catch {
//       alert('Could not connect to the server to submit the form.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       {appState === 'consent' && <Consent onAccept={handleConsent} />}
//       {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
//       {/* NEW: Pass the riskResult as a prop to the ThankYou component */}
//       {appState === 'submitted' && <ThankYou riskResult={riskResult} />}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import Consent from './components/Consent';
import Questionnaire from './components/Questionnaire';
import ThankYou from './components/ThankYou';
import './App.css';
// Import the questionnaire data here as well
import questionnaireData from './assets/questionnaire.json' with { type: 'json' };

function App() {
  const [appState, setAppState] = useState('consent');
  const [sessionId, setSessionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [riskResult, setRiskResult] = useState(null);
  const [finalFormData, setFinalFormData] = useState(null);

  // THIS FUNCTION IS NOW RESTORED
  const handleConsent = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/session/start', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success && data.sessionId) {
        console.log(`Frontend received new session ID: ${data.sessionId}`);
        setSessionId(data.sessionId);
        setAppState('questionnaire');
      } else {
        alert('Could not start a session. Please try again.');
      }
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Could not connect to the server to start a session.');
    }
  };

  const handleSubmit = async (formData) => {
    if (!sessionId) return alert('Session ID is missing. Cannot submit form.');
    
    setIsSubmitting(true);
    setFinalFormData(formData); 

    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, formData }),
      });
      const result = await response.json();

      if (result.success) {
        setRiskResult(result.riskPercentage);
        setAppState('submitted');
      } else {
        alert('There was an error submitting your form. Please try again.');
        setFinalFormData(null);
      }
    } catch (error) {
      alert('Could not connect to the server to submit the form.');
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