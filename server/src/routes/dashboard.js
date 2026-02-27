const express = require('express');
const { User, UserProgress, Activity, Section, Chapter, Course, Enrollment, ChallengeSubmission } = require('../models');
const { authenticate } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get User Stats
        const user = await User.findByPk(userId, {
            attributes: ['xp', 'level', 'streak', 'lastActivityAt']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 2. Get Course Progress (for the first enrolled course or a specific one)
        // For simplicity, we'll pick the first course the user is enrolled in
        const enrollment = await Enrollment.findOne({
            where: { user_id: userId },
            include: [{
                model: Course,
                include: [{
                    model: Chapter,
                    include: [{
                        model: Section,
                        include: [Activity]
                    }]
                }]
            }]
        });

        let courseStats = null;
        if (enrollment && enrollment.Course) {
            const course = enrollment.Course;
            const allActivities = course.Chapters.flatMap(ch =>
                ch.Sections.flatMap(s => s.Activities)
            );

            const activityIds = allActivities.map(a => a.id);
            const completedCount = await UserProgress.count({
                where: {
                    user_id: userId,
                    activity_id: { [Op.in]: activityIds },
                    completed: true
                }
            });

            courseStats = {
                id: course.id,
                title: course.titleRu || course.titleEn,
                totalActivities: activityIds.length,
                completedActivities: completedCount,
                progress: activityIds.length > 0 ? Math.round((completedCount / activityIds.length) * 100) : 0,
                chapters: await Promise.all(course.Chapters.map(async (ch) => {
                    const chActivities = ch.Sections.flatMap(s => s.Activities);
                    const chActivityIds = chActivities.map(a => a.id);

                    const completedInChapter = await UserProgress.count({
                        where: {
                            user_id: userId,
                            activity_id: { [Op.in]: chActivityIds },
                            completed: true
                        }
                    });

                    return {
                        id: ch.id,
                        title: ch.titleRu || ch.titleEn,
                        completed: chActivityIds.length > 0 && completedInChapter === chActivityIds.length
                    };
                }))
            };
        }

        // 3. Recent Activity
        const recentProgress = await UserProgress.findAll({
            where: { user_id: userId, completed: true },
            limit: 5,
            order: [['completed_at', 'DESC']],
            include: [{
                model: Activity,
                include: [{
                    model: Section,
                    include: [Chapter]
                }]
            }]
        });

        const recentActivities = recentProgress
            .filter(p => p.Activity && p.Activity.Section) // Robustness: skip orphans
            .map(p => {
                const isCourseActivity = ['lesson', 'reading'].includes(p.Activity.type);
                return {
                    text: `Завершен раздел "${p.Activity.Section.titleRu || p.Activity.Section.titleEn}"`,
                    time: p.completedAt,
                    icon: '✅',
                    xp: isCourseActivity ? null : `+${p.Activity.xpReward} XP`
                };
            });

        // 4. Leaderboard (Top 5)
        const topUsers = await User.findAll({
            order: [['xp', 'DESC']],
            limit: 5,
            attributes: ['id', 'name', 'xp']
        });

        const leaderboard = topUsers.map((u, i) => ({
            rank: i + 1,
            name: u.id === userId ? 'Вы' : u.name,
            xp: u.xp,
            isYou: u.id === userId
        }));

        // 5. Achievement Stats
        const totalCompleted = await UserProgress.count({ where: { user_id: userId, completed: true } });
        const hasPerfectScore = await ChallengeSubmission.count({ where: { user_id: userId, status: 'passed' } });

        res.json({
            stats: {
                xp: user.xp,
                level: user.level,
                streak: user.streak,
                progress: courseStats ? courseStats.progress : 0,
                totalCompleted,
                hasPerfectScore: hasPerfectScore > 0
            },
            course: courseStats,
            recentActivities,
            leaderboard
        });

    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ message: 'Failed to load dashboard data' });
    }
});

module.exports = router;
