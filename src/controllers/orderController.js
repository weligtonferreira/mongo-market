const mongoose = require('mongoose');
const axios = require('axios');

const Order = mongoose.model('Order');

module.exports = {
    async index(req, res) {
        const orders = await Order.find();

        return res.json(orders);
    },

    async clientOrders(req, res) {
        const { client } = req.query;

        const orders = await Order.find({ clientId: client });

        return res.json(orders);
    },

    async show(req, res) {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).send("Pedido não encontrado");
        }

        return res.json(order);
    },

    async store(req, res) {
        let order = req.body;

        let newProducts = [];
        order.amount = 0.00;

        let products = order.products;

        for (let l = 0; l < products.length; l++) {
            let product = products[l];

            await axios.get(`http://localhost:3000/products/${product.code}`).then(async (productResponse) => {
                let { code, p_name, price } = productResponse.data.product;

                newProducts.push({ product: { code, p_name, price }, quantity: product.quantity });
                order.amount += price * product.quantity;
            }, (error) => {
                return res.status(404).send("Produto não encontrado no banco");
            });

            if (l == products.length - 1) {
                order.products = newProducts;

                const createdOrder = await Order.create(order);

                return res.status(201).json(createdOrder);
            }
        }
    },

    async update(req, res) {
        const { id } = req.params;

        if (req.body.products) {

            const { products } = req.body;

            let newProducts = [];
            req.body.amount = 0.00;

            for (let l = 0; l < products.length; l++) {
                let product = products[l];

                await axios.get(`http://localhost:3000/products/${product.code}`).then(async (productResponse) => {
                    let { code, p_name, price } = productResponse.data.product;

                    newProducts.push({ product: { code, p_name, price }, quantity: product.quantity });
                    req.body.amount += price * product.quantity;
                }, (error) => {
                    return res.status(404).send("Produto não encontrado no banco");
                });

                if (l == products.length - 1) {
                    req.body.products = newProducts;

                    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

                    if (!order) {
                        return res.status(404).send("Pedido não encontrado");
                    }

                    return res.json(order);
                }
            }

        }

        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

        if (!order) {
            return res.status(404).send("Pedido não encontrado");
        }

        return res.json(order);
    },

    async destroy(req, res) {
        const { id } = req.params;

        const order = await Order.findByIdAndRemove(id);

        if (!order) {
            return res.status(404).send("Pedido não encontrado");
        }

        return res.send();
    }
};