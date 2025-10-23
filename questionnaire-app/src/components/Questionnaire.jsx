



// import React, { useState } from 'react';
// import './Questionnaire.css';
// import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// // THE FIX IS HERE: The "export" keyword has been added back.
// export const formStructure = [
//   {
//     title: "Section 1: General Information",
//     questions: [
//       { key: "Q1", type: "number", placeholder: "e.g., 35", required: true },
//       { key: "Q2", type: "number", name: "height_cm", placeholder: "e.g., 165", required: true },
//       { key: "Q3", type: "number", name: "weight_kg", placeholder: "e.g., 60", required: true },
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
//         { key: "Q27", type: "radio", condition: {key: "Q27", value: "Yes"}, videoUrlOnNo: "https://www.youtube.com/embed/XKtTymNkcj0?autoplay=1&rel=0", subQuestions: [
//             { key: "Q28", type: "radio" },
//             { key: "Q29", type: "radio" },
//         ]},
//         { key: "Q30", type: "radio", condition: {key: "Q30", value: "Yes"}, subQuestions: [
//             { key: "Q31", type: "radio" },
//             { key: "Q32", type: "radio" },
//             { key: "Q33", type: "radio" },
//         ]},
//         { key: "Q34", type: "radio", condition: {key: "Q34", value: "Yes"}, subQuestions: [
//             { key: "Q35", type: "radio" },
//         ]},
//         { key: "Q36", type: "radio", condition: {key: "Q36", value: "Yes"}, subQuestions: [
//             { key: "Q37", type: "checkbox" },
//         ]},
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

// function Questionnaire({ onSubmit, isSubmitting }) {
//   const [formData, setFormData] = useState({});
//   const [validationErrors, setValidationErrors] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
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
//             if (q.subQuestions && q.condition && formData[q.condition.key] === q.condition.value) {
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
//         const errorElement = document.getElementsByName(firstErrorKey)[0];
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
//           {subQConfig.subQuestions && (
//             <div className={`sub-question-container ${formData[subQConfig.condition.key] === subQConfig.condition.value ? 'visible' : ''}`}>
//               {renderSubQuestions(subQConfig.subQuestions, `${parentNumber}${String.fromCharCode(97 + index)}`)}
//             </div>
//           )}
//         </React.Fragment>
//       );
//     });
//   };

//   let questionCounter = 0;

//   return (
//     <form className="questionnaire-container" onSubmit={handleSubmit} noValidate>
//       <div className="form-header">
//         <h1>Breast Cancer Risk Questionnaire</h1>
//         <p style={{ color: "#533b42ff", fontSize: "18px", marginTop: "8px" }}>Please answer the following questions to the best of your ability.</p>
//         {/* <p>Fields marked with * are mandatory and must be filled out before submitting the form.</p> */}
//         <p style={{ color: "#533b42ff", fontSize: "15px", marginTop: "8px" }}>
//           Fields marked with <span style={{ color: "#d93025", fontWeight: 600 }}>*</span> are mandatory.
//         </p>
//       </div>
//       {formStructure.map((section, index) => (
//         <div key={index} className="form-section">
//           <h2>{section.title}</h2>
//           {section.questions.map((qConfig) => {
//             const data = questionnaireData[qConfig.key];
//             if (!data) return null;
//             questionCounter++;
//             const displayNumber = `${questionCounter}.`;
//             const name = qConfig.name || qConfig.key;
//             const isQ27No = qConfig.key === "Q27" && formData[name] === "No";
//             return (
//               <React.Fragment key={name}>
//                 <div className={`question-block ${validationErrors.includes(name) ? 'error' : ''}`}>
//                   <label>
//                       {displayNumber} {data.question}
//                       {qConfig.required && <span className="required-asterisk">*</span>}
//                   </label>
//                   {renderInput(qConfig)}
//                 </div>
//                 {qConfig.subQuestions && (
//                   <div className={`sub-question-container ${formData[name] === 'Yes' ? 'visible' : ''}`}>
//                     {renderSubQuestions(qConfig.subQuestions, questionCounter)}
//                   </div>
//                 )}
//                 {isQ27No && qConfig.videoUrlOnNo && (
//                     <div className="youtube-player-container">
//                         <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//                     </div>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       ))}
//       <div className="submit-button-container">
//         {isSubmitting ? (
//           <button type="button" className="submit-button loading" disabled>
//             <span className="loading-dots">
//               <span></span><span></span><span></span>
//             </span>
//             Submitting...
//           </button>
//         ) : (
//           <button type="submit" className="submit-button">
//             Submit Questionnaire
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// export default Questionnaire;



// last but one


