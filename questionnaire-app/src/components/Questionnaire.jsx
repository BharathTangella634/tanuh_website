// // src/components/Questionnaire.jsx
// import React, { useState } from 'react';
// import './Questionnaire.css';

// function Questionnaire({ onSubmit }) {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     // Special handling for checkboxes which can have multiple selections
//     if (type === 'checkbox') {
//         const currentValues = formData[name] || [];
//         if (checked) {
//             setFormData(prev => ({ ...prev, [name]: [...currentValues, value] }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: currentValues.filter(v => v !== value) }));
//         }
//     } else {
//         setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const renderSubQuestions = (condition, children) => {
//     return <div className={`sub-question-container ${condition ? 'visible' : ''}`}>{children}</div>;
//   };

//   return (
//     <form className="questionnaire-container" onSubmit={handleSubmit}>
//       <div className="form-header">
//         <h1>Breast Cancer Risk Questionnaire</h1>
//         <p>Please answer the following questions to the best of your ability.</p>
//       </div>

//       {/* --- Section 1: General Information --- */}
//       <div className="form-section">
//         <h2>Section 1: General Information</h2>
        
//         <div className="question-block">
//           <label>1. What is your current age?</label>
//           <input type="number" name="current_age" placeholder="e.g., 35" onChange={handleChange} className="text-input" />
//         </div>

//         <div className="question-block">
//             <label>2. What is your height and weight?</label>
//             <div className="inline-inputs">
//                 <input type="number" name="height_cm" placeholder="Height (cm)" onChange={handleChange} className="text-input" />
//                 <input type="number" name="weight_kg" placeholder="Weight (kg)" onChange={handleChange} className="text-input" />
//             </div>
//         </div>

//         {/* ... Add other questions from Section 1 here following the pattern ... */}
        
//         <div className="question-block">
//             <label>8. Have you had a menstrual period? *</label>
//             <div className="radio-group">
//                 <label><input type="radio" name="had_menstrual_period" value="Yes" onChange={handleChange} /> Yes</label>
//                 <label><input type="radio" name="had_menstrual_period" value="No" onChange={handleChange} /> No</label>
//             </div>
//         </div>
        
//         {renderSubQuestions(formData.had_menstrual_period === 'Yes',
//             <>
//                 <div className="question-block">
//                     <label>8a. What was your age when you had your first menstrual period? *</label>
//                     <input type="number" name="age_first_period" placeholder="Please enter a number - years" onChange={handleChange} className="text-input" />
//                 </div>
//                 <div className="question-block">
//                     <label>8b. Which of these best describes your menopausal status? *</label>
//                     <div className="radio-group vertical">
//                         <label><input type="radio" name="menopausal_status" value="Premenopausal (regular)" onChange={handleChange} /> Premenopausal (still having periods) - regular cycles</label>
//                         <label><input type="radio" name="menopausal_status" value="Premenopausal (irregular)" onChange={handleChange} /> Premenopausal (still having periods) - irregular cycles</label>
//                         <label><input type="radio" name="menopausal_status" value="Perimenopausal" onChange={handleChange} /> Perimenopausal (periods are irregular or have stopped for less than 12 months)</label>
//                         <label><input type="radio" name="menopausal_status" value="Postmenopausal" onChange={handleChange} /> Postmenopausal (periods have stopped for 12 consecutive months or more)</label>
//                     </div>
//                 </div>
//             </>
//         )}

//         <div className="question-block">
//             <label>10. Have you given birth to one or more children? *</label>
//             <div className="radio-group">
//                 <label><input type="radio" name="given_birth" value="Yes" onChange={handleChange} /> Yes</label>
//                 <label><input type="radio" name="given_birth" value="No" onChange={handleChange} /> No</label>
//             </div>
//         </div>
        
