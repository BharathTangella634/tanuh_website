// import express from 'express';
// import cors from 'cors';
// import { v4 as uuidv4 } from 'uuid';
// // Correctly import the getPool function from your existing db.js
// import { getPool } from '../mysql_explorer/db.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors()); // Allow requests from your React frontend
// app.use(express.json()); // Allow the server to parse JSON body

// // The main API endpoint for submitting the questionnaire
// app.post('/api/submit', async (req, res) => {
//     const formData = req.body;
//     console.log('Received form data:', formData);

//     const pool = getPool();
//     let connection; 

//     try {
//         connection = await pool.getConnection();
//         await connection.beginTransaction();

//         // --- 1. Create a new session in the session_table ---
//         const sessionId = uuidv4();
//         const sessionStartTime = new Date();
//         const sessionSql = 'INSERT INTO session_table (session_id, session_start_time) VALUES (?, ?)';
//         await connection.query(sessionSql, [sessionId, sessionStartTime]);
//         console.log(`✅ Session created with ID: ${sessionId}`);

//         // --- 2. Loop through form data and insert each answer ---
//         const answerPromises = [];
//         for (const questionKey in formData) {
//             if (Object.prototype.hasOwnProperty.call(formData, questionKey)) {
//                 const answerValue = formData[questionKey];
                
//                 // *** THE FIX IS HERE ***
//                 // We now generate a unique ID for every single answer row.
//                 const sessionDataId = uuidv4(); 
                
//                 const finalAnswer = Array.isArray(answerValue) ? answerValue.join(', ') : answerValue;

//                 // The INSERT statement now includes the session_data_id.
//                 const answerSql = 'INSERT INTO session_data_table (session_data_id, session_id, question, answer, created_at) VALUES (?, ?, ?, ?, ?)';
//                 answerPromises.push(
//                     connection.query(answerSql, [sessionDataId, sessionId, questionKey, finalAnswer, new Date()])
//                 );
//             }
//         }

//         await Promise.all(answerPromises);
//         console.log(`✅ Inserted ${answerPromises.length} answers for session ${sessionId}`);

//         await connection.commit();
//         console.log('✅ Transaction committed successfully.');

//         res.status(200).json({ success: true, message: 'Questionnaire submitted successfully!' });

//     } catch (err) {
//         if (connection) {
//             await connection.rollback();
//             console.error('❌ Transaction rolled back due to an error.');
//         }
//         console.error('❌ Error during database insertion:', err);
//         res.status(500).json({ success: false, message: 'Database insertion failed' });
//     } finally {
//         if (connection) {
//             connection.release();
//             console.log('✅ Connection released back to the pool.');
//         }
//     }
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { getPool } from '../mysql_explorer/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.set('trust proxy', true); // Necessary for accurately getting IP address

// === NEW ENDPOINT: To start a session ===
app.post('/api/session/start', async (req, res) => {
    const pool = getPool();
    const sessionId = uuidv4();
    const sessionStartTime = new Date();
    const ipAddress = req.ip; // Get user's IP address

    console.log(`🚀 Starting new session for IP: ${ipAddress}`);

    try {
        const sessionSql = 'INSERT INTO session_table (session_id, ip_address, session_start_time) VALUES (?, ?, ?)';
        await pool.query(sessionSql, [sessionId, ipAddress, sessionStartTime]);
        
        console.log(`✅ Session created with ID: ${sessionId}`);
        // Send the new session ID back to the frontend
        res.status(200).json({ success: true, sessionId: sessionId });

    } catch (err) {
        console.error('❌ Error creating session:', err);
        res.status(500).json({ success: false, message: 'Failed to create a session.' });
    }
});

// === MODIFIED ENDPOINT: To submit the answers for an existing session ===
app.post('/api/submit', async (req, res) => {
    // The frontend will now send both the sessionId and the formData
    const { sessionId, formData } = req.body; 

    if (!sessionId || !formData) {
        return res.status(400).json({ success: false, message: 'Session ID and form data are required.' });
    }

    console.log(`Received submission for session ID: ${sessionId}`);
    
    const pool = getPool();
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Loop through form data and insert each answer
        const answerPromises = [];
        for (const questionKey in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, questionKey)) {
                const answerValue = formData[questionKey];
                const sessionDataId = uuidv4();
                const finalAnswer = Array.isArray(answerValue) ? answerValue.join(', ') : answerValue;
                
                const answerSql = 'INSERT INTO session_data_table (session_data_id, session_id, question, answer, created_at) VALUES (?, ?, ?, ?, ?)';
                answerPromises.push(
                    connection.query(answerSql, [sessionDataId, sessionId, questionKey, finalAnswer, new Date()])
                );
            }
        }
        await Promise.all(answerPromises);
        console.log(`✅ Inserted ${answerPromises.length} answers for session ${sessionId}`);

        // Update the session_end_time for the existing session
        const updateSessionSql = 'UPDATE session_table SET session_end_time = ? WHERE session_id = ?';
        await connection.query(updateSessionSql, [new Date(), sessionId]);
        console.log(`✅ Finalized session ${sessionId}`);
        
        await connection.commit();
        res.status(200).json({ success: true, message: 'Questionnaire submitted successfully!' });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error('❌ Error during database submission:', err);
        res.status(500).json({ success: false, message: 'Database submission failed' });
    } finally {
        if (connection) connection.release();
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