// import React, { useState, useEffect } from 'react'; // Added useEffect
// import './Questionnaire.css';
// import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// // Your formStructure - UNCHANGED
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
//         { key: "Q27", type: "radio", condition: {key: "Q27", value: "Yes"}, videoUrlOnNo: "https://www.youtube.com/embed/wI71TXaoMp8?autoplay=1&rel=0&start=0", subQuestions: [
//             { key: "Q28", type: "radio" },
//             { key: "Q29", type: "radio" },
//         ]},
//         { key: "Q30", type: "radio", condition: {key: "Q30", value: "Yes"}, subQuestions: [
//             { key: "Q31", type: "radio" }, // Fixed type
//             { key: "Q32", type: "radio" },
//             { key: "Q33", type: "radio" },
//         ]},
//         { key: "Q34", type: "radio", condition: {key: "Q34", value: "Yes"}, subQuestions: [
//             { key: "Q35", type: "radio" },
//         ]},
//         { key: "Q36", type: "radio", condition: {key: "Q36", value: "Yes"}, subQuestions: [
//             { key: "Q37", type: "checkbox" },
//         ]},
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

// function Questionnaire({ onSubmit, isSubmitting }) {
//   const [formData, setFormData] = useState({});
//   const [validationErrors, setValidationErrors] = useState([]);
//   // NEW: State for progress percentage
//   const [progress, setProgress] = useState(0);

//   // --- NEW: Accurate Progress Calculation Logic ---
//   const getVisibleQuestionKeys = (currentFormData) => {
//     const visibleKeys = new Set();
//     const traverse = (questions) => {
//         questions.forEach(q => {
//             const qKey = q.name || q.key;
//             visibleKeys.add(qKey); // Add the main question key

//             // Include the 'other specify' text input key if applicable
//             if (q.otherOptionId) {
//                 // Determine if the 'Other' checkbox itself is visible and checked
//                 // For simplicity, we'll count the text box if the parent Q is visible
//                  visibleKeys.add(q.otherOptionId);
//             }

//             // If it has subquestions and the condition is met, traverse them
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
//           // Check if the key exists in formData and has a meaningful value
//           if (value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) {
//               answeredCount++;
//           }
//       });
//       return answeredCount;
//   };

//   // NEW: Effect to update progress when formData changes
//   useEffect(() => {
//       const visibleKeysSet = getVisibleQuestionKeys(formData);
//       const answeredCount = countAnsweredVisibleQuestions(formData, visibleKeysSet);
//       const totalVisible = visibleKeysSet.size;
//       const newProgress = totalVisible > 0 ? Math.round((answeredCount / totalVisible) * 100) : 0;
//       setProgress(Math.min(newProgress, 100)); // Cap at 100%
//   }, [formData]);


//   // --- handleChange function - UNCHANGED ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//         const currentValues = formData[name] || [];
//         const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
//         setFormData(prev => ({ ...prev, [name]: newValues }));
//     } else {
//         setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // --- getVisibleRequiredQuestions function - UNCHANGED ---
//   const getVisibleRequiredQuestions = () => {
//     let visibleRequired = [];
//     const traverseQuestions = (questions) => {
//         for (const q of questions) {
//             if (q.required) {
//                 visibleRequired.push(q.name || q.key);
//             }
//             // Add required keys from visible subquestions
//              if (q.subQuestions && q.condition && formData[q.condition.key] === q.condition.value) {
//                 traverseQuestions(q.subQuestions);
//             }
//         }
//     };
//     formStructure.forEach(section => traverseQuestions(section.questions));
//     return visibleRequired;
//   };
  
//   // --- handleSubmit function - UNCHANGED ---
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

//   // --- renderInput function - UNCHANGED ---
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

//   // --- renderSubQuestions function - UNCHANGED ---
//   const renderSubQuestions = (subQuestions, parentNumber) => {
//     return subQuestions.map((subQConfig, index) => {
//       const subQData = questionnaireData[subQConfig.key];
//       if (!subQData) return null;
//       const subQName = subQConfig.name || subQConfig.key;
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
//           {subQConfig.subQuestions && (
//             <div className={`sub-question-container ${formData[subQConfig.condition.key] === subQConfig.condition.value ? 'visible' : ''}`}>
//               {renderSubQuestions(subQConfig.subQuestions, `${parentNumber}${String.fromCharCode(97 + index)}`)}
//             </div>
//           )}
//         </React.Fragment>
//       );
//     });
//   };

//   let questionCounter = 0;

//   // --- Main return JSX - ONLY addition is the Progress Bar div ---
//   return (
//     <>
//       {/* --- PROGRESS BAR --- */}
//       <div className="progress-bar-container">
//         <div className="progress-bar-label">Progress: {progress}%</div>
//         <div className="progress-bar-track">
//           <div 
//             className="progress-bar-fill" 
//             style={{ width: `${progress}%` }} 
//           ></div>
//         </div>
//       </div>