//         {renderSubQuestions(formData.given_birth === 'Yes',
//             <>
//                 <div className="question-block">
//                     <label>10a. Number of children: *</label>
//                     <input type="number" name="number_of_children" placeholder="Please enter a number" onChange={handleChange} className="text-input" />
//                 </div>
//                 <div className="question-block">
//                     <label>10b. Your age at every child birth (Please enter comma-separated ages) *</label>
//                     <input type="text" name="age_at_births" placeholder="e.g., 25,28" onChange={handleChange} className="text-input" />
//                 </div>
//                 <div className="question-block">
//                     <label>10c. Total Duration of breast fooding [sic] (Please enter a number - years and months)</label>
//                     <input type="text" name="breastfeeding_duration" placeholder="e.g., 2 years 6 months" onChange={handleChange} className="text-input" />
//                 </div>
//             </>
//         )}

//         {/* ... All other questions from screenshots would go here ... */}
//         {/* For brevity, I am showing the most complex ones. Let's add the last section to complete it. */}
//       </div>

//       {/* --- Section 2: Breast Examination (BE) --- */}
//       <div className="form-section">
//         <h2>Section 2: Breast Examination (BE)</h2>
//         <div className="question-block">
//             <label>14. Have you ever undergone a Breast Examination (BE)? *</label>
//             <div className="radio-group">
//                 <label><input type="radio" name="had_be" value="Yes" onChange={handleChange} /> Yes</label>
//                 <label><input type="radio" name="had_be" value="No" onChange={handleChange} /> No</label>
//             </div>
//         </div>
//         {renderSubQuestions(formData.had_be === 'Yes', 
//             <>
//                 <div className="question-block">
//                     <label>15. During BE, was any lump or mass detected in your breast?</label>
//                     <div className="radio-group">
//                         <label><input type="radio" name="lump_detected" value="Yes" onChange={handleChange} /> Yes</label>
//                         <label><input type="radio" name="lump_detected" value="No" onChange={handleChange} /> No</label>
//                     </div>
//                 </div>
//                 {/* ... other questions in this section would follow this pattern */}
//             </>
//         )}
//       </div>

//       {/* --- Section 3: Beyond BE --- */}
//       <div className="form-section">
//         <h2>Section 3: Beyond BE</h2>
//         {/* ... Questions for section 3 go here ... */}
//       </div>
      
//       <button type="submit" className="submit-button">Submit Questionnaire</button>
//     </form>
//   );
// }

// export default Questionnaire;

// src/components/Questionnaire.jsx
import React, { useState } from 'react';
import './Questionnaire.css';

