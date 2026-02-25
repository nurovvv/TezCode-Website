const express = require('express');
const { Course, Chapter, Section, Activity, Enrollment, User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: { published: true },
            include: [
                { model: User, as: 'instructor', attributes: ['id', 'name'] },
                { model: Chapter, attributes: ['id'] },
            ],
            order: [['created_at', 'DESC']],
        });

        const result = courses.map(c => ({
            ...c.toJSON(),
            chapterCount: c.Chapters?.length || 0,
        }));

        res.json(result);
    } catch (err) {
        console.error('Get courses error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single course with chapters and sections
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            include: [
                { model: User, as: 'instructor', attributes: ['id', 'name'] },
                {
                    model: Chapter,
                    include: [{
                        model: Section,
                        include: [{ model: Activity }],
                        order: [['order_num', 'ASC']],
                    }],
                    order: [['order_num', 'ASC']],
                },
            ],
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (err) {
        console.error('Get course error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create course (teacher/admin only)
router.post('/', authenticate, authorize('teacher', 'admin'), async (req, res) => {
    try {
        const course = await Course.create({
            ...req.body,
            instructor_id: req.user.id,
        });
        res.status(201).json(course);
    } catch (err) {
        console.error('Create course error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Enroll in course
router.post('/:id/enroll', authenticate, async (req, res) => {
    try {
        const [enrollment, created] = await Enrollment.findOrCreate({
            where: { user_id: req.user.id, course_id: req.params.id },
        });
        res.json({ enrolled: true, created });
    } catch (err) {
        console.error('Enroll error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
