


// import React, { useState, useEffect } from 'react'; // Added useEffect
// import './Questionnaire.css';
// import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// // Your formStructure - ONLY Q36 moved into Q27's subQuestions
// export const formStructure = [
//   {
//     title: "Section 1: General Information",
//     questions: [
//       { key: "Q1", type: "number", placeholder: "e.g., 35", required: true },
//       { key: "Q2", type: "number", placeholder: "e.g., 165", required: true },
//       { key: "Q3", type: "number", placeholder: "e.g., 60", required: true },
//       { key: "Q4", type: "select", required: true },
//       { key: "Q5", type: "radio", required: true },
//       { key: "Q6", type: "radio", required: true },
//       { key: "Q7", type: "radio", required: true },
//       { key: "Q8", type: "radio", required: true },
//       { key: "Q9", type: "radio", required: true, condition: { key: "Q9", value: "Yes" }, subQuestions: [
//           { key: "Q10", type: "number", placeholder: "Please enter a number - years", required: true },
//           { key: "Q11", type: "radio", required: true },
//           { key: "Q12", type: "radio", required: true }
//       ]},
//       { key: "Q13", type: "radio" }, // Not required
//       { key: "Q14", type: "radio", required: true, condition: { key: "Q14", value: "Yes" }, subQuestions: [
//           { key: "Q15", type: "number", placeholder: "Please enter a number", required: true },
//           { key: "Q16", type: "radio", required: true },
//           { key: "Q17", type: "radio", required: true }
//       ]},
//       { key: "Q18", type: "radio", required: true },
//       { key: "Q19", type: "radio", required: true },
//       { key: "Q20", type: "radio", condition: { key: "Q20", value: "Yes" }, subQuestions: [
//           { key: "Q21", type: "radio", required: true },
//           { key: "Q22", type: "number", placeholder: "e.g., 45", required: true },
//           { key: "Q23", type: "checkbox", required: true },
//           { key: "Q24", type: "radio", condition: { key: "Q24", value: "No" }, subQuestions: [
//               { key: "Q25", type: "number", placeholder: "Enter age of death" } // Not required
//           ]},
//           { key: "Q26", type: "select", required: true }
//       ]},
//     ]
//   },
//   {
//     title: "Section 2: Breast Examination (BE)",
//     questions: [
//         { 
//           key: "Q27", // Have you ever undergone BE?
//           type: "radio", 
//           condition: {key: "Q27", value: "Yes"}, // Condition for sub-questions
//           videoUrlOnNo: "https://www.youtube.com/embed/wI71TXaoMp8?autoplay=1&rel=0&start=0", 
//           subQuestions: [ // Sub-questions for "Yes"
//             { key: "Q28", type: "radio" }, // When was last BE?
//             { key: "Q29", type: "radio" }, // What was result?
//              // --- Q36 MOVED HERE as a sub-question ---
//             { 
//               key: "Q36", // After BE, advised follow-up?
//               type: "radio", 
//               condition: {key: "Q36", value: "Yes"}, // Condition for ITS sub-question (Q37)
//               subQuestions: [
//                 { key: "Q37", type: "checkbox" }, // If Yes, specify follow-up
//               ]
//             },
//           ]
//         },
//         { 
//           key: "Q30", // During BE, lump detected?
//           type: "radio", 
//           condition: {key: "Q30", value: "Yes"}, 
//           subQuestions: [
//             { key: "Q31", type: "radio" }, // Location
//             { key: "Q32", type: "radio" }, // Size
//             { key: "Q33", type: "radio" }, // Consistency
//           ]
//         },
//         { 
//           key: "Q34", // Pain during exam?
//           type: "radio", 
//           condition: {key: "Q34", value: "Yes"}, 
//           subQuestions: [
//             { key: "Q35", type: "radio" }, // Localized or generalized?
//           ]
//         },
//         // --- Q36 REMOVED FROM HERE ---
//         // { 
//         //   key: "Q36", // After BE, advised follow-up? (Now sub-question of Q27)
//         //   type: "radio", 
//         //   condition: {key: "Q36", value: "Yes"}, 
//         //   subQuestions: [
//         //     { key: "Q37", type: "checkbox" }, // If Yes, specify follow-up
//         //   ]
//         // }, 
//     ]
//   },
//   {
//     title: "Section 3: Beyond BE",
//     questions: [
//         { key: "Q38", type: "radio", condition: {key: "Q38", value: "Yes"}, subQuestions: [
//             { key: "Q39", type: "radio", required: true }
//         ]},
//         { key: "Q40", type: "radio", required: true, condition: {key: "Q40", value: "Yes"}, subQuestions: [
//             { key: "Q41", type: "radio" },
//         ]},
//         { key: "Q42", type: "radio", required: true, condition: {key: "Q42", value: "Yes"}, subQuestions: [
//             { key: "Q43", type: "checkbox-plus-text", otherOptionId: "q43_other_specify", otherPlaceholder: "Specify other cancer", required: true },
//         ]},
//     ]
//   }
// ];

