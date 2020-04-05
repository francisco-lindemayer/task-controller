const Task = require('../models/Task');
const User = require('../models/User');
const Department = require('../models/Department');
const sequelize = require('sequelize');
const parseMilliseconds = require('parse-ms');
const filtering = require('../utils/filteringQuery');
const ordering = require('../utils/orderingQuery');

module.exports = {
  async reportByUser(request, response) {
    const { id } = request.params;
    try {
      if (!(await User.findByPk(id))) {
        return response.status(400).json({ error: 'User not found' });
      }

      const task = await Task.findAll({
        where: { user_id: id, status: 'Finalizado' },
        attributes: [
          'user_id',
          [sequelize.fn('COUNT', sequelize.literal('user_id')), 'count'],
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '(SELECT EXTRACT(EPOCH FROM (started_at - created_at)))',
              ),
            ),
            'totaltimetostart',
          ],
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '(SELECT EXTRACT(EPOCH FROM (completed_at - started_at)))',
              ),
            ),
            'totaltimetocomplete',
          ],
        ],
        group: ['user_id'],
        raw: true,
        order: sequelize.literal('count DESC'),
      });

      const reportData = task.reduce((accumulator, value) => {
        accumulator['user_id'] = value.user_id;
        accumulator['totaltasks'] = value.count;
        accumulator['averagetimetostart'] = parseMilliseconds(
          (value.totaltimetostart / value.count) * 1000,
        );
        accumulator['averagetimetocomplete'] = parseMilliseconds(
          (value.totaltimetocomplete / value.count) * 1000,
        );

        return accumulator;
      }, {});

      return response.status(200).json(reportData);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Get details by user failed' });
    }
  },

  async reportByDepartment(request, response) {
    const { id } = request.params;
    try {
      if (!(await Department.findByPk(id))) {
        return response.status(400).json({ error: 'Department not found' });
      }

      const task = await Task.findAll({
        where: { department_id: id, status: 'Finalizado' },
        attributes: [
          'department_id',
          [sequelize.fn('COUNT', sequelize.literal('department_id')), 'count'],
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '(SELECT EXTRACT(EPOCH FROM (started_at - created_at)))',
              ),
            ),
            'totaltimetostart',
          ],
          [
            sequelize.fn(
              'SUM',
              sequelize.literal(
                '(SELECT EXTRACT(EPOCH FROM (completed_at - started_at)))',
              ),
            ),
            'totaltimetocomplete',
          ],
        ],
        group: ['department_id'],
        raw: true,
        order: sequelize.literal('count DESC'),
      });

      const reportData = task.reduce((accumulator, value) => {
        accumulator['department_id'] = value.department_id;
        accumulator['totaltasks'] = value.count;
        accumulator['averagetimetostart'] = parseMilliseconds(
          (value.totaltimetostart / value.count) * 1000,
        );
        accumulator['averagetimetocomplete'] = parseMilliseconds(
          (value.totaltimetocomplete / value.count) * 1000,
        );

        return accumulator;
      }, {});

      return response.status(200).json(reportData);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'Get details by department failed' });
    }
  },
};