//       {/* --- YOUR EXISTING FORM STRUCTURE --- */}
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
//               return (
//                 <React.Fragment key={name}>
//                   <div className={`question-block ${validationErrors.includes(name) ? 'error' : ''}`}>
//                     <label>
//                         {displayNumber} {data.question}
//                         {qConfig.required && <span className="required-asterisk">*</span>}
//                     </label>
//                     {renderInput(qConfig)}
//                   </div>
//                   {qConfig.subQuestions && (
//                     <div className={`sub-question-container ${formData[name] === 'Yes' ? 'visible' : ''}`}>
//                       {renderSubQuestions(qConfig.subQuestions, questionCounter)}
//                     </div>
//                   )}
//                   {isQ27No && qConfig.videoUrlOnNo && (
//                       <div className="youtube-player-container">
//                           <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//                       </div>
//                   )}
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



import React, { useState, useEffect } from 'react'; // Added useEffect
import './Questionnaire.css';
import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// Your formStructure - ONLY Q36 moved into Q27's subQuestions
export const formStructure = [
  {
    title: "Section 1: General Information",
    questions: [
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
        // --- Q36 REMOVED FROM HERE ---
        // { 
        //   key: "Q36", // After BE, advised follow-up? (Now sub-question of Q27)
        //   type: "radio", 
        //   condition: {key: "Q36", value: "Yes"}, 
        //   subQuestions: [
        //     { key: "Q37", type: "checkbox" }, // If Yes, specify follow-up
        //   ]
        // }, 
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

// --- The rest of the component remains exactly the same ---

function Questionnaire({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [progress, setProgress] = useState(0);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        const currentValues = formData[name] || [];
        const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
        setFormData(prev => ({ ...prev, [name]: newValues }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors([]);

    const visibleRequiredKeys = getVisibleRequiredQuestions();
    const missingFields = visibleRequiredKeys.filter(key => {
        const value = formData[key];
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

    onSubmit(formData);
  };

  const renderInput = (qConfig) => {
    const data = questionnaireData[qConfig.key];
    if (!data) return <p>Error: Question {qConfig.key} not found in JSON.</p>;
    const name = qConfig.name || qConfig.key;
    if (data.answers.length === 0) {
      return <input type={qConfig.type || 'text'} name={name} placeholder={qConfig.placeholder || ''} onChange={handleChange} className="text-input" />;
    }
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

  const renderSubQuestions = (subQuestions, parentNumber) => {
    return subQuestions.map((subQConfig, index) => {
      const subQData = questionnaireData[subQConfig.key];
      if (!subQData) return null;
      const subQName = subQConfig.name || subQConfig.key;
      // Use parentNumber to determine the sub-question display number (e.g., 15a, 15b, 15c)
      const displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}.`; 
      return (
        <React.Fragment key={subQName}>
          <div className={`question-block ${validationErrors.includes(subQName) ? 'error' : ''}`}>
            <label>
                {displayNumber} {subQData.question}
                {subQConfig.required && <span className="required-asterisk">*</span>}
            </label>
            {renderInput(subQConfig)}
          </div>
          {/* Recursively render nested sub-questions if needed */}
          {subQConfig.subQuestions && (
            // Ensure nested sub-question visibility depends on ITS parent (e.g., Q36 visibility depends on Q36 answer)
            <div className={`sub-question-container ${formData[subQName] === subQConfig.condition.value ? 'visible' : ''}`}>
              {renderSubQuestions(subQConfig.subQuestions, displayNumber.slice(0,-1))} {/* Pass only the number part for nesting */}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  let questionCounter = 0;

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
              // Check the condition for showing sub-questions based on formData
              const showSubquestions = qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value;

              return (
                <React.Fragment key={name}>
                  <div className={`question-block ${validationErrors.includes(name) ? 'error' : ''}`}>
                    <label>
                        {displayNumber} {data.question}
                        {qConfig.required && <span className="required-asterisk">*</span>}
                    </label>
                    {renderInput(qConfig)}
                  </div>
                  {/* Render sub-questions container only if condition is met */}
                  {qConfig.subQuestions && (
                    <div className={`sub-question-container ${showSubquestions ? 'visible' : ''}`}>
                      {renderSubQuestions(qConfig.subQuestions, questionCounter)}
                    </div>
                  )}
                  {/* Video rendering logic remains the same */}
                  {isQ27No && qConfig.videoUrlOnNo && (
                      <div className="youtube-player-container">
                          <iframe width="560" height="315" src={qConfig.videoUrlOnNo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
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