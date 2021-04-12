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

routes.get('/orders', orderController.index);
routes.get('/clientOrders', orderController.clientOrders);
routes.get('/orders/:id', orderController.show);
routes.post('/orders', orderController.store);
routes.put('/orders/:id', orderController.update);
routes.delete('/orders/:id', orderController.destroy);

module.exports = routes;
