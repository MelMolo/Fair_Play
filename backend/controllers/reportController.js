const Joi = require('joi');
const { Op } = require('sequelize');
const { Report, Category, User } = require('../models');
const { upload, uploadToS3 } = require('../utils/upload');

const reportSchema = Joi.object({
  category_id: Joi.number().integer().required(),
  description: Joi.string().max(1000).required(),
  date: Joi.date().iso().required(),
  location: Joi.string().max(100).required(),
  is_anonymous: Joi.boolean().default(false)
});

const createReport = async (req, res) => {
  try {
    const { error } = reportSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { category_id, description, date, location, is_anonymous } = req.body;
    let attachment_url = null;

    if (req.file) {
      const result = await uploadToS3(req.file);
      attachment_url = result.Location;
    }

    const report = await Report.create({
      user_id: is_anonymous ? null : req.user.id,
      category_id,
      firstName,
      lastName,
      evenment,
      type,
      country,
      description,
      gender,
      statut,
      age,
      date,
      location,
      is_anonymous,
      attachment_url
    });

    res.status(201).json({ message: 'Signalement créé', report });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getReports = async (req, res) => {
  try {
    const { page = 1, limit = 10, category_id, status, q } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category_id) where.category_id = category_id;
    if (status) where.status = status;
    if (q) {
      where[Op.or] = [
        { description: { [Op.like]: `%${q}%` } },
        { location: { [Op.like]: `%${q}%` } }
      ];
    }

    const reports = await Report.findAndCountAll({
      where,
      include: [{ model: Category }, { model: User, attributes: ['username'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      reports: reports.rows,
      total: reports.count,
      page: parseInt(page),
      totalPages: Math.ceil(reports.count / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id, {
      include: [{ model: Category }, { model: User, attributes: ['username'] }]
    });
    if (!report) return res.status(404).json({ message: 'Signalement non trouvé' });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = reportSchema.validate(req.body, { allowUnknown: true });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ message: 'Signalement non trouvé' });

    const updates = { ...req.body };
    if (req.file) {
      const result = await uploadToS3(req.file);
      updates.attachment_url = result.Location;
    }

    await report.update(updates);
    await ReportHistory.create({
      report_id: id,
      user_id: req.user.id,
      action: 'updated',
      details: JSON.stringify(updates)
    });

    res.status(200).json({ message: 'Signalement mis à jour', report });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ message: 'Signalement non trouvé' });

    await report.update({ status: 'deleted' });
    await ReportHistory.create({
      report_id: id,
      user_id: req.user.id,
      action: 'deleted',
      details: 'Suppression logique'
    });

    res.status(200).json({ message: 'Signalement supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createReport, getReports, getReportById, updateReport, deleteReport };