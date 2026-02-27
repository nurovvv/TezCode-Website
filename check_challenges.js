const { Challenge } = require('./server/src/models');
const path = require('path');

async function checkChallenges() {
    try {
        const challenges = await Challenge.findAll({
            attributes: ['id', 'title', 'testCases', 'starterCode'],
            limit: 10
        });
        challenges.forEach(c => {
            console.log(`ID: ${c.id}`);
            console.log(`Title: ${c.title}`);
            console.log(`Test Cases: ${JSON.stringify(c.testCases, null, 2)}`);
            console.log('---');
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkChallenges();
