


// import React, { useState } from 'react';
// import './Questionnaire.css';
// import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// // This structure defines the layout, sections, and sub-question logic.
// // Placeholders are now included here.
// const formStructure = [
//   {
//     title: "Section 1: General Information",
//     questions: [
//       { key: "Q1", type: "number", placeholder: "e.g., 35" },
//       { key: "Q2", type: "number", name: "height_cm", placeholder: "e.g., 165" },
//       { key: "Q3", type: "number", name: "weight_kg", placeholder: "e.g., 60" },
//       { key: "Q4", type: "select" },
//       { key: "Q5", type: "radio" },
//       { key: "Q6", type: "radio" },
//       { key: "Q7", type: "radio" },
//       { key: "Q8", type: "radio" },
//       { key: "Q9", type: "radio", condition: { key: "Q9", value: "Yes" }, subQuestions: [
//           { key: "Q10", type: "number", placeholder: "Please enter a number - years" },
//           { key: "Q11", type: "radio" },
//           { key: "Q12", type: "radio" }
//       ]},
//       { key: "Q13", type: "radio" },
//       { key: "Q14", type: "radio", condition: { key: "Q14", value: "Yes" }, subQuestions: [
//           { key: "Q15", type: "number", placeholder: "Please enter a number" },
//           { key: "Q16", type: "radio" },
//           { key: "Q17", type: "radio" }
//       ]},
//       { key: "Q18", type: "radio" },
//       { key: "Q19", type: "radio" },
//       { key: "Q20", type: "radio", condition: { key: "Q20", value: "Yes" }, subQuestions: [
//           { key: "Q21", type: "radio" },
//           { key: "Q22", type: "number", placeholder: "e.g., 45" },
//           { key: "Q23", type: "checkbox" },
//           { key: "Q24", type: "radio", condition: { key: "Q24", value: "No" }, subQuestions: [
//               { key: "Q25", type: "number", placeholder: "Enter age of death" }
//           ]},
//           { key: "Q26", type: "text", placeholder: "Enter ethnicity" }
//       ]},
//     ]
//   },
//   {
//     title: "Section 2: Breast Examination (BE)",
//     questions: [
//         { 
//           key: "Q27", 
//           type: "radio", 
//           condition: {key: "Q27", value: "Yes"}, 
//           videoUrlOnNo: "https://www.youtube.com/embed/XKtTymNkcj0?autoplay=1&rel=0", // YouTube video for "No" answer
//           subQuestions: [
//             { key: "Q28", type: "radio" },
//             { key: "Q29", type: "radio" },
//           ]
//         },
//         { key: "Q30", type: "radio", condition: {key: "Q30", value: "Yes"}, subQuestions: [
//             { key: "Q31", type: "checkbox" },
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
//             { key: "Q39", type: "radio" },
//         ]},
//         { key: "Q40", type: "radio", condition: {key: "Q40", value: "Yes"}, subQuestions: [
//             { key: "Q41", type: "radio" },
//         ]},
//         { key: "Q42", type: "radio", condition: {key: "Q42", value: "Yes"}, subQuestions: [
//             { key: "Q43", type: "checkbox-plus-text", otherOptionId: "q43_other_specify", otherPlaceholder: "Specify other cancer" },
//         ]},
//     ]
//   }
// ];