// // --- The rest of the component remains exactly the same ---

// function Questionnaire({ onSubmit, isSubmitting }) {
//   const [formData, setFormData] = useState({});
//   const [validationErrors, setValidationErrors] = useState([]);
//   const [progress, setProgress] = useState(0);

//   const [showQ27VideoPrompt, setShowQ27VideoPrompt] = useState(false); 
//   const [q27VideoConfirmed, setQ27VideoConfirmed] = useState(false);

//   const getVisibleQuestionKeys = (currentFormData) => {
//     const visibleKeys = new Set();
//     const traverse = (questions) => {
//         questions.forEach(q => {
//             const qKey = q.name || q.key;
//             visibleKeys.add(qKey); 
//             if (q.otherOptionId) {
//                  visibleKeys.add(q.otherOptionId);
//             }
//             if (q.subQuestions && q.condition && currentFormData[q.condition.key] === q.condition.value) {
//                 traverse(q.subQuestions);
//             }
//         });
//     };
//     formStructure.forEach(section => traverse(section.questions));
//     return visibleKeys;
//   };

//   const countAnsweredVisibleQuestions = (currentFormData, visibleKeysSet) => {
//       let answeredCount = 0;
//       visibleKeysSet.forEach(key => {
//           const value = currentFormData[key];
//           if (value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) {
//               answeredCount++;
//           }
//       });
//       return answeredCount;
//   };

//   useEffect(() => {
//       const visibleKeysSet = getVisibleQuestionKeys(formData);
//       const answeredCount = countAnsweredVisibleQuestions(formData, visibleKeysSet);
//       const totalVisible = visibleKeysSet.size;
//       const newProgress = totalVisible > 0 ? Math.round((answeredCount / totalVisible) * 100) : 0;
//       setProgress(Math.min(newProgress, 100)); 
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     // new addition
//     if (name === 'Q27') {
//       if (value === 'No') {
//         setShowQ27VideoPrompt(true); // Show prompt when 'No' is selected
//         setQ27VideoConfirmed(false); // Reset confirmation
//       } else {
//         setShowQ27VideoPrompt(false); // Hide prompt if not 'No'
//         setQ27VideoConfirmed(false); // Reset confirmation
//       }
//     }
//     //end of addition

//     if (type === 'checkbox') {
//         const currentValues = formData[name] || [];
//         const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
//         setFormData(prev => ({ ...prev, [name]: newValues }));
//     } else {
//         setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const getVisibleRequiredQuestions = () => {
//     let visibleRequired = [];
//     const traverseQuestions = (questions) => {
//         for (const q of questions) {
//             if (q.required) {
//                 visibleRequired.push(q.name || q.key);
//             }
//              if (q.subQuestions && q.condition && formData[q.condition.key] === q.condition.value) {
//                 traverseQuestions(q.subQuestions);
//             }
//         }
//     };
//     formStructure.forEach(section => traverseQuestions(section.questions));
//     return visibleRequired;
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValidationErrors([]);

//     const visibleRequiredKeys = getVisibleRequiredQuestions();
//     const missingFields = visibleRequiredKeys.filter(key => {
//         const value = formData[key];
//         return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
//     });

//     if (missingFields.length > 0) {
//         setValidationErrors(missingFields);
//         alert("Please fill out all required fields marked with *.");
//         const firstErrorKey = missingFields[0];
//         const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
//         if (errorElement) {
//             errorElement.closest('.question-block').scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//         return;
//     }

//     onSubmit(formData);
//   };

