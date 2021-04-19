module.exports = {
    sumProducts(products) {
        let amount = 0;
            
        products.map(product => {
            amount += product.price * product.quantity;
        });

        return amount;
    }
};