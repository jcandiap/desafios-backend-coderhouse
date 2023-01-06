import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
        this.fullpath = `./files/${ fileName }`;
    }

    async save(product) {
        return new Promise((resolve, reject) => {
            try {
                const file = this._findFile() ? readFileSync(this.fullpath, 'utf-8') : '[]';
                let object = JSON.parse(file);
                const id = this._getMax(object);
                object.push({ id, ...product });
                writeFileSync(this.fullpath, JSON.stringify(object));
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                const file = readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const value = object.find(v => v.id === id);
                resolve(value);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            try {
                const file = readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                resolve(object);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteById(id) {
        try {
            const file = readFileSync(this.fullpath, 'utf-8');
            const object = JSON.parse(file);
            const newArray = object.filter(value => value.id !== id);
            writeFileSync(this.fullpath, JSON.stringify(newArray));
        } catch (error) {
            throw error;
        }
    }

    deleteAll() {
        writeFileSync(this.fullpath, '[]');
    }

    _findFile() {
        return existsSync(this.fullpath);
    }

    _getMax(array) {
        let maxId = 0;
        array.map(({ id }) => (id > maxId && (maxId = id)));
        maxId++;
        return maxId;
    }

}