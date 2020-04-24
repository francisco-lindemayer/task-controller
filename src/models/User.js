const { Model, DataTypes } = require('sequelize');
const slug = require('../utils/slugRole');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM(slug.Admin, slug.Analyzer, slug.User),
      },
      {
        sequelize,
        hooks: {
          beforeSave: User.beforeSave,
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
  }

  static async beforeSave(user, options) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
}

module.exports = User;
