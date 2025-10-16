// // src/App.jsx
// import React, { useState } from 'react';
// import Consent from './components/Consent';
// import Questionnaire from './components/Questionnaire';
// import ThankYou from './components/ThankYou';
// import './App.css';

// function App() {
//   const [appState, setAppState] = useState('consent'); // 'consent', 'questionnaire', or 'submitted'

//   const handleConsent = () => {
//     setAppState('questionnaire');
//   };

//   const handleSubmit = (formData) => {
//     console.log("--- FINAL QUESTIONNAIRE DATA ---");
//     // This is the data object you will send to your Node.js backend
//     console.log(JSON.stringify(formData, null, 2));
//     setAppState('submitted');
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
  const [appState, setAppState] = useState('consent'); // 'consent', 'questionnaire', or 'submitted'

  const handleConsent = () => {
    setAppState('questionnaire');
  };

  // This function is now async to handle the API call
  const handleSubmit = async (formData) => {
    console.log("--- Sending this data to the backend: ---");
    console.log(JSON.stringify(formData, null, 2));

    try {
      // The fetch call to your Node.js backend API endpoint
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Success:', result.message);
        setAppState('submitted'); // Show the "Thank You" screen on success
      } else {
        // If the backend returns an error (e.g., database issue)
        console.error('❌ Backend Error:', result.message);
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      // If there's a network error and the backend cannot be reached
      console.error('❌ Network Error:', error);
      alert('Could not connect to the server. Please check your connection and that the backend is running.');
    }
  };

  return (
    <div className="app-container">
      {appState === 'consent' && <Consent onAccept={handleConsent} />}
      {appState === 'questionnaire' && <Questionnaire onSubmit={handleSubmit} />}
      {appState === 'submitted' && <ThankYou />}
    </div>
  );
}

export default App;