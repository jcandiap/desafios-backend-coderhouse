import { faker } from '@faker-js/faker';

class Contenedor {

    constructor() {
    }

    async getProducts() {
        let products = [];
        for (let i = 0; i < 5; i++) {
            products.push({
                id: faker.random.numeric(),
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image()
            });
        }
        return products;
    }

}

export default Contenedor;