// function Questionnaire({ onSubmit }) {
//   const [formData, setFormData] = useState({});

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const renderInput = (qConfig) => {
//     const data = questionnaireData[qConfig.key];
//     if (!data) return <p>Error: Question {qConfig.key} not found in JSON.</p>;

//     const name = qConfig.name || qConfig.key;

//     // For text/number inputs, now with placeholder from qConfig
//     if (data.answers.length === 0) {
//       return <input type={qConfig.type || 'text'} name={name} placeholder={qConfig.placeholder || ''} onChange={handleChange} className="text-input" />;
//     }
    
//     // For choice-based inputs
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
//           <div className="question-block">
//             <label>{displayNumber} {subQData.question}</label>
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
//     <form className="questionnaire-container" onSubmit={handleSubmit}>
//       <div className="form-header">
//         <h1>Breast Cancer Risk Questionnaire</h1>
//         <p>Please answer the following questions to the best of your ability.</p>
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
            
//             // Check if this is Q27 and "No" is selected
//             const isQ27No = qConfig.key === "Q27" && formData[name] === "No";

//             return (
//               <React.Fragment key={name}>
//                 <div className="question-block">
//                   <label>{displayNumber} {data.question}</label>
//                   {renderInput(qConfig)}
//                 </div>
                
//                 {/* Conditional rendering for Q27 sub-questions (only if "Yes") */}
//                 {qConfig.subQuestions && (
//                   <div className={`sub-question-container ${formData[name] === 'Yes' ? 'visible' : ''}`}>
//                     {renderSubQuestions(qConfig.subQuestions, questionCounter)}
//                   </div>
//                 )}

//                 {/* Conditional rendering for YouTube video (only if Q27 is "No") */}
//                 {isQ27No && qConfig.videoUrlOnNo && (
//                     <div className="youtube-player-container">
//                         <iframe
//                             width="560" // Adjust size as needed, CSS will make it responsive
//                             height="315"
//                             src={qConfig.videoUrlOnNo}
//                             title="YouTube video player"
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         ></iframe>
//                     </div>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       ))}
      
//       <button type="submit" className="submit-button">Submit Questionnaire</button>
//     </form>
//   );
// }

// export default Questionnaire;


import React, { useState } from 'react';
import './Questionnaire.css';
import questionnaireData from '../assets/questionnaire.json' with { type: 'json' };

// This structure defines the layout, sections, and sub-question logic.
const formStructure = [
  {
    title: "Section 1: General Information",
    questions: [
      { key: "Q1", type: "number", placeholder: "e.g., 35" },
      { key: "Q2", type: "number", name: "height_cm", placeholder: "e.g., 165" },
      { key: "Q3", type: "number", name: "weight_kg", placeholder: "e.g., 60" },
      { key: "Q4", type: "select" },
      { key: "Q5", type: "radio" },
      { key: "Q6", type: "radio" },
      { key: "Q7", type: "radio" },
      { key: "Q8", type: "radio" },
      { key: "Q9", type: "radio", condition: { key: "Q9", value: "Yes" }, subQuestions: [
          { key: "Q10", type: "number", placeholder: "Please enter a number - years" },
          { key: "Q11", type: "radio" },
          { key: "Q12", type: "radio" }
      ]},
      { key: "Q13", type: "radio" },
      { key: "Q14", type: "radio", condition: { key: "Q14", value: "Yes" }, subQuestions: [
          { key: "Q15", type: "number", placeholder: "Please enter a number" },
          { key: "Q16", type: "radio" },
          { key: "Q17", type: "radio" }
      ]},
      { key: "Q18", type: "radio" },
      { key: "Q19", type: "radio" },
      { key: "Q20", type: "radio", condition: { key: "Q20", value: "Yes" }, subQuestions: [
          { key: "Q21", type: "radio" },
          { key: "Q22", type: "number", placeholder: "e.g., 45" },
          { key: "Q23", type: "checkbox" },
          { key: "Q24", type: "radio", condition: { key: "Q24", value: "No" }, subQuestions: [
              { key: "Q25", type: "number", placeholder: "Enter age of death" }
          ]},
          { key: "Q26", type: "text", placeholder: "Enter ethnicity" }
      ]},
    ]
  },
  {
    title: "Section 2: Breast Examination (BE)",
    questions: [
        { 
          key: "Q27", 
          type: "radio", 
          condition: {key: "Q27", value: "Yes"}, 
          videoUrlOnNo: "https://www.youtube.com/embed/XKtTymNkcj0?autoplay=1&rel=0",
          subQuestions: [
            { key: "Q28", type: "radio" },
            { key: "Q29", type: "radio" },
          ]
        },
        { key: "Q30", type: "radio", condition: {key: "Q30", value: "Yes"}, subQuestions: [
            { key: "Q31", type: "checkbox" },
            { key: "Q32", type: "radio" },
            { key: "Q33", type: "radio" },
        ]},
        { key: "Q34", type: "radio", condition: {key: "Q34", value: "Yes"}, subQuestions: [
            { key: "Q35", type: "radio" },
        ]},
        { key: "Q36", type: "radio", condition: {key: "Q36", value: "Yes"}, subQuestions: [
            { key: "Q37", type: "checkbox" },
        ]},
    ]
  },
  {
    title: "Section 3: Beyond BE",
    questions: [
        { key: "Q38", type: "radio", condition: {key: "Q38", value: "Yes"}, subQuestions: [
            { key: "Q39", type: "radio" },
        ]},
        { key: "Q40", type: "radio", condition: {key: "Q40", value: "Yes"}, subQuestions: [
            { key: "Q41", type: "radio" },
        ]},
        { key: "Q42", type: "radio", condition: {key: "Q42", value: "Yes"}, subQuestions: [
            { key: "Q43", type: "checkbox-plus-text", otherOptionId: "q43_other_specify", otherPlaceholder: "Specify other cancer" },
        ]},
    ]
  }
];

// The component now accepts `isSubmitting` as a prop
function Questionnaire({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      const displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}.`;
      return (
        <React.Fragment key={subQName}>
          <div className="question-block">
            <label>{displayNumber} {subQData.question}</label>
            {renderInput(subQConfig)}
          </div>
          {subQConfig.subQuestions && (
            <div className={`sub-question-container ${formData[subQConfig.condition.key] === subQConfig.condition.value ? 'visible' : ''}`}>
              {renderSubQuestions(subQConfig.subQuestions, `${parentNumber}${String.fromCharCode(97 + index)}`)}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  let questionCounter = 0;

  return (
    <form className="questionnaire-container" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>Breast Cancer Risk Questionnaire</h1>
        <p>Please answer the following questions to the best of your ability.</p>
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
            return (
              <React.Fragment key={name}>
                <div className="question-block">
                  <label>{displayNumber} {data.question}</label>
                  {renderInput(qConfig)}
                </div>
                {qConfig.subQuestions && (
                  <div className={`sub-question-container ${formData[name] === 'Yes' ? 'visible' : ''}`}>
                    {renderSubQuestions(qConfig.subQuestions, questionCounter)}
                  </div>
                )}
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
      
      {/* --- MODIFIED SECTION FOR THE SUBMIT BUTTON --- */}
      <div className="submit-button-container">
        {isSubmitting ? (
          // This button shows when isSubmitting is true
          <button type="button" className="submit-button loading" disabled>
            <span className="loading-dots">
              <span></span><span></span><span></span>
            </span>
            Submitting...
          </button>
        ) : (
          // This is the normal button
          <button type="submit" className="submit-button">
            Submit Questionnaire
          </button>
        )}
      </div>
    </form>
  );
}

export default Questionnaire;