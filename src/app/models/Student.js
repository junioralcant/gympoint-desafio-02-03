const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.DATE, // o VIRTUAL informa que esse campo não ira ser criado no bd
        height: Sequelize.DOUBLE,
        weight: Sequelize.DOUBLE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Student;
