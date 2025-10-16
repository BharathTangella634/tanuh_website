// backend/read_data.js
// A simple script to connect to the database and view the latest submissions.
// Run from the backend folder: node read_data.js

import { getPool, closePool } from '../mysql_explorer/db.js';

async function viewData() {
    const pool = getPool();
    console.log('✅ Connecting to the database to fetch data...');

    try {
        // --- Query 1: Get the 10 most recent sessions ---
        console.log('\n--- 1. Fetching recent sessions from session_table ---');
        const [sessions] = await pool.query(
            'SELECT session_id, ip_address, session_start_time, session_end_time FROM session_table ORDER BY session_start_time DESC LIMIT 10'
        );

        if (sessions.length === 0) {
            console.log('No sessions found in the database yet.');
            return; // Exit if there's nothing to show
        }

        console.log('Displaying the 10 most recent sessions:');
        console.table(sessions); // console.table() provides a nice formatted view


        // --- Query 2: Get all answers for the single MOST recent session ---
        const mostRecentSessionId = sessions[0].session_id;
        console.log(`\n--- 2. Fetching all answers for the most recent session (${mostRecentSessionId}) ---`);
        
        const [answers] = await pool.query(
            'SELECT question, answer, created_at FROM session_data_table WHERE session_id = ? ORDER BY created_at ASC',
            [mostRecentSessionId]
        );

        if (answers.length > 0) {
            console.log(`Displaying ${answers.length} answers for the latest session:`);
            console.table(answers);
        } else {
            console.log('No answers found for the most recent session.');
        }

    } catch (err) {
        console.error('❌ An error occurred while fetching data:', err);
    } finally {
        // IMPORTANT: Always close the connection pool when done.
        await closePool();
        console.log('\n✅ Database connection closed.');
    }
}

// Run the main function
viewData();