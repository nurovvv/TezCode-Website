const bcrypt = require('bcryptjs');
const { User } = require('./models');

async function seedUsers() {
    try {
        // Check if demo user already exists
        const existingUser = await User.findOne({ where: { email: 'demo@tezcode.com' } });
        
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('demo123456', 12);
            await User.create({
                name: 'Demo User',
                username: 'demo',
                email: 'demo@tezcode.com',
                passwordHash: hashedPassword,
                role: 'student',
                xp: 0,
                level: 1,
            });
            console.log('✅ Demo user created: demo@tezcode.com / demo123456');
        } else {
            console.log('✅ Demo user already exists');
        }
    } catch (err) {
        console.error('Failed to seed users:', err.message);
    }
}

module.exports = seedUsers;