//   const renderInput = (qConfig) => {
//     const data = questionnaireData[qConfig.key];
//     if (!data) return <p>Error: Question {qConfig.key} not found in JSON.</p>;
//     const name = qConfig.name || qConfig.key;
//     if (data.answers.length === 0) {
//       return <input type={qConfig.type || 'text'} name={name} placeholder={qConfig.placeholder || ''} onChange={handleChange} className="text-input" />;
//     }
//     switch (qConfig.type) {
//       case 'select':
//         return (
//           <select name={name} onChange={handleChange} defaultValue="" className="select-input">
//             <option value="" disabled>Select an option</option>
//             {data.answers.map((ans, i) => <option key={i} value={ans}>{ans}</option>)}
//           </select>
//         );
//       case 'checkbox':
//         return (
//           <div className="checkbox-group vertical">
//             {data.answers.map((ans, i) => (
//               <label key={i}><input type="checkbox" name={name} value={ans} onChange={handleChange} /> {ans}</label>
//             ))}
//           </div>
//         );
//       case 'checkbox-plus-text':
//          return (
//              <div className="checkbox-group vertical">
//                 {data.answers.map((ans, i) => (
//                     <label key={i}><input type="checkbox" name={name} value={ans} onChange={handleChange} /> {ans}</label>
//                 ))}
//                  <input type="text" name={qConfig.otherOptionId} placeholder={qConfig.otherPlaceholder || 'Specify other'} onChange={handleChange} className="text-input" />
//              </div>
//          );
//       case 'radio':
//       default:
//         return (
//           <div className="radio-group vertical">
//             {data.answers.map((ans, i) => (
//               <label key={i}><input type="radio" name={name} value={ans} onChange={handleChange} /> {ans}</label>
//             ))}
//           </div>
//         );
//     }
//   };

//   const renderSubQuestions = (subQuestions, parentNumber) => {
//     return subQuestions.map((subQConfig, index) => {
//       const subQData = questionnaireData[subQConfig.key];
//       if (!subQData) return null;
//       const subQName = subQConfig.name || subQConfig.key;
//       // Use parentNumber to determine the sub-question display number (e.g., 15a, 15b, 15c)
//       const displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}.`; 
//       return (
//         <React.Fragment key={subQName}>
//           <div className={`question-block ${validationErrors.includes(subQName) ? 'error' : ''}`}>
//             <label>
//                 {displayNumber} {subQData.question}
//                 {subQConfig.required && <span className="required-asterisk">*</span>}
//             </label>
//             {renderInput(subQConfig)}
//           </div>
//           {/* Recursively render nested sub-questions if needed */}
//           {subQConfig.subQuestions && (
//             // Ensure nested sub-question visibility depends on ITS parent (e.g., Q36 visibility depends on Q36 answer)
//             <div className={`sub-question-container ${formData[subQName] === subQConfig.condition.value ? 'visible' : ''}`}>
//               {renderSubQuestions(subQConfig.subQuestions, displayNumber.slice(0,-1))} {/* Pass only the number part for nesting */}
//             </div>
//           )}
//         </React.Fragment>
//       );
//     });
//   };

//   let questionCounter = 0;

//   return (
//     <>
//       <div className="progress-bar-container">
//         <div className="progress-bar-label">Progress: {progress}%</div>
//         <div className="progress-bar-track">
//           <div 
//             className="progress-bar-fill" 
//             style={{ width: `${progress}%` }} 
//           ></div>
//         </div>
//       </div>

//       <form className="questionnaire-container" onSubmit={handleSubmit} noValidate>
//         <div className="form-header">
//           <h1>Breast Cancer Risk Questionnaire</h1>
//           <p style={{ color: "#533b42ff", fontSize: "18px", marginTop: "8px" }}>Please answer the following questions to the best of your ability.</p>
//           <p style={{ color: "#533b42ff", fontSize: "15px", marginTop: "8px" }}>
//             Fields marked with <span style={{ color: "#d93025", fontWeight: 600 }}>*</span> are mandatory.
//           </p>
//         </div>
//         {formStructure.map((section, index) => (
//           <div key={index} className="form-section">
//             <h2>{section.title}</h2>
//             {section.questions.map((qConfig) => {
//               const data = questionnaireData[qConfig.key];
//               if (!data) return null;
//               questionCounter++;
//               const displayNumber = `${questionCounter}.`;
//               const name = qConfig.name || qConfig.key;
//               const isQ27No = qConfig.key === "Q27" && formData[name] === "No";
//               // Check the condition for showing sub-questions based on formData
//               const showSubquestions = qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value;

