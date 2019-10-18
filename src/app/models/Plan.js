const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Plan;
