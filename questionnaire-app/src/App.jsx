


// import React, { useState } from 'react';
// import Consent from './components/Consent';
// import Questionnaire from './components/Questionnaire';
// import ThankYou from './components/ThankYou';
// import './App.css';

// function App() {
//   const [appState, setAppState] = useState('consent');
//   // NEW: State to store the session ID received from the backend
//   const [sessionId, setSessionId] = useState(null);

//   const handleConsent = async () => {
//     try {
//       // Call the new backend endpoint to start a session
//       const response = await fetch('http://localhost:3001/api/session/start', {
//         method: 'POST',
//       });
//       const data = await response.json();

//       if (data.success && data.sessionId) {
//         console.log(`Frontend received new session ID: ${data.sessionId}`);
//         setSessionId(data.sessionId); // Store the session ID
//         setAppState('questionnaire'); // Move to the questionnaire
//       } else {
//         alert('Could not start a session. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error starting session:', error);
//       alert('Could not connect to the server to start a session.');
//     }
//   };

//   const handleSubmit = async (formData) => {
//     if (!sessionId) {
//       alert('Session ID is missing. Cannot submit form.');
//       return;
//     }
    
//     console.log(`--- Submitting data for session ${sessionId} ---`);

//     try {
//       // Send both the sessionId and the formData to the backend
//       const response = await fetch('http://localhost:3001/api/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sessionId, formData }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setAppState('submitted');
//       } else {
//         alert('There was an error submitting your form. Please try again.');
//       }
//     } catch (error) {
//       alert('Could not connect to the server to submit the form.');
//     }
//   };

//   return (
//     <div className="app-container">
//       {appState === 'consent' && <Consent onAccept={handleConsent} />}
//       {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} />}
//       {appState === 'submitted' && <ThankYou />}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import Consent from './components/Consent';
import Questionnaire from './components/Questionnaire';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  const [appState, setAppState] = useState('consent');
  const [sessionId, setSessionId] = useState(null);
  // NEW: State to track the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsent = async () => {
    // ... (This function remains unchanged)
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
    if (!sessionId) {
      alert('Session ID is missing. Cannot submit form.');
      return;
    }
    
    // NEW: Set loading state to true right before the API call
    setIsSubmitting(true);
    console.log(`--- Submitting data for session ${sessionId} ---`);

    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, formData }),
      });
      const result = await response.json();
      if (result.success) {
        setAppState('submitted');
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      alert('Could not connect to the server to submit the form.');
    } finally {
      // NEW: Set loading state to false after the API call is finished (whether it succeeds or fails)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {appState === 'consent' && <Consent onAccept={handleConsent} />}
      {/* NEW: Pass the isSubmitting state down to the Questionnaire component */}
      {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      {appState === 'submitted' && <ThankYou />}
    </div>
  );
}

export default App;

