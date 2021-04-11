const express = require('express');
const routes = express.Router();
const clientController = require('../controllers/clientController');
const orderController = require('../controllers/orderController');

// ==> Rotas da API

routes.get('/clients', clientController.index);
routes.get('/clients/:id', clientController.show);
routes.post('/clients', clientController.store);
routes.put('/clients/:id', clientController.update);
routes.delete('/clients/:id', clientController.destroy);

module.exports = routes;
