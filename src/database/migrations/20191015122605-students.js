module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('students', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    height: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    weight: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('students'),
};
