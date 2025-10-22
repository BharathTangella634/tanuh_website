


// import React from 'react';
// import './ThankYou.css';
// import { formStructure } from './Questionnaire'; 
// import jsPDF from 'jspdf';
// import { Download, CheckCircle } from 'lucide-react'; // ✅ Added icons

// function ThankYou({ riskResult, formData, questionnaireData }) {

//   const handleDownloadPdf = () => {
//     if (!formData) {
//       alert('Form data is not available to generate a PDF.');
//       return;
//     }

//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     let y = 0;

//     const themeColor = [98, 0, 238];

//     const sanitizeText = (text) => {
//       if (!text) return '';
//       return text.replace(/[₹]/g, 'Rs.').replace(/\s+/g, ' ').trim();
//     };

//     const addHeader = () => {
//       doc.setFillColor(242, 237, 255);
//       doc.rect(0, 0, margin + 5, pageHeight, 'F');
//       doc.setFont('helvetica', 'bold');
//       doc.setFontSize(14);
//       doc.setTextColor(40, 40, 40);
//       doc.text('Your Breast Cancer Risk Assessment', margin + 10, 18);
//       doc.setDrawColor(...themeColor);
//       doc.setLineWidth(0.4);
//       doc.line(margin + 10, 20, pageWidth - margin, 20);
//       y = 32;
//     };

//     const addFooter = (pageNumber, totalPages) => {
//       doc.setFont('helvetica', 'normal');
//       doc.setFontSize(8);
//       doc.setTextColor(150);
//       const footerText = `Page ${pageNumber} of ${totalPages} | Generated: ${new Date().toLocaleDateString()}`;
//       doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
//     };

//     const addPageWithTemplate = () => {
//       doc.addPage();
//       addHeader();
//     };

//     const renderSectionHeader = (title) => {
//       if (y > pageHeight - 40) addPageWithTemplate();
//       y += 8;
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(...themeColor);
//       doc.text(title, margin + 10, y);
//       y += 8;
//     };

//     const renderQAPair = (questionText, answerText) => {
//       const qaMargin = margin + 15;
//       const qaWidth = pageWidth - qaMargin - margin - 10;

//       const question = sanitizeText(`Q: ${questionText}`);
//       const answer = sanitizeText(`A: ${answerText}`);

//       const questionLines = doc.splitTextToSize(question, qaWidth - 5);
//       const answerLines = doc.splitTextToSize(answer, qaWidth - 10);

//       const lineHeight = 5.5;
//       const questionHeight = questionLines.length * lineHeight;
//       const answerHeight = answerLines.length * lineHeight;
//       const boxPadding = 8;
//       const totalBoxHeight = questionHeight + answerHeight + boxPadding + 6;

//       if (y + totalBoxHeight > pageHeight - 20) {
//         addPageWithTemplate();
//       }

//       doc.setFillColor(253, 253, 253);
//       doc.setDrawColor(220, 220, 220);
//       doc.roundedRect(margin + 10, y, pageWidth - (margin * 2) - 10, totalBoxHeight, 2, 2, 'FD');

//       let textY = y + 8;
//       doc.setFontSize(9);

//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(50, 50, 50);
//       questionLines.forEach((line) => {
//         doc.text(line, qaMargin, textY);
//         textY += lineHeight;
//       });

//       textY += 1;
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(80, 80, 80);
//       answerLines.forEach((line) => {
//         doc.text(line, qaMargin + 5, textY);
//         textY += lineHeight;
//       });

//       y += totalBoxHeight + 6;
//     };

//     addHeader();

//     if (riskResult !== null) {
//       doc.setFillColor(240, 230, 255);
//       doc.roundedRect(margin + 10, y, pageWidth - (margin * 2) - 10, 22, 3, 3, 'F');
//       doc.setFont('helvetica', 'bold');
//       doc.setFontSize(10);
//       doc.setTextColor(40, 40, 40);
//       doc.text('Your Estimated Lifetime Risk:', margin + 15, y + 12);
//       doc.setFontSize(18);
//       doc.setTextColor(...themeColor);
//       doc.text(`${riskResult}%`, pageWidth - margin - 15, y + 14, { align: 'right' });
//       y += 32;
//     }