//               return (
//                 <React.Fragment key={name}>
//                   <div className={`question-block ${validationErrors.includes(name) ? 'error' : ''}`}>
//                     <label>
//                         {displayNumber} {data.question}
//                         {qConfig.required && <span className="required-asterisk">*</span>}
//                     </label>
//                     {renderInput(qConfig)}
//                   </div>
//                   {/* Render sub-questions container only if condition is met */}
//                   {qConfig.subQuestions && (
//                     <div className={`sub-question-container ${showSubquestions ? 'visible' : ''}`}>
//                       {renderSubQuestions(qConfig.subQuestions, questionCounter)}
//                     </div>
//                   )}
//                   {/* Video rendering logic remains the same */}

//                   {/* {isQ27No && qConfig.videoUrlOnNo && (
//                       <div className="youtube-player-container">
//                           <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//                       </div>
//                   )} */}

//                   {/* New Addition */}

//                   {qConfig.key === "Q27" && formData['Q27'] === "No" && (
//                     <>
//                       {/* Show Prompt if user hasn't confirmed */}
//                       {!q27VideoConfirmed && showQ27VideoPrompt && (
//                         <div className="video-prompt-container">
//                           <p className="video-prompt-note">
//                             Please follow the instructions in the video to perform self examination. It has to be performed in privacy in a room with a mirror. Click okay when you are ready.
//                           </p>
//                           <button
//                             type="button"
//                             className="video-prompt-button"
//                             onClick={() => setQ27VideoConfirmed(true)} // Set confirmation on click
//                           >
//                             Okay
//                           </button>
//                         </div>
//                       )}

//                       {/* Show Video if user HAS confirmed */}
//                       {q27VideoConfirmed && qConfig.videoUrlOnNo && (
//                         <div className="youtube-player-container">
//                             <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//                         </div>
//                       )}
//                     </>
//                   )}
//                   {/* --- END NEW BLOCK --- */}


//                 </React.Fragment>
//               );
//             })}
//           </div>
//         ))}
//         <div className="submit-button-container">
//           {isSubmitting ? (
//             <button type="button" className="submit-button loading" disabled>
//               <span className="loading-dots">
//                 <span></span><span></span><span></span>
//               </span>
//               Submitting...
//             </button>
//           ) : (
//             <button type="submit" className="submit-button">
//               Submit Questionnaire
//             </button>
//           )}
//         </div>
//       </form>
//     </>
//   );
// }

// export default Questionnaire;


// after adding questions


