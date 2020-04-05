const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        department_id: DataTypes.INTEGER,
        status: DataTypes.ENUM('Aberto', 'Em andamento', 'Finalizado'),
        started_at: DataTypes.DATE,
        completed_at: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });
  }
}

module.exports = Task;
