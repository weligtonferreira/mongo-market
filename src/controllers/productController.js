const { query, redisClient } = require("../config/database");

module.exports = {

    // ==> Método responsável por retornar todos os produtos:

    async indexProducts(req, res) {
        await query(
            'SELECT * FROM product ORDER BY product_name ASC',
        ).then(async (response) => {
            return res.status(200).json(response.rows);
        }, (error) => {
            return res.status(400).json(null);
        });
    },

    // ==> Método responsável por mostrar um produto:

    async showProduct(req, res) {
        const { id } = req.params;

        redisClient.get(id, async (err, reply) => {
            if (reply != null) {
                const value = JSON.parse(reply.toString());
                return res.status(200).json(value);
            } else {
                await query(
                    'SELECT * FROM product WHERE id = $1',
                    [id]
                ).then(async (response) => {
                    if (response.rows[0]) {
                        const value = response.rows[0];
                        redisClient.setex(id, (60 * 60), JSON.stringify(value));

                        return res.status(200).json(value);
                    } else {
                        return res.status(404).json(null);
                    }
                });
            }
        });
    },

    // ==> Método responsável por criar um novo produto:

    async createProduct(req, res) {
        const { product_name, quantity, price } = req.body;

        await query(
            'INSERT INTO product (product_name, quantity, price) VALUES ($1, $2, $3)',
            [product_name, quantity, price]
        ).then(async () => {
            return res.status(201).json(req.body);
        }, (error) => {
            return res.status(400).json(null);
        });
    },

    // ==> Método responsável por atualizar um produto:

    async updateProduct(req, res) {
        const { id } = req.params;
        const { product_name, quantity, price } = req.body;

        await query(
            'UPDATE product SET product_name = $1, quantity = $2, price = $3 WHERE id = $4',
            [product_name, quantity, price, id]
        ).then(async (response) => {
            redisClient.get(id, async (err, reply) => {
                if (reply != null) {
                    redisClient.del(id);
                }
            });

            if (response.rowCount) return res.status(200).json({ code: id, product_name, quantity, price });

            return res.status(404).json(null);
        });
    },

    // ==> Método responsável por deletar um produto:

    async deleteProduct(req, res) {
        const { id } = req.params;

        await query(
            'DELETE FROM product WHERE id = $1',
            [id]
        ).then(async (response) => {
            redisClient.get(id, async (err, reply) => {
                if (reply != null) {
                    redisClient.del(id);
                }
            });

            if (response.rowCount) return res.status(200).json(null);

            return res.status(404).json(null);
        });
    }
};
