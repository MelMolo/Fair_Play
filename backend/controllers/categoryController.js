const Joi = require('joi');
const { Category } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(1000).allow('')
});

const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, description } = req.body;
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) return res.status(400).json({ message: 'Catégorie déjà existante' });

    const category = await Category.create({ name, description });
    res.status(201).json({ message: 'Catégorie créée', category });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, description } = req.body;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });

    await category.update({ name, description });
    res.status(200).json({ message: 'Catégorie mise à jour', category });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée' });

    await category.destroy();
    res.status(200).json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };