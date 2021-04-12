const mongoose = require('mongoose');

const Client = mongoose.model('Client');

module.exports = {
    async index(req, res) {
        const clients = await Client.find();

        return res.json(clients);
    },

    async show(req, res) {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).send("Cliente não encontrado");
        }

        return res.json(client);
    },

    async store(req, res) {
        await Client.create(req.body).then(async (client) => {
            return res.json(client);
        }, (error) => {
            return res.status(400).send("CPF ou email já existe");
        });
    },

    async update(req, res) {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!client) {
            return res.status(404).send("Cliente não encontrado");
        }

        return res.json(client);
    },

    async destroy(req, res) {
        const client = await Client.findByIdAndRemove(req.params.id);

        if (!client) {
            return res.status(404).send("Cliente não encontrado");
        }

        return res.send();
    }
};
