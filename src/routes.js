const { Router } = require('express');
const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const StudentController = require('./app/controllers/StudentController');
const PlanController = require('./app/controllers/PlanController');
const RegistrationController = require('./app/controllers/RegistrationController');

const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// Students
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

// Plans
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Registration
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

module.exports = routes;
