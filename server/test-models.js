
const { User, RefreshToken, sequelize } = require('./src/models');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('DB connected');

        // Find or create test user
        let user = await User.findOne({ where: { email: 'demo@tezcode.com' } });
        if (!user) {
            user = await User.create({
                name: 'Test',
                username: 'test_user_' + Date.now(),
                email: 'demo@tezcode.com',
                passwordHash: 'hash'
            });
        }

        console.log('User found/created:', user.id);

        // Try creating RefreshToken with user_id
        try {
            const rt = await RefreshToken.create({
                user_id: user.id,
                token: 'test_token_' + Date.now(),
                expiresAt: new Date(Date.now() + 1000000)
            });
            console.log('✅ RefreshToken created with user_id:', rt.id);
        } catch (e) {
            console.error('❌ Failed with user_id:', e.message);
        }

        // Try creating RefreshToken with userId
        try {
            const rt = await RefreshToken.create({
                userId: user.id,
                token: 'test_token_2_' + Date.now(),
                expiresAt: new Date(Date.now() + 1000000)
            });
            console.log('✅ RefreshToken created with userId:', rt.id);
        } catch (e) {
            console.error('❌ Failed with userId:', e.message);
        }

        process.exit(0);
    } catch (e) {
        console.error('Fatal:', e);
        process.exit(1);
    }
}

test();
