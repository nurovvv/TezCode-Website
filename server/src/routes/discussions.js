const express = require('express');
const router = express.Router();
const { ChallengeComment, CommentLike, User, Challenge } = require('../models');
const { authenticate, authenticateOptional } = require('../middleware/auth');

// Get all comments for a challenge
router.get('/:id/discussions', authenticateOptional, async (req, res) => {
    try {
        const comments = await ChallengeComment.findAll({
            where: {
                challenge_id: req.params.id,
                parent_id: null  // Only top-level comments
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'avatarUrl']
                },
                {
                    model: CommentLike,
                    attributes: ['id', 'user_id']
                },
                {
                    model: ChallengeComment,
                    as: 'replies',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'username', 'avatarUrl']
                        },
                        {
                            model: CommentLike,
                            attributes: ['id', 'user_id']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC'], [{ model: ChallengeComment, as: 'replies' }, 'createdAt', 'ASC']]
        });

        // Format response with like counts and user's like status
        const formatted = comments.map(comment => formatComment(comment, req.user?.id));
        res.json(formatted);
    } catch (err) {
        console.error('Error fetching discussions:', err);
        res.status(500).json({ message: 'Failed to fetch discussions' });
    }
});

// Post a new comment
router.post('/:id/discussions', authenticate, async (req, res) => {
    try {
        const { content, parentId } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Comment content is required' });
        }

        if (content.length > 2000) {
            return res.status(400).json({ message: 'Comment must be under 2000 characters' });
        }

        // Verify challenge exists
        const challenge = await Challenge.findByPk(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        // Verify parent comment exists if replying
        if (parentId) {
            const parent = await ChallengeComment.findByPk(parentId);
            if (!parent || parent.challenge_id !== challenge.id) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
        }

        const comment = await ChallengeComment.create({
            content: content.trim(),
            user_id: req.user.id,
            challenge_id: challenge.id,
            parent_id: parentId || null
        });

        // Fetch the created comment with user info
        const fullComment = await ChallengeComment.findByPk(comment.id, {
            include: [
                { model: User, attributes: ['id', 'username', 'avatarUrl'] },
                { model: CommentLike, attributes: ['id', 'user_id'] },
                {
                    model: ChallengeComment, as: 'replies', include: [
                        { model: User, attributes: ['id', 'username', 'avatarUrl'] },
                        { model: CommentLike, attributes: ['id', 'user_id'] }
                    ]
                }
            ]
        });

        res.status(201).json(formatComment(fullComment, req.user.id));
    } catch (err) {
        console.error('Error posting comment:', err);
        res.status(500).json({ message: 'Failed to post comment' });
    }
});

// Toggle like on a comment
router.post('/:id/discussions/:commentId/like', authenticate, async (req, res) => {
    try {
        const existing = await CommentLike.findOne({
            where: {
                user_id: req.user.id,
                comment_id: req.params.commentId
            }
        });

        if (existing) {
            await existing.destroy();
            res.json({ liked: false });
        } else {
            // Verify comment exists
            const comment = await ChallengeComment.findByPk(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            await CommentLike.create({
                user_id: req.user.id,
                comment_id: req.params.commentId
            });
            res.json({ liked: true });
        }
    } catch (err) {
        console.error('Error toggling like:', err);
        res.status(500).json({ message: 'Failed to toggle like' });
    }
});

// Delete own comment
router.delete('/:id/discussions/:commentId', authenticate, async (req, res) => {
    try {
        const comment = await ChallengeComment.findByPk(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user_id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        // Delete all likes and replies first
        await CommentLike.destroy({ where: { comment_id: comment.id } });
        // Delete replies' likes too
        const replies = await ChallengeComment.findAll({ where: { parent_id: comment.id } });
        for (const reply of replies) {
            await CommentLike.destroy({ where: { comment_id: reply.id } });
        }
        await ChallengeComment.destroy({ where: { parent_id: comment.id } });
        await comment.destroy();

        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
});

// Helper to format a comment for the API response
function formatComment(comment, currentUserId) {
    const json = comment.toJSON();
    return {
        id: json.id,
        content: json.content,
        createdAt: json.createdAt,
        user: json.User,
        likeCount: json.CommentLikes ? json.CommentLikes.length : 0,
        liked: currentUserId ? (json.CommentLikes || []).some(l => l.user_id === currentUserId) : false,
        replies: (json.replies || []).map(reply => ({
            id: reply.id,
            content: reply.content,
            createdAt: reply.createdAt,
            user: reply.User,
            likeCount: reply.CommentLikes ? reply.CommentLikes.length : 0,
            liked: currentUserId ? (reply.CommentLikes || []).some(l => l.user_id === currentUserId) : false,
        }))
    };
}

module.exports = router;