import React, { useState, useEffect } from 'react'; // Added useEffect
import './Questionnaire.css';
import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// Your formStructure - Removed invalid placeholder reference for Q44
export const formStructure = [
  {
    title: "Section 1: General Information",
    questions: [
      // --- FIX: Removed placeholder that uses state from here ---
      { key: "Q44", type: "text" }, // Placeholder handled in renderInput
      { key: "Q45", type: "text", placeholder: "Universal" },
      // --- END FIX ---
      { key: "Q1", type: "number", placeholder: "e.g., 35", required: true },
      { key: "Q2", type: "number", placeholder: "e.g., 165", required: true },
      { key: "Q3", type: "number", placeholder: "e.g., 60", required: true },
      { key: "Q4", type: "select", required: true },
      { key: "Q5", type: "radio", required: true },
      { key: "Q6", type: "radio", required: true },
      { key: "Q7", type: "radio", required: true },
      { key: "Q8", type: "radio", required: true },
      { key: "Q9", type: "radio", required: true, condition: { key: "Q9", value: "Yes" }, subQuestions: [
          { key: "Q10", type: "number", placeholder: "Please enter a number - years", required: true },
          { key: "Q11", type: "radio", required: true },
          { key: "Q12", type: "radio", required: true }
      ]},
      { key: "Q13", type: "radio" }, // Not required
      { key: "Q14", type: "radio", required: true, condition: { key: "Q14", value: "Yes" }, subQuestions: [
          { key: "Q15", type: "number", placeholder: "Please enter a number", required: true },
          { key: "Q16", type: "radio", required: true },
          { key: "Q17", type: "radio", required: true }
      ]},
      { key: "Q18", type: "radio", required: true },
      { key: "Q19", type: "radio", required: true },
      { key: "Q20", type: "radio", condition: { key: "Q20", value: "Yes" }, subQuestions: [
          { key: "Q21", type: "radio", required: true },
          { key: "Q22", type: "number", placeholder: "e.g., 45", required: true },
          { key: "Q23", type: "checkbox", required: true },
          { key: "Q24", type: "radio", condition: { key: "Q24", value: "No" }, subQuestions: [
              { key: "Q25", type: "number", placeholder: "Enter age of death" } // Not required
          ]},
          { key: "Q26", type: "select", required: true }
      ]},
    ]
  },
  {
    title: "Section 2: Breast Examination (BE)",
    questions: [
        { 
          key: "Q27", // Have you ever undergone BE?
          type: "radio", 
          condition: {key: "Q27", value: "Yes"}, // Condition for sub-questions
          videoUrlOnNo: "https://www.youtube.com/embed/wI71TXaoMp8?autoplay=1&rel=0&start=0", 
          subQuestions: [ // Sub-questions for "Yes"
            { key: "Q28", type: "radio" }, // When was last BE?
            { key: "Q29", type: "radio" }, // What was result?
             // --- Q36 MOVED HERE as a sub-question ---
            { 
              key: "Q36", // After BE, advised follow-up?
              type: "radio", 
              condition: {key: "Q36", value: "Yes"}, // Condition for ITS sub-question (Q37)
              subQuestions: [
                { key: "Q37", type: "checkbox" }, // If Yes, specify follow-up
              ]
            },
          ]
        },
        { 
          key: "Q30", // During BE, lump detected?
          type: "radio", 
          condition: {key: "Q30", value: "Yes"}, 
          subQuestions: [
            { key: "Q31", type: "radio" }, // Location
            { key: "Q32", type: "radio" }, // Size
            { key: "Q33", type: "radio" }, // Consistency
          ]
        },
        { 
          key: "Q34", // Pain during exam?
          type: "radio", 
          condition: {key: "Q34", value: "Yes"}, 
          subQuestions: [
            { key: "Q35", type: "radio" }, // Localized or generalized?
          ]
        },
    ]
  },
  {
    title: "Section 3: Beyond BE",
    questions: [
        { key: "Q38", type: "radio", condition: {key: "Q38", value: "Yes"}, subQuestions: [
            { key: "Q39", type: "radio", required: true }
        ]},
        { key: "Q40", type: "radio", required: true, condition: {key: "Q40", value: "Yes"}, subQuestions: [
            { key: "Q41", type: "radio" },
        ]},
        { key: "Q42", type: "radio", required: true, condition: {key: "Q42", value: "Yes"}, subQuestions: [
            { key: "Q43", type: "checkbox-plus-text", otherOptionId: "q43_other_specify", otherPlaceholder: "Specify other cancer", required: true },
        ]},
    ]
  }
];

// Helper function to generate random string
const generateRandomId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


