const { mongoClient } = require('../config/database');

module.exports = {
    async indexClients(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Client = Database.collection('Client');

            const clients = [];
            await Client.find().forEach(p => clients.push(p));

            return res.json(clients);
        } catch (error) {
            console.log(error);
        }
    },


    async showClient(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Client = Database.collection('Client');

            const { cpf } = req.params;
            await Client.findOne({ cpf }).then(async response => {
                if (response) {
                    return res.status(200).json(response);
                }
                return res.status(404).json(null);
            });
        } catch (error) {
            console.log(error);
        }
    },

    async createClient(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Client = Database.collection('Client');

            const { body } = req;
            await Client.insertOne(body).then(async response => {
                if (response.ops[0]) {
                    return res.status(201).json(response);
                }
                return res.status(400).json(null);
            });
        } catch (error) {
            console.log(error);
        }
    },

    async updateClient(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Client = Database.collection('Client');

            const { cpf } = req.params;
            const { body } = req;
            await Client.updateOne({ cpf }, { $set: body }).then(async response => {
                if (response.matchedCount == 0) {
                    return res.status(404).send();
                }
                return res.status(200).send();
            });
        } catch (error) {
            console.log(error);
        }
    },

    async deleteClient(req, res) {
        try {
            await mongoClient.connect();

            const Database = mongoClient.db(`${process.env.MONGO_DATABASE}`);
            const Client = Database.collection('Client');

            const { cpf } = req.params;
            await Client.deleteOne({ cpf }).then(async response => {
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