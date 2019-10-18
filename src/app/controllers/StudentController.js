const Student = require('../models/Student');

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const emailExists = await Student.findOne({ where: { email: req.body.email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'Endereço de e-mail já cadastrado, informe outro e-mail' });
    }
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);

    await student.update(req.body);

    return res.json(student);
  }
}

module.exports = new StudentController();
