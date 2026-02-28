const { User, ChallengeSubmission, Challenge, sequelize } = require('./src/models');

async function recalculateXP() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database for recalculation.');

        const users = await User.findAll();
        console.log(`Found ${users.length} users to process.`);

        const allChallenges = await Challenge.findAll();
        const xpMap = {};
        allChallenges.forEach(c => {
            xpMap[c.id] = c.xpReward;
        });

        for (const user of users) {
            // Find all unique challenges passed by this user
            const passedSubmissions = await ChallengeSubmission.findAll({
                where: { user_id: user.id, status: 'passed' },
                attributes: ['challenge_id'],
                group: ['challenge_id'] // Get only unique challenge IDs
            });

            let calculatedXP = 0;

            // Add up XP from all unique challenges passed
            for (const sub of passedSubmissions) {
                const reward = xpMap[sub.challenge_id];
                if (reward) calculatedXP += reward;
            }

            console.log(`User ${user.username} (${user.id}): Old XP = ${user.xp}, New Calculated XP = ${calculatedXP}`);

            // Optional: If you had progress from activities, you would add that here.
            // Assuming for this quick fix we just want to ensure challenge XP is fully accounted for
            // If calculatedXP is > current XP, let's update it to ensure they get their missing points
            // Alternatively, just force it to the calculated XP if challenges are the only source of XP right now.
            if (calculatedXP > user.xp) {
                user.xp = calculatedXP;
                await user.save();
                console.log(`-> Updated user ${user.username} to ${calculatedXP} XP.`);
            }
        }

        console.log('Recalculation complete.');
    } catch (err) {
        console.error('Error recalculating XP:', err);
    }
}

recalculateXP().then(() => process.exit(0));