//     let mainQuestionCounter = 0;

//     formStructure.forEach((section) => {
//       const questionsToRender = [];

//       const findAnsweredQuestions = (questions, parentNumber) => {
//         questions.forEach((qConfig, index) => {
//           const name = qConfig.name || qConfig.key;
//           const answer = formData[name];

//           let displayNumber;
//           if (parentNumber) {
//             displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}`;
//           } else {
//             mainQuestionCounter++;
//             displayNumber = mainQuestionCounter;
//           }

//           if (answer !== undefined && answer !== null && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
//             questionsToRender.push({
//               text: `${displayNumber}. ${questionnaireData[qConfig.key]?.question}`,
//               answer: Array.isArray(answer) ? answer.join(', ') : answer.toString(),
//             });
//           }

//           if (qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value) {
//             findAnsweredQuestions(qConfig.subQuestions, displayNumber);
//           }
//         });
//       };

//       findAnsweredQuestions(section.questions);

//       if (questionsToRender.length > 0) {
//         renderSectionHeader(section.title);
//         questionsToRender.forEach((qa) => renderQAPair(qa.text, qa.answer));
//       }
//     });

//     const totalPages = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       doc.setPage(i);
//       addFooter(i, totalPages);
//     }

//     doc.save('Breast-Cancer-Risk-Summary.pdf');
//   };

//   return (
//     <div className="thank-you-overlay">
//       <div className="thank-you-dialog">
//         <button className="close-button" onClick={() => window.location.reload()}>&times;</button>
//         <div className="thank-you-header">
//           <CheckCircle className="success-icon" size={40} color="#6200EE" />
//           <h3>Submission Complete</h3>
//         </div>
//         <p>Thank you for completing the questionnaire!</p>
//         {riskResult !== null && (
//           <div className="risk-result-container">
//             <p>Your estimated lifetime risk of breast cancer is:</p>
//             <h2 className="risk-percentage">{riskResult}%</h2>
//           </div>
//         )}
//         <div className="action-buttons">
//           <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
//           <button className="download-button" onClick={handleDownloadPdf}>
//             <Download size={40} style={{ marginRight: '8px' }} /> Download Summary (PDF)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ThankYou;


// last but one without change in pdf but change in addition of table





// import React from 'react';
// import './ThankYou.css';
// import { formStructure } from './Questionnaire'; 
// import jsPDF from 'jspdf';
// // Use a direct import for the plugin for maximum reliability
// import autoTable from 'jspdf-autotable';
// import { Download, CheckCircle } from 'lucide-react'; 

// // Data for the interpretation table based on the image provided
// const riskInterpretationData = [
//   { level: "Normal Risk", range: "Below 0.4004", meaning: "Your risk is lower than most women (below the 50th percentile).", action: "Keep up with routine checkups, like yearly breast exams by a doctor from 30 years of age." },
//   { level: "Moderate Risk", range: "0.4004 to 0.574", meaning: "Your risk is average or slightly higher (50th to 75th percentile).", action: "Consider breast exams every 6 months from 30 years of age and talk to your doctor about prevention." },
//   { level: "High Risk", range: "0.574 to 0.795", meaning: "Your risk is higher (75th to 95th percentile).", action: "Get breast exams every 4-6 months from 25 years of age and possibly imaging (like mammograms) as advised by your doctor." },
//   { level: "Very High Risk", range: "0.795 and above", meaning: "Your risk is very high (top 5% of women).", action: "Be extra vigilant with breast exams every 4 months from at least 25 years of age and more frequent imaging as per your doctor's advice." },
// ];

