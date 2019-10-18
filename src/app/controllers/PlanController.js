const Plan = require('../models/Plan');

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.destroy();

    return res.send();
  }
}

module.exports = new PlanController();
