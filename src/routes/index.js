const express = require('express');

const productController = require('../controllers/productController');
const clientController = require('../controllers/clientController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// ==> Rotas da API

router.get('/products', productController.indexProducts);
router.get('/products/:id', productController.showProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/clients', clientController.indexClients);
router.get('/clients/:cpf', clientController.showClient);
router.post('/clients', clientController.createClient);
router.put('/clients/:cpf', clientController.updateClient);
router.delete('/clients/:cpf', clientController.deleteClient);

router.get('/orders', orderController.indexOrders);
router.get('/clientOrders/:cpf', orderController.showClientOrders);
router.get('/orders/:id', orderController.showOrder);
router.post('/orders', orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;