


import React from 'react';
import './ThankYou.css';
import { formStructure } from './Questionnaire'; 
import jsPDF from 'jspdf';
import { Download, CheckCircle } from 'lucide-react'; // ✅ Added icons

function ThankYou({ riskResult, formData, questionnaireData }) {

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
      return text.replace(/[₹]/g, 'Rs.').replace(/\s+/g, ' ').trim();
    };

    const addHeader = () => {
      doc.setFillColor(242, 237, 255);
      doc.rect(0, 0, margin + 5, pageHeight, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Your Breast Cancer Risk Assessment', margin + 10, 18);
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

    const renderQAPair = (questionText, answerText) => {
      const qaMargin = margin + 15;
      const qaWidth = pageWidth - qaMargin - margin - 10;

      const question = sanitizeText(`Q: ${questionText}`);
      const answer = sanitizeText(`A: ${answerText}`);

      const questionLines = doc.splitTextToSize(question, qaWidth - 5);
      const answerLines = doc.splitTextToSize(answer, qaWidth - 10);

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

    addHeader();

    if (riskResult !== null) {
      doc.setFillColor(240, 230, 255);
      doc.roundedRect(margin + 10, y, pageWidth - (margin * 2) - 10, 22, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text('Your Estimated Lifetime Risk:', margin + 15, y + 12);
      doc.setFontSize(18);
      doc.setTextColor(...themeColor);
      doc.text(`${riskResult}%`, pageWidth - margin - 15, y + 14, { align: 'right' });
      y += 32;
    }

    let mainQuestionCounter = 0;

    formStructure.forEach((section) => {
      const questionsToRender = [];

      const findAnsweredQuestions = (questions, parentNumber) => {
        questions.forEach((qConfig, index) => {
          const name = qConfig.name || qConfig.key;
          const answer = formData[name];

          let displayNumber;
          if (parentNumber) {
            displayNumber = `${parentNumber}${String.fromCharCode(97 + index)}`;
          } else {
            mainQuestionCounter++;
            displayNumber = mainQuestionCounter;
          }

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
          <CheckCircle className="success-icon" size={40} color="#6200EE" />
          <h3>Submission Complete</h3>
        </div>
        <p>Thank you for completing the questionnaire!</p>
        {riskResult !== null && (
          <div className="risk-result-container">
            <p>Your estimated lifetime risk of breast cancer is:</p>
            <h2 className="risk-percentage">{riskResult}%</h2>
          </div>
        )}
        <div className="action-buttons">
          <button className="ok-button" onClick={() => window.location.reload()}>Ok</button>
          <button className="download-button" onClick={handleDownloadPdf}>
            <Download size={40} style={{ marginRight: '8px' }} /> Download Summary (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
