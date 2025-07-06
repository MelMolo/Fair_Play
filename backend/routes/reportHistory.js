const express = require('express');
const { getReportHistory } = require('../controllers/reportHistoryController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/:report_id', authenticate, authorize(['moderator', 'admin']), getReportHistory);

module.exports = router;