// function ThankYou({ riskResult, formData, questionnaireData }) {

//   const score = riskResult !== null ? (parseFloat(riskResult) / 100).toFixed(2) : null;

//   const handleDownloadPdf = () => {
//     if (!formData) {
//       alert("Form data is not available to generate a PDF.");
//       return;
//     }

//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const themeColor = [98, 0, 238];

//     // --- TEMPLATE HOOKS FOR HEADER & FOOTER ---
//     const pageHooks = {
//       didDrawPage: (data) => {
//         // Header
//         doc.setFontSize(20);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(40, 40, 40);
//         doc.text("Your Breast Cancer Risk Assessment", pageWidth / 2, 22, { align: 'center' });
//         doc.setDrawColor(...themeColor);
//         doc.setLineWidth(0.5);
//         doc.line(15, 25, pageWidth - 15, 25);

//         // Footer
//         const pageCount = doc.internal.getNumberOfPages();
//         doc.setFontSize(9);
//         doc.setTextColor(150);
//         const footerText = `Page ${data.pageNumber} of ${pageCount} | Summary Generated: ${new Date().toLocaleDateString()}`;
//         doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
//       }
//     };
    
//     // --- PREPARE DATA FOR THE TABLE ---
//     const body = [];
//     let mainQuestionCounter = 0;
    
//     formStructure.forEach(section => {
//         const questionsToRender = [];
        
//         const findAnsweredQuestions = (questions, parentNumber) => {
//             questions.forEach((qConfig, index) => {
//                 const name = qConfig.name || qConfig.key;
//                 const answer = formData[name];
                
//                 let displayNumber;
//                 if (parentNumber) {
//                     displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}`;
//                 } else {
//                     mainQuestionCounter++;
//                     displayNumber = mainQuestionCounter;
//                 }
                
//                 if (answer !== undefined && answer !== null && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
//                     // Prepare data for custom cell rendering
//                     questionsToRender.push({ 
//                         questionObject: {
//                             title: `Question ${displayNumber}`,
//                             text: questionnaireData[qConfig.key]?.question, 
//                         },
//                         answer: Array.isArray(answer) ? answer.join(', ') : answer.toString()
//                     });
//                 }
                
//                 if (qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value) {
//                     findAnsweredQuestions(qConfig.subQuestions, displayNumber);
//                 }
//             });
//         };
        
//         mainQuestionCounter = 0; // Reset for each section
//         findAnsweredQuestions(section.questions);
        
//         if (questionsToRender.length > 0) {
//             body.push([{ 
//                 content: section.title, 
//                 colSpan: 2, 
//                 styles: { fontStyle: 'bold', fontSize: 14, textColor: themeColor, fillColor: [245, 245, 245], halign: 'left' } 
//             }]);
//             questionsToRender.forEach(qa => {
//                 body.push([qa.questionObject, qa.answer]);
//             });
//         }
//     });

//     // --- GENERATE THE PDF USING AUTOTABLE (CORRECTED CALL) ---
//     // The fix is here: Call autoTable directly, passing 'doc' as the first argument.
//     autoTable(doc, {
//         startY: 30,
//         head: riskResult !== null ? [[{
//             content: `Your Estimated Lifetime Risk Score: ${score}`, // Use score here
//             styles: {
//                 halign: 'center', valign: 'middle', fontStyle: 'bold',
//                 fontSize: 16, textColor: themeColor, fillColor: [240, 230, 255],
//                 minCellHeight: 22, lineWidth: 0.2, lineColor: [200, 180, 255]
//             }
//         }]] : [],
//         body: body,
//         theme: 'grid',
//         didDrawPage: pageHooks.didDrawPage,
//         styles: {
//             cellPadding: 3.5,
//             fontSize: 10,
//             valign: 'top', // Changed to top align for better text flow
//             lineWidth: 0.1,
//             lineColor: [230, 230, 230],
//         },
//         columnStyles: {
//             0: { cellWidth: 85, fontStyle: 'normal' }, // Question column
//             1: { cellWidth: 'auto', textColor: [40, 40, 40] } // Answer column
//         },
//         // Custom cell drawing logic for professional formatting
//         didParseCell: (data) => {
//             if (data.column.index === 0 && typeof data.cell.raw === 'object' && data.cell.raw !== null) {
//                 data.cell.styles.valign = 'top'; // Ensure vertical alignment starts at top
//                 data.cell.text = ''; // Clear default text rendering