function Questionnaire({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        const currentValues = formData[name] || [];
        if (checked) {
            setFormData(prev => ({ ...prev, [name]: [...currentValues, value] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: currentValues.filter(v => v !== value) }));
        }
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderSubQuestions = (condition, children) => {
    return <div className={`sub-question-container ${condition ? 'visible' : ''}`}>{children}</div>;
  };

  return (
    <form className="questionnaire-container" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>Breast Cancer Risk Questionnaire</h1>
        <p>Please answer the following questions to the best of your ability.</p>
      </div>

      {/* --- Section 1: General Information --- */}
      <div className="form-section">
        <h2>Section 1: General Information</h2>

        <div className="question-block"><label>1. What is your current age?</label><input type="number" name="q1_current_age" placeholder="e.g., 35" onChange={handleChange} className="text-input" /></div>
        <div className="question-block"><label>2. What is your height and weight?</label><div className="inline-inputs"><input type="number" name="q2_height_cm" placeholder="Height (cm)" onChange={handleChange} className="text-input" /><input type="number" name="q2_weight_kg" placeholder="Weight (kg)" onChange={handleChange} className="text-input" /></div></div>
        <div className="question-block"><label>3. Which state or union territory best represents the place where you have lived for a significant part of your life? *</label><select name="q3_state" onChange={handleChange} className="select-input"><option value="">Select your state/UT</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Karnataka">Karnataka</option>{/* Add other states */}</select></div>
        <div className="question-block"><label>4. Please indicate your family's approximate annual household income range?</label><div className="radio-group vertical"><label><input type="radio" name="q4_income" value="less_than_2L" onChange={handleChange} /> Less than ₹2,00,000 per annum</label><label><input type="radio" name="q4_income" value="2L-5L" onChange={handleChange} /> Between ₹2,00,000 and ₹5,00,000 per annum</label><label><input type="radio" name="q4_income" value="5L-10L" onChange={handleChange} /> Between ₹5,00,000 and ₹10,00,000 per annum</label><label><input type="radio" name="q4_income" value="greater_than_10L" onChange={handleChange} /> Greater than ₹10,00,000 per annum</label></div></div>
        <div className="question-block"><label>5. What is your highest educational qualification?</label><div className="radio-group vertical"><label><input type="radio" name="q5_education" value="None" onChange={handleChange} /> No formal education</label><label><input type="radio" name="q5_education" value="less_than_10_years" onChange={handleChange} /> &lt;10 years of Schooling</label><label><input type="radio" name="q5_education" value="Intermediate" onChange={handleChange} /> Intermediate Education</label><label><input type="radio" name="q5_education" value="Graduation_and_Above" onChange={handleChange} /> Graduation &amp; Above</label></div></div>
        <div className="question-block"><label>6. Have you been diagnosed with diabetes?</label><div className="radio-group"><label><input type="radio" name="q6_diabetes" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q6_diabetes" value="No" onChange={handleChange} /> No</label><label><input type="radio" name="q6_diabetes" value="I don't know" onChange={handleChange} /> I don't know</label></div></div>
        <div className="question-block"><label>7. Have you been diagnosed with high blood pressure (hypertension)?</label><div className="radio-group"><label><input type="radio" name="q7_hypertension" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q7_hypertension" value="No" onChange={handleChange} /> No</label><label><input type="radio" name="q7_hypertension" value="I don't know" onChange={handleChange} /> I don't know</label></div></div>
        <div className="question-block"><label>8. Have you had a menstrual period? *</label><div className="radio-group"><label><input type="radio" name="q8_had_menstrual_period" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q8_had_menstrual_period" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q8_had_menstrual_period === 'Yes', <>
            <div className="question-block"><label>8a. What was your age when you had your first menstrual period? *</label><input type="number" name="q8a_age_first_period" placeholder="Please enter a number - years" onChange={handleChange} className="text-input" /></div>
            <div className="question-block"><label>8b. Which of these best describes your menopausal status? *</label><div className="radio-group vertical"><label><input type="radio" name="q8b_menopausal_status" value="Premenopausal (regular)" onChange={handleChange} /> Premenopausal (still having periods) - regular cycles</label><label><input type="radio" name="q8b_menopausal_status" value="Premenopausal (irregular)" onChange={handleChange} /> Premenopausal (still having periods) - irregular cycles</label><label><input type="radio" name="q8b_menopausal_status" value="Perimenopausal" onChange={handleChange} /> Perimenopausal (periods are irregular or have stopped for less than 12 months)</label><label><input type="radio" name="q8b_menopausal_status" value="Postmenopausal" onChange={handleChange} /> Postmenopausal (periods have stopped for 12 consecutive months or more)</label></div></div>
        </>)}
        <div className="question-block"><label>9. What is your Marital Status?</label><div className="radio-group"><label><input type="radio" name="q9_marital_status" value="Married" onChange={handleChange} /> Married</label><label><input type="radio" name="q9_marital_status" value="Never Married" onChange={handleChange} /> Never Married</label></div></div>
        <div className="question-block"><label>10. Have you given birth to one or more children? *</label><div className="radio-group"><label><input type="radio" name="q10_given_birth" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q10_given_birth" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q10_given_birth === 'Yes', <>
            <div className="question-block"><label>10a. Number of children: *</label><input type="number" name="q10a_number_of_children" placeholder="Please enter a number" onChange={handleChange} className="text-input" /></div>
            <div className="question-block"><label>10b. Your age at every child birth (Please enter comma-separated ages) *</label><input type="text" name="q10b_age_at_births" placeholder="e.g., 25,28" onChange={handleChange} className="text-input" /></div>
            <div className="question-block"><label>10c. Total Duration of breast feeding (Please enter a number - years and months)</label><input type="text" name="q10c_breastfeeding_duration" placeholder="e.g., 2 years 6 months" onChange={handleChange} className="text-input" /></div>
        </>)}
        <div className="question-block"><label>11. Have you smoked cigarettes, bidis, or used any other form of tobacco?</label><div className="radio-group"><label><input type="radio" name="q11_tobacco" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q11_tobacco" value="No" onChange={handleChange} /> No</label></div></div>
        <div className="question-block"><label>12. Do you consume alcohol?</label><div className="radio-group"><label><input type="radio" name="q12_alcohol" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q12_alcohol" value="No" onChange={handleChange} /> No</label></div></div>
        <div className="question-block"><label>13. Have any relatives been diagnosed with any type of cancer? *</label><div className="radio-group"><label><input type="radio" name="q13_relatives_cancer" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q13_relatives_cancer" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q13_relatives_cancer === 'Yes', <>
            <div className="question-block"><label>13a. Please enter the relation with relative *</label><input type="text" name="q13a_relation" placeholder="e.g., Mother, Sister, Uncle" onChange={handleChange} className="text-input" /></div>
            <div className="question-block"><label>13b. Please enter the age of diagnosis *</label><input type="number" name="q13b_age_of_diagnosis" placeholder="e.g., 45" onChange={handleChange} className="text-input" /></div>
            <div className="question-block"><label>13c. Please specify which types of cancer *</label><div className="checkbox-group vertical"><label><input type="checkbox" name="q13c_cancer_types" value="Breast cancer" onChange={handleChange} /> Breast cancer</label><label><input type="checkbox" name="q13c_cancer_types" value="Ovarian cancer" onChange={handleChange} /> Ovarian cancer</label><label><input type="checkbox" name="q13c_cancer_types" value="Colon, rectal, or pancreatic cancer" onChange={handleChange} /> Colon, rectal, or pancreatic cancer</label><label><input type="checkbox" name="q13c_cancer_types" value="Uterine cancer" onChange={handleChange} /> Uterine cancer</label><label><input type="checkbox" name="q13c_cancer_types" value="Prostate cancer" onChange={handleChange} /> Prostate cancer</label><label><input type="checkbox" name="q13c_cancer_types" value="Other cancer" onChange={handleChange} /> Other cancer (please specify if you wish)</label><input type="text" name="q13c_other_cancer_specify" placeholder="Please specify other cancer (optional)" onChange={handleChange} className="text-input" /></div></div>
            <div className="question-block"><label>13d. Is the person alive? *</label><div className="radio-group"><label><input type="radio" name="q13d_is_person_alive" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q13d_is_person_alive" value="No" onChange={handleChange} /> No</label></div></div>
            <div className="question-block"><label>13e. Age of death</label><select name="q13e_age_of_death" onChange={handleChange} className="select-input"><option value="">Select age</option>{/* Populate ages */}</select></div>
            <div className="question-block"><label>13f. Please select your ethnicity:</label><select name="q13f_ethnicity" onChange={handleChange} className="select-input"><option value="">Select your ethnicity</option>{/* Populate ethnicities */}</select></div>
        </>)}
      </div>

      {/* --- Section 2: Breast Examination (BE) --- */}
      <div className="form-section">
        <h2>Section 2: Breast Examination (BE)</h2>
        <div className="question-block"><label>14. Have you ever undergone a Breast Examination (BE)? *</label><div className="radio-group"><label><input type="radio" name="q14_had_be" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q14_had_be" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q14_had_be === 'Yes', <>
            <div className="question-block"><label>14a. When was the last BE performed?</label><div className="radio-group vertical"><label><input type="radio" name="q14a_last_be_time" value="within_1yr" onChange={handleChange} /> Within 1 year</label><label><input type="radio" name="q14a_last_be_time" value="1_to_3yr" onChange={handleChange} /> 1-3 years</label><label><input type="radio" name="q14a_last_be_time" value="more_than_3yr" onChange={handleChange} /> More than 3 years ago</label></div></div>
            <div className="question-block"><label>14b. Result of BE?</label><div className="radio-group vertical"><label><input type="radio" name="q14b_be_result" value="Normal" onChange={handleChange} /> Normal - No abnormal findings</label><label><input type="radio" name="q14b_be_result" value="Benign" onChange={handleChange} /> Benign - Non-cancerous features (e.g., fibroadenoma, cyst)</label><label><input type="radio" name="q14b_be_result" value="Suspicious" onChange={handleChange} /> Suspicious - Unclear/possibly malignant features, needs further tests</label><label><input type="radio" name="q14b_be_result" value="Malignant" onChange={handleChange} /> Malignant features - Strongly suggestive of breast cancer</label></div></div>
        </>)}
        <div className="question-block"><label>15. During BE, was any lump or mass detected in your breast?</label><div className="radio-group"><label><input type="radio" name="q15_lump_detected" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q15_lump_detected" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q15_lump_detected === 'Yes', <>
            <div className="question-block"><label>15a. Specify location</label><div className="checkbox-group"><label><input type="checkbox" name="q15a_lump_location" value="Left" onChange={handleChange} /> Left</label><label><input type="checkbox" name="q15a_lump_location" value="Right" onChange={handleChange} /> Right</label><label><input type="checkbox" name="q15a_lump_location" value="Both" onChange={handleChange} /> Both</label></div></div>
            <div className="question-block"><label>15b. Size (approximate if known):</label><div className="radio-group"><label><input type="radio" name="q15b_lump_size" value="less_than_1cm" onChange={handleChange} /> &lt;1 cm</label><label><input type="radio" name="q15b_lump_size" value="1_to_2cm" onChange={handleChange} /> 1-2 cm</label><label><input type="radio" name="q15b_lump_size" value="greater_than_2cm" onChange={handleChange} /> &gt;2 cm</label></div></div>
            <div className="question-block"><label>15c. Consistency:</label><div className="radio-group"><label><input type="radio" name="q15c_lump_consistency" value="Soft" onChange={handleChange} /> Soft</label><label><input type="radio" name="q15c_lump_consistency" value="Firm" onChange={handleChange} /> Firm</label><label><input type="radio" name="q15c_lump_consistency" value="Hard" onChange={handleChange} /> Hard</label></div></div>
        </>)}
        <div className="question-block"><label>16. Did you experience breast pain or tenderness during examination?</label><div className="radio-group"><label><input type="radio" name="q16_pain_during_exam" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q16_pain_during_exam" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q16_pain_during_exam === 'Yes', <>
            <div className="question-block"><label>16a. If yes, was it localized (in one specific spot) or generalized (spread across a wider area of the breast)?</label><div className="radio-group"><label><input type="radio" name="q16a_pain_location" value="Localized" onChange={handleChange} /> Localized (in one specific spot)</label><label><input type="radio" name="q16a_pain_location" value="Generalized" onChange={handleChange} /> Generalized (spread across a wider area)</label></div></div>
        </>)}
        <div className="question-block"><label>17. After the BE, were you advised for further investigation or follow-up?</label><div className="radio-group"><label><input type="radio" name="q17_follow_up" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q17_follow_up" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q17_follow_up === 'Yes', <>
            <div className="question-block"><label>17a. If Yes, specify:</label><div className="checkbox-group vertical"><label><input type="checkbox" name="q17a_follow_up_type" value="Ultrasound" onChange={handleChange} /> Ultrasound</label><label><input type="checkbox" name="q17a_follow_up_type" value="Mammogram" onChange={handleChange} /> Mammogram</label><label><input type="checkbox" name="q17a_follow_up_type" value="Biopsy" onChange={handleChange} /> Biopsy</label><label><input type="checkbox" name="q17a_follow_up_type" value="Other" onChange={handleChange} /> Other</label></div></div>
        </>)}
      </div>

      {/* --- Section 3: Beyond BE --- */}
      <div className="form-section">
        <h2>Section 3: Beyond BE</h2>
        <div className="question-block"><label>18. Have you undergone a mammogram?</label><div className="radio-group"><label><input type="radio" name="q18_mammogram" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q18_mammogram" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q18_mammogram === 'Yes', <>
            <div className="question-block"><label>18a. Which of these best describes your breast density?</label><div className="radio-group vertical with-description"><label><input type="radio" name="q18a_breast_density" value="A" onChange={handleChange} /> <span><b>A: Almost entirely fatty:</b> (The breasts are almost all fat, with very little fibrous and glandular tissue. This makes it easy to see any abnormality on the mammogram.)</span></label><label><input type="radio" name="q18a_breast_density" value="B" onChange={handleChange} /> <span><b>B: Scattered fibroglandular densities:</b> (There are areas of scattered dense or fibrous and glandular tissue, but the majority of the breast is fatty. A small mass would be visible on a mammogram.)</span></label><label><input type="radio" name="q18a_breast_density" value="C" onChange={handleChange} /> <span><b>C: Heterogeneously dense:</b> (There are many areas of fibrous and glandular tissue, which makes it hard to find small masses on a mammogram. This may obscure small cancers.)</span></label><label><input type="radio" name="q18a_breast_density" value="D" onChange={handleChange} /> <span><b>D: Extremely dense:</b> (The breasts are almost entirely made of dense, fibrous, and glandular tissue. This can make it very difficult to see through the breast on a mammogram. This is also associated with a higher risk of breast cancer.)</span></label><label><input type="radio" name="q18a_breast_density" value="E" onChange={handleChange} /> <span><b>E: I don't know / I am not sure</b></span></label></div></div>
        </>)}
        <div className="question-block"><label>19. Have you had a breast biopsy?</label><div className="radio-group"><label><input type="radio" name="q19_biopsy" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q19_biopsy" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q19_biopsy === 'Yes', <>
            <div className="question-block"><label>19a. Result of Biopsy (BIRAD Assessment)</label><div className="radio-group vertical"><label><input type="radio" name="q19a_biopsy_result" value="N (1)" onChange={handleChange} /> N (1) Negative</label><label><input type="radio" name="q19a_biopsy_result" value="B (2)" onChange={handleChange} /> B (2) Benign</label><label><input type="radio" name="q19a_biopsy_result" value="P (3)" onChange={handleChange} /> P (3) Probably benign</label><label><input type="radio" name="q19a_biopsy_result" value="M (6)" onChange={handleChange} /> M (6) Malignancy</label></div></div>
        </>)}
        <div className="question-block"><label>20. Have you ever been diagnosed with any type of cancer?</label><div className="radio-group"><label><input type="radio" name="q20_cancer_diagnosis" value="Yes" onChange={handleChange} /> Yes</label><label><input type="radio" name="q20_cancer_diagnosis" value="No" onChange={handleChange} /> No</label></div></div>
        {renderSubQuestions(formData.q20_cancer_diagnosis === 'Yes', <>
            <div className="question-block"><label>20a. Please specify which types of cancer:</label><div className="checkbox-group vertical"><label><input type="checkbox" name="q20a_cancer_types" value="Breast cancer" onChange={handleChange} /> Breast cancer</label><label><input type="checkbox" name="q20a_cancer_types" value="Ovarian cancer" onChange={handleChange} /> Ovarian cancer</label><label><input type="checkbox" name="q20a_cancer_types" value="Colon, rectal, or pancreatic cancer" onChange={handleChange} /> Colon, rectal, or pancreatic cancer</label><label><input type="checkbox" name="q20a_cancer_types" value="Uterine cancer" onChange={handleChange} /> Uterine cancer</label><label><input type="checkbox" name="q20a_cancer_types" value="Other cancer" onChange={handleChange} /> Other cancer (please specify if you wish)</label><input type="text" name="q20a_other_cancer_specify" placeholder="Please specify other cancer (optional)" onChange={handleChange} className="text-input" /></div></div>
        </>)}
      </div>

      <button type="submit" className="submit-button">Submit Questionnaire</button>
    </form>
  );
}

export default Questionnaire;