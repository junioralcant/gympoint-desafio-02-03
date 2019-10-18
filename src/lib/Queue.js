const Bee = require('bee-queue');
const CreateRegistration = require('../app/jobs/CreateRegistration');
const redisConfig = require('../config/redis');

const jobs = [CreateRegistration];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // add os novos jobs na fila par ser processados
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILD`, err);
  }
}

module.exports = new Queue();
