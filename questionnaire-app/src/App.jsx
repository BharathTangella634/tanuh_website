// src/App.jsx
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

  const handleSubmit = (formData) => {
    console.log("--- FINAL QUESTIONNAIRE DATA ---");
    // This is the data object you will send to your Node.js backend
    console.log(JSON.stringify(formData, null, 2));
    setAppState('submitted');
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