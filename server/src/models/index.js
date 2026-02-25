const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash',
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'student',
    },
    avatarUrl: {
        type: DataTypes.STRING,
        field: 'avatar_url',
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.STRING,
        defaultValue: 'beginner',
    },
    langPreference: {
        type: DataTypes.STRING,
        defaultValue: 'en',
        field: 'lang_preference',
    },
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
});

const RefreshToken = sequelize.define('RefreshToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
    },
}, {
    tableName: 'refresh_tokens',
    timestamps: true,
    underscored: true,
});

// Course models
const Course = sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titleTj: { type: DataTypes.STRING, allowNull: false, field: 'title_tj' },
    titleRu: { type: DataTypes.STRING, allowNull: false, field: 'title_ru' },
    titleEn: { type: DataTypes.STRING, field: 'title_en' },
    descriptionTj: { type: DataTypes.TEXT, field: 'description_tj' },
    descriptionRu: { type: DataTypes.TEXT, field: 'description_ru' },
    descriptionEn: { type: DataTypes.TEXT, field: 'description_en' },
    category: { type: DataTypes.STRING },
    thumbnail: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    published: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'courses', timestamps: true, underscored: true });

const Chapter = sequelize.define('Chapter', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titleTj: { type: DataTypes.STRING, allowNull: false, field: 'title_tj' },
    titleRu: { type: DataTypes.STRING, allowNull: false, field: 'title_ru' },
    titleEn: { type: DataTypes.STRING, field: 'title_en' },
    orderNum: { type: DataTypes.INTEGER, defaultValue: 0, field: 'order_num' },
}, { tableName: 'chapters', timestamps: true, underscored: true });

const Section = sequelize.define('Section', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titleTj: { type: DataTypes.STRING, allowNull: false, field: 'title_tj' },
    titleRu: { type: DataTypes.STRING, allowNull: false, field: 'title_ru' },
    titleEn: { type: DataTypes.STRING, field: 'title_en' },
    contentTj: { type: DataTypes.TEXT, field: 'content_tj' },
    contentRu: { type: DataTypes.TEXT, field: 'content_ru' },
    contentEn: { type: DataTypes.TEXT, field: 'content_en' },
    orderNum: { type: DataTypes.INTEGER, defaultValue: 0, field: 'order_num' },
    isLocked: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_locked' },
}, { tableName: 'sections', timestamps: true, underscored: true });

const Activity = sequelize.define('Activity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    dataJson: { type: DataTypes.TEXT, field: 'data_json' },
    xpReward: { type: DataTypes.INTEGER, defaultValue: 10, field: 'xp_reward' },
    orderNum: { type: DataTypes.INTEGER, defaultValue: 0, field: 'order_num' },
}, { tableName: 'activities', timestamps: true, underscored: true });

const UserProgress = sequelize.define('UserProgress', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    score: { type: DataTypes.INTEGER },
    completedAt: { type: DataTypes.DATE, field: 'completed_at' },
}, { tableName: 'user_progress', timestamps: true, underscored: true });

const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    enrolledAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'enrolled_at' },
}, { tableName: 'enrollments', timestamps: true, underscored: true });

// Associations
User.hasMany(RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Course, { foreignKey: 'instructor_id' });
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructor_id' });

Course.hasMany(Chapter, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Chapter.belongsTo(Course, { foreignKey: 'course_id' });

Chapter.hasMany(Section, { foreignKey: 'chapter_id', onDelete: 'CASCADE' });
Section.belongsTo(Chapter, { foreignKey: 'chapter_id' });

Section.hasMany(Activity, { foreignKey: 'section_id', onDelete: 'CASCADE' });
Activity.belongsTo(Section, { foreignKey: 'section_id' });

User.hasMany(UserProgress, { foreignKey: 'user_id' });
Activity.hasMany(UserProgress, { foreignKey: 'activity_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });
UserProgress.belongsTo(Activity, { foreignKey: 'activity_id' });

User.belongsToMany(Course, { through: Enrollment, foreignKey: 'user_id' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'course_id' });

module.exports = {
    User,
    RefreshToken,
    Course,
    Chapter,
    Section,
    Activity,
    UserProgress,
    Enrollment,
    sequelize,
};
