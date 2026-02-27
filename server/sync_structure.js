const { sequelize, Course, Chapter, Section, Activity } = require('./src/models');

const COURSE_DATA = {
    title: 'Introduction to Python',
    chapters: [
        {
            id: 'intro', title: 'Python Introduction',
            sections: [{
                id: 'intro-what', title: 'What is Python?',
            }],
        },
        {
            id: 'getstarted', title: 'Python Getting Started',
            sections: [{
                id: 'getstarted-all', title: 'Get Started With Python',
            }],
        },
        {
            id: 'syntax', title: 'Python Syntax',
            sections: [
                { id: 'syntax-main', title: 'Syntax' },
                { id: 'syntax-statements', title: 'Statements' },
                { id: 'syntax-challenge', title: 'Code Challenge' }
            ],
        },
        {
            id: 'output', title: 'Python Output / Print',
            sections: [
                { id: 'output-text', title: 'Print Text' },
                { id: 'output-numbers', title: 'Print Numbers' },
                { id: 'output-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'comments', title: 'Python Comments',
            sections: [
                { id: 'comments-main', title: 'Comments' },
                { id: 'comments-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'variables', title: 'Python Variables',
            sections: [
                { id: 'variables-intro', title: 'Python Variables' },
                { id: 'variables-names', title: 'Variable Names' },
                { id: 'variables-multi', title: 'Assign Multiple Values' },
                { id: 'variables-output', title: 'Output Variables' },
                { id: 'variables-global', title: 'Global Variables' },
                { id: 'variables-exercises', title: 'Variable Exercises' },
                { id: 'variables-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'casting', title: 'Python Casting',
            sections: [
                { id: 'casting-specify', title: 'Specify a Variable Type' },
                { id: 'casting-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'operators', title: 'Python Operators',
            sections: [
                { id: 'operators-arithmetic', title: 'Arithmetic Operators' },
                { id: 'operators-arithmetic-challenge', title: 'Arithmetic Challenge' },
                { id: 'operators-assignment', title: 'Assignment Operators' },
                { id: 'operators-comparison', title: 'Comparison Operators' },
                { id: 'operators-logical', title: 'Logical Operators' },
                { id: 'operators-identity', title: 'Identity Operators' },
                { id: 'operators-membership', title: 'Membership Operators' },
                { id: 'operators-precedence', title: 'Operator Precedence' },
                { id: 'operators-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'strings', title: 'Python Strings',
            sections: [
                { id: 'strings-basics', title: 'String Basics' },
                { id: 'strings-slicing', title: 'Slicing Strings' },
                { id: 'strings-modify', title: 'Modify Strings' },
                { id: 'strings-concat', title: 'String Concatenation' },
                { id: 'strings-formatting', title: 'Format Strings' },
                { id: 'strings-escape', title: 'Escape Characters' },
                { id: 'strings-methods', title: 'String Methods' },
                { id: 'strings-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'lists', title: 'Python Lists',
            sections: [
                { id: 'lists-intro', title: 'Python Lists' },
                { id: 'lists-access', title: 'Access List Items' },
                { id: 'lists-change', title: 'Change List Items' },
                { id: 'lists-add', title: 'Add List Items' },
                { id: 'lists-remove', title: 'Remove List Items' },
                { id: 'lists-loop', title: 'Loop Lists' },
                { id: 'lists-comprehension', title: 'List Comprehension' },
                { id: 'lists-sort', title: 'Sort Lists' },
                { id: 'lists-copy', title: 'Copy Lists' },
                { id: 'lists-join', title: 'Join Lists' },
                { id: 'lists-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'conditions', title: 'Python If...Else',
            sections: [
                { id: 'conditions-if', title: 'If Statements' },
                { id: 'conditions-shorthand', title: 'Short Hand If / Else' },
                { id: 'conditions-logical', title: 'Logical Conditions' },
                { id: 'conditions-nested', title: 'Nested If' },
                { id: 'conditions-pass', title: 'The pass Statement' },
                { id: 'conditions-challenge', title: 'Code Challenge' }
            ]
        },
        {
            id: 'loops', title: 'Python Loops',
            sections: [
                { id: 'loops-for', title: 'For Loops' },
                { id: 'loops-while', title: 'While Loops' }
            ],
        },
        {
            id: 'functions', title: 'Python Functions',
            sections: [
                { id: 'functions-def', title: 'Creating Functions' }
            ],
        },
        {
            id: 'dictionaries', title: 'Python Dictionaries',
            sections: [
                { id: 'dict-basics', title: 'Dictionary Basics' }
            ],
        },
    ],
};

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Find or create Python course
        let [course] = await Course.findOrCreate({
            where: { id: 1 },
            defaults: {
                titleEn: 'Introduction to Python',
                titleRu: 'Введение в Python',
                titleTj: 'Муқаддима ба Python',
                published: true
            }
        });

        // Delete existing chapters to re-sync
        await Chapter.destroy({ where: { course_id: course.id } });
        console.log('Cleanup complete.');

        for (let i = 0; i < COURSE_DATA.chapters.length; i++) {
            const chData = COURSE_DATA.chapters[i];
            const chapter = await Chapter.create({
                course_id: course.id,
                titleEn: chData.title,
                titleRu: chData.title, // Placeholder
                titleTj: chData.title, // Placeholder
                orderNum: i
            });

            for (let j = 0; j < chData.sections.length; j++) {
                const sData = chData.sections[j];
                const section = await Section.create({
                    chapter_id: chapter.id,
                    titleEn: sData.title,
                    titleRu: sData.title, // Placeholder
                    titleTj: sData.title, // Placeholder
                    orderNum: j
                });

                // In this model, 1 frontend "section" maps to 1 backend "activity"
                await Activity.create({
                    section_id: section.id,
                    slug: sData.id,
                    type: sData.id.includes('challenge') ? 'challenge' : 'lesson',
                    orderNum: 0
                });
            }
        }

        console.log('Sync complete.');
    } catch (err) {
        console.error(err);
    }
}

module.exports = sync;
