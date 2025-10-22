

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



import React from 'react';
import './ThankYou.css';
import { formStructure } from './Questionnaire';
import jsPDF from 'jspdf';
import { Download, CheckCircle } from 'lucide-react';

// Data for the interpretation table (as requested)
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
      alert('Form data is not available to generate a PDF.');
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = 0;

    const themeColor = [98, 0, 238];

    const sanitizeText = (text) => {
      if (!text) return '';
      return text.replace(/₹/g, 'Rs.').replace(/\s+/g, ' ').trim();
    };

    const addHeader = () => {
      doc.setFillColor(242, 237, 255);
      doc.rect(0, 0, margin + 5, pageHeight, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Your Breast Cancer Risk Assessment Summary', margin + 10, 18);
      doc.setDrawColor(...themeColor);
      doc.setLineWidth(0.4);
      doc.line(margin + 10, 20, pageWidth - margin, 20);
      y = 32;
    };

    const addFooter = (pageNumber, totalPages) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150);
      const footerText = `Page ${pageNumber} of ${totalPages} | Generated: ${new Date().toLocaleDateString()}`;
      doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
    };

    const addPageWithTemplate = () => {
      const currentPage = doc.internal.getNumberOfPages();
      const totalPagesGuess = currentPage + 1;
      addFooter(currentPage, totalPagesGuess);
      doc.addPage();
      addHeader();
    };

    const renderSectionHeader = (title) => {
      if (y > pageHeight - 40) addPageWithTemplate();
      y += 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...themeColor);
      doc.text(title, margin + 10, y);
      y += 8;
    };

    // ✅ FIXED version of renderQAPair (rest of code unchanged)
    const renderQAPair = (questionText, answerText) => {
      const qaMargin = margin + 15;
      const qaWidth = pageWidth - qaMargin - margin - 5;

      const question = sanitizeText(`Q: ${questionText}`);
      const answer = sanitizeText(`A: ${answerText}`);

      const questionLines = doc.splitTextToSize(question, qaWidth);
      const answerLines = doc.splitTextToSize(answer, qaWidth - 5);

      const lineHeight = 5.5;
      const questionHeight = questionLines.length * lineHeight;
      const answerHeight = answerLines.length * lineHeight;
      const boxPadding = 8;
      const totalBoxHeight = questionHeight + answerHeight + boxPadding + 6;

      if (y + totalBoxHeight > pageHeight - 20) {
        addPageWithTemplate();
      }

      doc.setFillColor(253, 253, 253);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin + 10, y, pageWidth - (margin * 2) - 10, totalBoxHeight, 2, 2, 'FD');

      let textY = y + 8;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      questionLines.forEach((line) => {
        doc.text(line, qaMargin, textY);
        textY += lineHeight;
      });

      textY += 1;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      answerLines.forEach((line) => {
        doc.text(line, qaMargin + 5, textY);
        textY += lineHeight;
      });

      y += totalBoxHeight + 6;
    };
    // ✅ FIX END

    addHeader();

    if (score !== null) {
      doc.setFillColor(240, 230, 255);
      doc.roundedRect(margin + 10, y, pageWidth - (margin * 2) - 10, 22, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text('Your Estimated Lifetime Risk Score:', margin + 15, y + 13);
      doc.setFontSize(20);
      doc.setTextColor(...themeColor);
      doc.text(`${score}`, pageWidth - margin - 15, y + 15, { align: 'right' });
      y += 32;
    }

    if (score !== null) {
      if (y > pageHeight - 60) addPageWithTemplate();
      renderSectionHeader("What Your Risk Score Means");

      const tableStartY = y;
      const cellPadding = 3;
      const headerFontSize = 9;
      const rowFontSize = 8;
      const colWidths = [35, 30, (pageWidth - margin * 2 - 10 - 35 - 30) / 2, (pageWidth - margin * 2 - 10 - 35 - 30) / 2];
      const tableWidth = colWidths.reduce((a, b) => a + b, 0);
      const tableX = margin + 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(headerFontSize);
      doc.setFillColor(230, 230, 250);
      doc.setTextColor(40, 40, 40);
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.2);
      doc.rect(tableX, y, tableWidth, 9, 'FD');

      let currentX = tableX + cellPadding;
      const headerY = y + 6;
      doc.text('Risk Level', currentX, headerY); currentX += colWidths[0];
      doc.text('Score Range', currentX, headerY); currentX += colWidths[1];
      doc.text('What It Means', currentX, headerY); currentX += colWidths[2];
      doc.text('What To Do', currentX, headerY);
      y += 9;

      riskInterpretationData.forEach((row, index) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(rowFontSize);
        doc.setTextColor(80, 80, 80);

        const levelLines = doc.splitTextToSize(row.level, colWidths[0] - cellPadding * 2);
        const rangeLines = doc.splitTextToSize(row.range, colWidths[1] - cellPadding * 2);
        const meaningLines = doc.splitTextToSize(row.meaning, colWidths[2] - cellPadding * 2);
        const actionLines = doc.splitTextToSize(row.action, colWidths[3] - cellPadding * 2);

        const lineHeight = 4.5;
        const rowHeight = Math.max(levelLines.length, rangeLines.length, meaningLines.length, actionLines.length) * lineHeight + (cellPadding * 2);

        if (y + rowHeight > pageHeight - 20) {
          addPageWithTemplate();
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(headerFontSize);
          doc.setFillColor(230, 230, 250);
          doc.setTextColor(40, 40, 40);
          doc.setDrawColor(180, 180, 180);
          doc.setLineWidth(0.2);
          doc.rect(tableX, y, tableWidth, 9, 'FD');
          currentX = tableX + cellPadding;
          doc.text('Risk Level', currentX, y + 6); currentX += colWidths[0];
          doc.text('Score Range', currentX, y + 6); currentX += colWidths[1];
          doc.text('What It Means', currentX, y + 6); currentX += colWidths[2];
          doc.text('What To Do', currentX, y + 6);
          y += 9;
        }

        if (index % 2 !== 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(tableX, y, tableWidth, rowHeight, 'F');
        }

        let textY = y + cellPadding + 3;
        currentX = tableX + cellPadding;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(rowFontSize);
        doc.text(levelLines, currentX, textY);
        currentX += colWidths[0];
        doc.setFont('helvetica', 'normal');
        doc.text(rangeLines, currentX, textY);
        currentX += colWidths[1];
        doc.text(meaningLines, currentX, textY);
        currentX += colWidths[2];
        doc.text(actionLines, currentX, textY);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(tableX, y, tableWidth, rowHeight);
        let lineX = tableX;
        for (let i = 0; i < colWidths.length; i++) {
          lineX += colWidths[i];
          if (i < colWidths.length - 1) {
            doc.line(lineX, y, lineX, y + rowHeight);
          }
        }
        y += rowHeight;
      });
      y += 10;
    }

    let mainQuestionCounter = 0;
    formStructure.forEach((section) => {
      const questionsToRender = [];
      const findAnsweredQuestions = (questions, parentNumber) => {
        questions.forEach((qConfig, index) => {
          const name = qConfig.name || qConfig.key; const answer = formData[name];
          let displayNumber;
          if (parentNumber) displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}`;
          else { mainQuestionCounter++; displayNumber = mainQuestionCounter; }
          if (answer !== undefined && answer !== null && answer !== '' && (!Array.isArray(answer) || answer.length > 0)) {
            questionsToRender.push({
              text: `${displayNumber}. ${questionnaireData[qConfig.key]?.question}`,
              answer: Array.isArray(answer) ? answer.join(', ') : answer.toString(),
            });
          }
          if (qConfig.subQuestions && qConfig.condition && formData[qConfig.condition.key] === qConfig.condition.value) {
            findAnsweredQuestions(qConfig.subQuestions, displayNumber);
          }
        });
      };
      findAnsweredQuestions(section.questions);

      if (questionsToRender.length > 0) {
        renderSectionHeader(section.title);
        questionsToRender.forEach((qa) => renderQAPair(qa.text, qa.answer));
      }
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i, totalPages);
    }

    doc.save('Breast-Cancer-Risk-Summary.pdf');
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
            <Download size={18} style={{ marginRight: '8px' }} />
            Download Summary (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
