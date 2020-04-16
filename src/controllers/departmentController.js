const Department = require('../models/Department');
const { Op } = require('sequelize');
const paginate = require('../utils/paginator');
const filtering = require('../utils/filteringQuery');
const ordering = require('../utils/orderingQuery');

module.exports = {
  async show(request, response) {
    try {
      const departments = await Department.findAll({
        where: {
          ...filtering(request.query, {
            name: Op.substring,
            created_at: Op.between,
            updated_at: Op.between,
          }),
        },
        ...ordering(request.query, ['name', 'created_at', 'updated_at']),
        ...paginate(request.query),
      });

      response.header('X-Total-Count', departments.length);

      return response.status(200).json(departments);
    } catch (error) {
      return response.status(500).json({ error: 'Get department list failed' });
    }
  },

  async index(request, response) {
    const { id } = request.params;

    try {
      const department = await Department.findByPk(id);

      return response.status(200).json(department);
    } catch (error) {
      return response.status(500).json({ error: 'Find department failed' });
    }
  },

  async store(request, response) {
    const { name } = request.body;

    try {
      if (await Department.findOne({ where: { name } })) {
        return response
          .status(400)
          .json({ error: 'Department already exists' });
      }

      const department = await Department.create({ name });

      return response.status(201).json(department);
    } catch (error) {
      return response.status(500).json({ error: 'Create departament failed' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      if (!(await Department.findByPk(id))) {
        return response.status(400).json({ error: 'Department not found' });
      }

      if (await Department.findOne({ where: { name, id: { [Op.ne]: id } } })) {
        return response
          .status(400)
          .json({ error: 'Department already exists' });
      }

      await Department.update({ name }, { where: { id } });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Update department failed' });
    }
  },

  async remove(request, response) {
    const { id } = request.params;

    try {
      if (!(await Department.findByPk(id))) {
        return response.status(400).json({ error: 'Department not found' });
      }

      await Department.destroy({ where: { id } });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Delete department failed' });
    }
  },
};