function Questionnaire({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showQ27VideoPrompt, setShowQ27VideoPrompt] = useState(false); 
  const [q27VideoConfirmed, setQ27VideoConfirmed] = useState(false);
  const [randomPatientId, setRandomPatientId] = useState('');
  

  useEffect(() => {
    // Generate the random ID only once when the component mounts
    setRandomPatientId(generateRandomId());
  }, []); 
  
  // --- Progress calculation useEffect - UNCHANGED ---
  const getVisibleQuestionKeys = (currentFormData) => {
    const visibleKeys = new Set();
    const traverse = (questions) => {
        questions.forEach(q => {
            const qKey = q.name || q.key;
            visibleKeys.add(qKey); 
            if (q.otherOptionId) {
                 visibleKeys.add(q.otherOptionId);
            }
            if (q.subQuestions && q.condition && currentFormData[q.condition.key] === q.condition.value) {
                traverse(q.subQuestions);
            }
        });
    };
    formStructure.forEach(section => traverse(section.questions));
    return visibleKeys;
  };

  const countAnsweredVisibleQuestions = (currentFormData, visibleKeysSet) => {
      let answeredCount = 0;
      visibleKeysSet.forEach(key => {
          const value = currentFormData[key];
          if (value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) {
              answeredCount++;
          }
      });
      return answeredCount;
  };

  useEffect(() => {
      const visibleKeysSet = getVisibleQuestionKeys(formData);
      const answeredCount = countAnsweredVisibleQuestions(formData, visibleKeysSet);
      const totalVisible = visibleKeysSet.size;
      const newProgress = totalVisible > 0 ? Math.round((answeredCount / totalVisible) * 100) : 0;
      setProgress(Math.min(newProgress, 100)); 
  }, [formData]);

  // --- handleChange - UNCHANGED ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'Q27') {
      if (value === 'No') {
        setShowQ27VideoPrompt(true); 
        setQ27VideoConfirmed(false); 
      } else {
        setShowQ27VideoPrompt(false); 
        setQ27VideoConfirmed(false); 
      }
    }
    if (type === 'checkbox') {
        const currentValues = formData[name] || [];
        const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
        setFormData(prev => ({ ...prev, [name]: newValues }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- getVisibleRequiredQuestions - UNCHANGED ---
  const getVisibleRequiredQuestions = () => {
    let visibleRequired = [];
    const traverseQuestions = (questions) => {
        for (const q of questions) {
            if (q.required) {
                visibleRequired.push(q.name || q.key);
            }
             if (q.subQuestions && q.condition && formData[q.condition.key] === q.condition.value) {
                traverseQuestions(q.subQuestions);
            }
        }
    };
    formStructure.forEach(section => traverseQuestions(section.questions));
    return visibleRequired;
  };
  
  // --- handleSubmit (with default value logic) - UNCHANGED ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors([]);

    const dataToSubmit = { ...formData };

    if (!dataToSubmit.Q44) {
        dataToSubmit.Q44 = randomPatientId;
    }
    if (!dataToSubmit.Q45) {
        dataToSubmit.Q45 = "Universal";
    }
    const visibleRequiredKeys = getVisibleRequiredQuestions();
    const missingFields = visibleRequiredKeys.filter(key => {
        const value = dataToSubmit[key];
        return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });

    if (missingFields.length > 0) {
        setValidationErrors(missingFields);
        alert("Please fill out all required fields marked with *.");
        const firstErrorKey = missingFields[0];
        const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
        if (errorElement) {
            errorElement.closest('.question-block').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    onSubmit(dataToSubmit);
  };

  // --- renderInput function - CORRECTED placeholder logic ---
  const renderInput = (qConfig) => { // Removed second argument
    const data = questionnaireData[qConfig.key];
    if (!data) return <p>Error: Question {qConfig.key} not found in JSON.</p>;
    const name = qConfig.name || qConfig.key;

    // Determine the placeholder dynamically INSIDE the function
    let placeholder = qConfig.placeholder || '';
    if (qConfig.key === 'Q44') {
        // Correctly access the state variable 'randomPatientId' here
        placeholder = randomPatientId; 
    }

    if (data.answers.length === 0) {
      // Use the dynamically determined placeholder
      return <input type={qConfig.type || 'text'} name={name} placeholder={placeholder} onChange={handleChange} className="text-input" />;
    }
    // ... rest of renderInput switch statement remains UNCHANGED ...
    switch (qConfig.type) {
       case 'select':
         return (
           <select name={name} onChange={handleChange} defaultValue="" className="select-input">
             <option value="" disabled>Select an option</option>
             {data.answers.map((ans, i) => <option key={i} value={ans}>{ans}</option>)}
           </select>
         );
       case 'checkbox':
         return (
           <div className="checkbox-group vertical">
             {data.answers.map((ans, i) => (
               <label key={i}><input type="checkbox" name={name} value={ans} onChange={handleChange} /> {ans}</label>
             ))}
           </div>
         );
       case 'checkbox-plus-text':
          return (
              <div className="checkbox-group vertical">
                 {data.answers.map((ans, i) => (
                     <label key={i}><input type="checkbox" name={name} value={ans} onChange={handleChange} /> {ans}</label>
                 ))}
                  <input type="text" name={qConfig.otherOptionId} placeholder={qConfig.otherPlaceholder || 'Specify other'} onChange={handleChange} className="text-input" />
              </div>
          );
       case 'radio':
       default:
         return (
           <div className="radio-group vertical">
             {data.answers.map((ans, i) => (
               <label key={i}><input type="radio" name={name} value={ans} onChange={handleChange} /> {ans}</label>
             ))}
           </div>
         );
    }
  };

  // --- renderSubQuestions function - UNCHANGED ---
  const renderSubQuestions = (subQuestions, parentNumber) => {
    return subQuestions.map((subQConfig, index) => {
      const subQData = questionnaireData[subQConfig.key];
      if (!subQData) return null;
      const subQName = subQConfig.name || subQConfig.key;
      const displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}.`; 
      return (
        <React.Fragment key={subQName}>
          <div className={`question-block ${validationErrors.includes(subQName) ? 'error' : ''}`}>
            <label>
                {displayNumber} {subQData.question}
                {subQConfig.required && <span className="required-asterisk">*</span>}
            </label>
            {/* Call renderInput without the second argument here */}
            {renderInput(subQConfig)} 
          </div>
          {subQConfig.subQuestions && (
            <div className={`sub-question-container ${formData[subQName] === subQConfig.condition.value ? 'visible' : ''}`}>
              {renderSubQuestions(subQConfig.subQuestions, displayNumber.slice(0,-1))} 
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  let questionCounter = 0;

  // --- Main return JSX - UNCHANGED ---
  return (
    <>
      <div className="progress-bar-container">

        <div className="progress-bar-label">Progress: {progress}%</div>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }} 
          ></div>
        </div>
      </div>

      <form className="questionnaire-container" onSubmit={handleSubmit} noValidate>


        <img src="/tanuh.png" alt="TANUH Logo" className="logo tanuh-logo" />
        <img src="/IISc_logo.png" alt="IISC Logo" className="logo iisc-logo" />

        <div className="form-header">
          <h1>Breast Cancer Risk Questionnaire</h1>
          <p style={{ color: "#533b42ff", fontSize: "18px", marginTop: "8px" }}>Please answer the following questions to the best of your ability.</p>
          <p style={{ color: "#533b42ff", fontSize: "15px", marginTop: "8px" }}>
            Fields marked with <span style={{ color: "#d93025", fontWeight: 600 }}>*</span> are mandatory.
          </p>
        </div>
        {formStructure.map((section, index) => (
          <div key={index} className="form-section">
            <h2>{section.title}</h2>
            {section.questions.map((qConfig) => {
              const data = questionnaireData[qConfig.key];
              if (!data) return null;
              questionCounter++;
              const displayNumber = `${questionCounter}.`;
              const name = qConfig.name || qConfig.key;
              const isQ27No = qConfig.key === "Q27" && formData[name] === "No";
              const showSubquestions = qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value;

              return (
                <React.Fragment key={name}>
                  <div className={`question-block ${validationErrors.includes(name) ? 'error' : ''}`}>
                    <label>
                        {displayNumber} {data.question}
                        {qConfig.required && <span className="required-asterisk">*</span>}
                    </label>
                    {/* Call renderInput without the second argument here */}
                    {renderInput(qConfig)} 
                  </div>
                  {qConfig.subQuestions && (
                    <div className={`sub-question-container ${showSubquestions ? 'visible' : ''}`}>
                      {renderSubQuestions(qConfig.subQuestions, questionCounter)}
                    </div>
                  )}
                   {qConfig.key === "Q27" && formData['Q27'] === "No" && (
                     <>
                       {!q27VideoConfirmed && showQ27VideoPrompt && (
                         <div className="video-prompt-container">
                           <p className="video-prompt-note">
                             Please follow the instructions in the video to perform self examination. It has to be performed in privacy in a room with a mirror. Click okay when you are ready.
                           </p>
                           <button
                             type="button"
                             className="video-prompt-button"
                             onClick={() => setQ27VideoConfirmed(true)} 
                           >
                             Okay
                           </button>
                         </div>
                       )}
                       {q27VideoConfirmed && qConfig.videoUrlOnNo && (
                         <div className="youtube-player-container">
                             <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                         </div>
                       )}
                     </>
                   )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
        <div className="submit-button-container">
          {isSubmitting ? (
            <button type="button" className="submit-button loading" disabled>
              <span className="loading-dots">
                <span></span><span></span><span></span>
              </span>
              Submitting...
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit Questionnaire
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default Questionnaire;