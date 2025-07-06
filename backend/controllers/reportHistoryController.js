const { ReportHistory, Report, User } = require('../models');

const getReportHistory = async (req, res) => {
  try {
    const { report_id } = req.params;
    const history = await ReportHistory.findAll({
      where: { report_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getReportHistory };