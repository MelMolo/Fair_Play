const Joi = require('joi');
const { Comment, Report, User } = require('../models');

const commentSchema = Joi.object({
  content: Joi.string().max(1000).required()
});

const getComments = async (req, res) => {
  try {
    const categories = await Comment.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createComment = async (req, res) => {
  try {
    const { id: report_id } = req.params;
    const { error } = commentSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const report = await Report.findByPk(report_id);
    if (!report || report.status !== 'validated') {
      return res.status(404).json({ message: 'Signalement non trouvé ou non validé' });
    }

    const { content } = req.body;
    const comment = await Comment.create({
      report_id,
      user_id: req.user.id,
      content
    });

    res.status(201).json({ message: 'Commentaire créé', comment });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });

    await comment.update({ status });
    res.status(200).json({ message: 'Commentaire mis à jour', comment });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });

    await comment.destroy();
    res.status(200).json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getComments, createComment, updateComment, deleteComment };