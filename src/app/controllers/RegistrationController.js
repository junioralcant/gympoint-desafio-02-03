const { addMonths } = require('date-fns');
const { parseISO } = require('date-fns');

const Registration = require('../models/Registration');
const Student = require('../models/Student');
const Plan = require('../models/Plan');
const Queue = require('../../lib/Queue');
const CreateRegistration = require('../jobs/CreateRegistration');

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      order: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'duration', 'price'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.body.student_id);
    const plan = await Plan.findByPk(req.body.plan_id);

    const { start_date } = req.body;

    const startDate = parseISO(start_date);
    const endDate = addMonths(startDate, plan.duration);

    const price = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date: endDate,
      price,
    });

    await Queue.add(CreateRegistration.key, {
      registration,
      student,
      plan,
      price,
      endDate,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    const student = await Student.findByPk(req.body.student_id);
    const plan = await Plan.findByPk(req.body.plan_id);

    const { start_date } = req.body;

    const startDate = parseISO(start_date);
    const endDate = addMonths(startDate, plan.duration);

    const price = plan.price * plan.duration;

    await registration.update({
      student_id: student.id,
      plan_id: plan.id,
      start_date,
      end_date: endDate,
      price,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    await registration.destroy();

    return res.send();
  }
}

module.exports = new RegistrationController();
