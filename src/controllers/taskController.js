const Task = require('../models/Task');
const User = require('../models/User');
const Department = require('../models/Department');
const { Op } = require('sequelize');
const paginate = require('../utils/paginator');
const filtering = require('../utils/filteringQuery');
const ordering = require('../utils/orderingQuery');

module.exports = {
  async show(request, response) {
    try {
      const count = await Task.count();

      response.header('X-Total-Count', count);

      const tasks = await Task.findAll({
        where: {
          ...filtering(request.query, {
            user_id: null,
            department_id: null,
            status: null,
            description: Op.substring,
            created_at: Op.between,
            updated_at: Op.between,
            started_at: Op.between,
            completed_at: Op.between,
          }),
        },
        ...ordering(request.query, [
          'status',
          'description',
          'created_at',
          'updated_at',
          'started_at',
          'completed_at',
        ]),
        ...paginate(request.query),
        include: [
          { association: 'user', attributes: ['name'] },
          { association: 'department', attributes: ['name'] },
        ],
      });

      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(500).json({ error: 'Get task list failed' });
    }
  },

  async index(request, response) {
    const { id } = request.params;

    try {
      const task = await Task.findByPk(id, {
        include: [
          { association: 'user', attributes: ['name'] },
          { association: 'department', attributes: ['name'] },
        ],
      });

      if (!task) {
        return response.status(400).json({ error: 'Task not found' });
      }

      return response.status(200).json(task);
    } catch (error) {
      return response.status(500).json({ error: 'Find task failed' });
    }
  },

  async store(request, response) {
    const { description, user_id, department_id } = request.body;

    try {
      if (user_id) {
        if (!(await User.findByPk(user_id))) {
          return response.status(400).json({ error: 'User to bind not found' });
        }
      }

      if (department_id) {
        if (!(await Department.findByPk(department_id))) {
          return response
            .status(400)
            .json({ error: 'Department to bind not found' });
        }
      }

      const task = await Task.create({
        description,
        user_id,
        department_id,
      });

      return response.status(201).json(task);
    } catch (error) {
      return response.status(500).json({ error: 'Create task failed' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { description, user_id, department_id } = request.body;

    try {
      if (!(await Task.findByPk(id))) {
        return response.status(400).json({ error: 'Task not found' });
      }

      if (user_id) {
        if (!(await User.findByPk(user_id))) {
          return response.status(400).json({ error: 'User to bind not found' });
        }
      }

      if (department_id) {
        if (!(await Department.findByPk(department_id))) {
          return response
            .status(400)
            .json({ error: 'Department to bind not found' });
        }
      }

      await Task.update(
        {
          description,
          user_id,
          department_id,
        },
        { where: { id } },
      );

      return response.status(204).json();
    } catch (error) {
      return response.state(500).json({ error: 'Update task failed' });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      if (!(await Task.findByPk(id))) {
        return response.status(400).json({ error: 'Task not found' });
      }

      await Task.destroy({ where: { id } });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Delete task failed' });
    }
  },

  async changeStatus(request, response) {
    const { id } = request.params;
    const { action } = request.body;
    const status =
      action == 'tostart'
        ? 'Em andamento'
        : action == 'tocomplete'
        ? 'Finalizado'
        : undefined;
    try {
      if (!status) {
        return response.status(400).json({ error: 'Invalid action' });
      }

      if (!(await Task.findByPk(id))) {
        return response.status(400).json({ error: 'Task not found' });
      }

      await Task.update({ status }, { where: { id } });

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Change status task failed' });
    }
  },
};
