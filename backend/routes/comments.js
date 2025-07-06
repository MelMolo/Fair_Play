const express = require('express');
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/:id/comments', authenticate, createComment);
router.put('/:id', authenticate, authorize(['moderator', 'admin']), updateComment);
router.delete('/:id', authenticate, authorize(['moderator', 'admin']), deleteComment);
router.get('/', getComments);


module.exports = router;