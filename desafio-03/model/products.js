import { readFileSync } from 'node:fs';

export class Product {

    constructor(id = 0, title = '', price = '', thumbnail = '') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            try {
                const file = readFileSync('./backup/productos.txt', 'utf-8');
                const object = JSON.parse(file);
                resolve(object);
            } catch (error) {
                reject(error)
            }
        });
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            try {
                const file = readFileSync('./backup/productos.txt', 'utf-8');
                const object = JSON.parse(file);
                const random = Math.round(Math.random() * (object.length - 1));
                resolve(object[random]);
            } catch (error) {
                reject(error)
            }
        });
    }
}