const express = require('express');
const { createReport, getReports, getReportById, updateReport, deleteReport, deleteAllReports } = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requis' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

router.post('/', authenticate, upload.single('attachment'), createReport);
router.get('/', getReports); // Public pour signalements validés
router.get('/:id', getReportById); // Public pour signalements validés
router.put('/:id', authenticate, authorize(['moderator', 'admin']), upload.single('attachment'), updateReport);
router.delete('/:id', authenticate, authorize(['moderator', 'admin']), deleteReport);
router.delete('/reports', verifyAdmin, deleteAllReports);

module.exports = router;