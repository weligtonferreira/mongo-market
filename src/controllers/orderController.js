const { ObjectId } = require('mongodb');
const { mongoClient } = require('../config/database');

module.exports = {
    async indexOrders(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const orders = [];
            await Order.find().forEach(p => orders.push(p));

            return res.json(orders);
        } catch (error) {
            console.log(error);
        }
    },

    async showClientOrders(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const orders = [];
            const { cpf } = req.params;
            await Order.find({ cpfClient: cpf }).forEach(p => orders.push(p));

            return res.json(orders);
        } catch (error) {
            console.log(error);
        }
    },

    async showOrder(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const { cpf } = req.params;
            await Order.findOne({ cpf }).then(async response => {
                if (response) {
                    return res.status(200).json(response);
                }
                return res.status(404).json(null);
            });
        } catch (error) {
            console.log(error);
        }
    },

    async createOrder(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const { body } = req;
            await Order.insertOne(body).then(async response => {
                if (response.ops[0]) {
                    return res.status(201).json(response);
                }
                return res.status(400).json(null);
            });
        } catch (error) {
            console.log(error);
        }
    },

    async updateOrder(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const { id } = req.params;
            const { body } = req;
            await Order.updateOne({ _id: new ObjectId(id) }, { $set: body }).then(async response => {
                if (response.matchedCount == 0) {
                    return res.status(404).send();
                }
                return res.status(200).send();
            });
        } catch (error) {
            console.log(error);
        }
    },

    async deleteOrder(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Order = Database.collection('Order');

            const { id } = req.params;
            await Order.deleteOne({ _id: new ObjectId(id) }).then(async response => {
                if (response.deletedCount == 0) {
                    return res.status(404).send();
                }
                return res.status(200).send();
            });
        } catch (error) {
            console.log(error);
        }
    },
}