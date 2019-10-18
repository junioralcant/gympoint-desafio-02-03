const Sequileze = require('sequelize');

const User = require('../app/models/User');
const Student = require('../app/models/Student');
const Plan = require('../app/models/Plan');
const Registration = require('../app/models/Registration');

const dataBaseConfig = require('../config/database');

const models = [User, Student, Plan, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequileze(dataBaseConfig); // conexão com bd

    models
      .map((model) => model.init(this.connection))
      // executa o metodo associate se o mesmo existir em algum model
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
