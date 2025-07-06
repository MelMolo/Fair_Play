const express = require('express');
const { createReport, getReports, getReportById, updateReport, deleteReport } = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const router = express.Router();

router.post('/', authenticate, upload.single('attachment'), createReport);
router.get('/', getReports); // Public pour signalements validés
router.get('/:id', getReportById); // Public pour signalements validés
router.put('/:id', authenticate, authorize(['moderator', 'admin']), upload.single('attachment'), updateReport);
router.delete('/:id', authenticate, authorize(['moderator', 'admin']), deleteReport);

module.exports = router;