//                 const questionTitle = data.cell.raw.title;
//                 const questionText = data.cell.raw.text;
//                 const startY = data.cell.y + data.cell.padding('top');
//                 const startX = data.cell.x + data.cell.padding('left');
//                 const availableWidth = data.cell.width - data.cell.padding('horizontal');

//                 // Draw Question Title
//                 doc.setFont('helvetica', 'bold');
//                 doc.setFontSize(10);
//                 doc.setTextColor(40, 40, 40);
//                 doc.text(questionTitle, startX, startY);

//                 // Draw Question Text below title
//                 doc.setFont('helvetica', 'normal');
//                 doc.setFontSize(9);
//                 doc.setTextColor(120, 120, 120);
//                 // Use splitTextToSize for wrapping
//                 const textLines = doc.splitTextToSize(questionText, availableWidth);
//                 doc.text(textLines, startX, startY + 5); // Adjust Y offset as needed
//             }
//              // Style the answer column
//              if (data.column.index === 1) {
//                  data.cell.styles.valign = 'middle'; // Center answers vertically if desired
//              }
//         },
//         margin: { top: 30, bottom: 15 }
//     });
    
//     doc.save("Breast-Cancer-Risk-Summary.pdf");
//   };

//   return (
//     <div className="thank-you-overlay">
//       <div className="thank-you-dialog">
//         <button className="close-button" onClick={() => window.location.reload()}>&times;</button>
//         <div className="thank-you-header">
//           <CheckCircle className="success-icon" size={40} />
//           <h3>Submission Complete</h3>
//         </div>
//         <p>Thank you for completing the questionnaire!</p>
        
//         {score !== null && (
//           <div className="risk-result-container">
//             <p>Your Estimated Lifetime Risk Score:</p>
//             <h2 className="risk-score">{score}</h2>
//           </div>
//         )}

//         {score !== null && (
//           <div className="interpretation-container">
//             <h4>What Your Risk Score Means</h4>
//             <table className="risk-interpretation-table">
//               <thead>
//                 <tr>
//                   <th>Risk Level</th>
//                   <th>Score Range</th>
//                   <th>What It Means</th>
//                   <th>What To Do</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {riskInterpretationData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{row.level}</td>
//                     <td>{row.range}</td>
//                     <td>{row.meaning}</td>
//                     <td>{row.action}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="action-buttons">
//           <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
//           <button className="download-button" onClick={handleDownloadPdf}>
//             <Download size={18} style={{ marginRight: '8px' }} /> Download Summary (PDF)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ThankYou;



import React from 'react';
import './ThankYou.css';
import { formStructure } from './Questionnaire';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, CheckCircle } from 'lucide-react';

// Data for the interpretation table
const riskInterpretationData = [
  { level: "Normal Risk", range: "Below 0.4004", meaning: "Your risk is lower than most women (below the 50th percentile).", action: "Keep up with routine checkups, like yearly breast exams by a doctor from 30 years of age." },
  { level: "Moderate Risk", range: "0.4004 to 0.574", meaning: "Your risk is average or slightly higher (50th to 75th percentile).", action: "Consider breast exams every 6 months from 30 years of age and talk to your doctor about prevention." },
  { level: "High Risk", range: "0.574 to 0.795", meaning: "Your risk is higher (75th to 95th percentile).", action: "Get breast exams every 4-6 months from 25 years of age and possibly imaging (like mammograms) as advised by your doctor." },
  { level: "Very High Risk", range: "0.795 and above", meaning: "Your risk is very high (top 5% of women).", action: "Be extra vigilant with breast exams every 4 months from at least 25 years of age and more frequent imaging as per your doctor's advice." },
];

function ThankYou({ riskResult, formData, questionnaireData }) {

  const score = riskResult !== null ? (parseFloat(riskResult) / 100).toFixed(2) : null;

  const handleDownloadPdf = () => {
    if (!formData) {
      alert("Form data is not available to generate a PDF.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const themeColor = [98, 0, 238];
    let startY = 30; // Initial start Y

    // --- TEMPLATE HOOKS FOR HEADER & FOOTER ---
    const pageHooks = {
      didDrawPage: (data) => {
        // Header
        doc.setFontSize(20); doc.setFont("helvetica", "bold"); doc.setTextColor(40, 40, 40);
        doc.text("Your Breast Cancer Risk Assessment", pageWidth / 2, 22, { align: 'center' });
        doc.setDrawColor(...themeColor); doc.setLineWidth(0.5); doc.line(15, 25, pageWidth - 15, 25);
        // Footer
        const pageCount = doc.internal.getNumberOfPages(); doc.setFontSize(9); doc.setTextColor(150);
        const footerText = `Page ${data.pageNumber} of ${pageCount} | Summary Generated: ${new Date().toLocaleDateString()}`;
        doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
      }
    };

    // --- 1. RENDER RISK SCORE ---
    if (riskResult !== null) {
      autoTable(doc, {
        startY: startY,
        head: [[{
          content: `Your Estimated Lifetime Risk Score: ${score}`,
          styles: {
              halign: 'center', valign: 'middle', fontStyle: 'bold',
              fontSize: 16, textColor: themeColor, fillColor: [240, 230, 255],
              minCellHeight: 22, lineWidth: 0.2, lineColor: [200, 180, 255]
          }
        }]],
        theme: 'plain', // Use plain theme for just the header box
        margin: { top: 30, bottom: 15, left: 15, right: 15 },
        didDrawPage: pageHooks.didDrawPage // Apply header/footer
      });
      startY = (doc as any).lastAutoTable.finalY + 10; // Get Y position after the table
    }

    // --- 2. RENDER INTERPRETATION TABLE ---
    if (riskResult !== null) {
        // Add title for the interpretation table
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(themeColor[0], themeColor[1], themeColor[2]);
        doc.text("What Your Risk Score Means", 15, startY);
        startY += 8;

        autoTable(doc, {
            startY: startY,
            head: [['Risk Level', 'Score Range', 'What It Means', 'What To Do']],
            body: riskInterpretationData.map(row => [row.level, row.range, row.meaning, row.action]),
            theme: 'grid',
            headStyles: {
                fillColor: [240, 230, 255], // Light purple header
                textColor: themeColor,
                fontStyle: 'bold',
                lineWidth: 0.1,
                lineColor: [200, 180, 255]
            },
            styles: {
                fontSize: 8.5, // Slightly smaller font for table density
                cellPadding: 2.5,
                lineWidth: 0.1,
                lineColor: [220, 220, 220]
            },
            columnStyles: {
                0: { cellWidth: 30, fontStyle: 'bold' }, // Risk Level
                1: { cellWidth: 25 }, // Score Range
                2: { cellWidth: 'auto' }, // What It Means
                3: { cellWidth: 'auto' }  // What To Do
            },
            margin: { left: 15, right: 15, bottom: 15 },
             didDrawPage: pageHooks.didDrawPage // Apply header/footer to subsequent pages if table spans
        });
        startY = (doc as any).lastAutoTable.finalY + 15; // Get Y position after the table
    }

    // --- 3. RENDER Q&A DATA ---
    const bodyData = [];
    let mainQuestionCounter = 0;
    formStructure.forEach(section => {
        const questionsToRender = [];
        const findAnsweredQuestions = (questions, parentNumber) => {
            questions.forEach((qConfig, index) => {
                const name = qConfig.name || qConfig.key; const answer = formData[name];
                let displayNumber;
                if (parentNumber) displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}`;
                else { mainQuestionCounter++; displayNumber = mainQuestionCounter; }
                if (answer !== undefined && answer !== null && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
                    questionsToRender.push({
                        questionObject: { title: `Question ${displayNumber}`, text: questionnaireData[qConfig.key]?.question, },
                        answer: Array.isArray(answer) ? answer.join(', ') : answer.toString()
                    });
                }
                if (qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value) {
                    findAnsweredQuestions(qConfig.subQuestions, displayNumber);
                }
            });
        };
        mainQuestionCounter = 0; findAnsweredQuestions(section.questions);
        if (questionsToRender.length > 0) {
            bodyData.push([{ content: section.title, colSpan: 2, styles: { fontStyle: 'bold', fontSize: 14, textColor: themeColor, fillColor: [245, 245, 245], halign: 'left' } }]);
            questionsToRender.forEach(qa => { bodyData.push([qa.questionObject, qa.answer]); });
        }
    });

    autoTable(doc, {
        startY: startY, // Start after the interpretation table
        body: bodyData,
        theme: 'grid',
        didDrawPage: pageHooks.didDrawPage,
        styles: {
            cellPadding: 3.5, fontSize: 10, valign: 'top', // Changed valign back to top
            lineWidth: 0.1, lineColor: [230, 230, 230],
        },
        columnStyles: {
            0: { cellWidth: 85, fontStyle: 'normal' },
            1: { cellWidth: 'auto', textColor: [40, 40, 40] }
        },
        didParseCell: (data) => {
            if (data.column.index === 0 && typeof data.cell.raw === 'object' && data.cell.raw !== null) {
                data.cell.styles.valign = 'top'; data.cell.text = '';
                const questionTitle = data.cell.raw.title; const questionText = data.cell.raw.text;
                const startY = data.cell.y + data.cell.padding('top'); const startX = data.cell.x + data.cell.padding('left');
                const availableWidth = data.cell.width - data.cell.padding('horizontal');
                doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(40, 40, 40);
                doc.text(questionTitle, startX, startY);
                doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120, 120, 120);
                const textLines = doc.splitTextToSize(questionText, availableWidth);
                doc.text(textLines, startX, startY + 5);
            }
             if (data.column.index === 1) { data.cell.styles.valign = 'middle'; } // Keep answers vertically centered
        },
        margin: { top: 30, bottom: 15 } // Need top margin for header on first page
    });

    doc.save("Breast-Cancer-Risk-Summary.pdf");
  };

  return (
    <div className="thank-you-overlay">
      <div className="thank-you-dialog">
        <button className="close-button" onClick={() => window.location.reload()}>&times;</button>
        <div className="thank-you-header">
          <CheckCircle className="success-icon" size={40} />
          <h3>Submission Complete</h3>
        </div>
        <p>Thank you for completing the questionnaire!</p>
        
        {score !== null && (
          <div className="risk-result-container">
            <p>Your Estimated Lifetime Risk Score:</p>
            <h2 className="risk-score">{score}</h2>
          </div>
        )}

        {score !== null && (
          <div className="interpretation-container">
            <h4>What Your Risk Score Means</h4>
            <table className="risk-interpretation-table">
              <thead>
                <tr>
                  <th>Risk Level</th>
                  <th>Score Range</th>
                  <th>What It Means</th>
                  <th>What To Do</th>
                </tr>
              </thead>
              <tbody>
                {riskInterpretationData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.level}</td>
                    <td>{row.range}</td>
                    <td>{row.meaning}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="action-buttons">
          <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
          <button className="download-button" onClick={handleDownloadPdf}>
            <Download size={18} style={{ marginRight: '8px' }} /> Download Summary (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;