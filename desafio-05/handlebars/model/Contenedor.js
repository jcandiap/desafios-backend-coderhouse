const fs = require('fs');
class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
        this.fullpath = `./backup/${ fileName }`;
    }

    async save(product) {
        return new Promise((resolve, reject) => {
            try {
                const file = this._findFile() ? fs.readFileSync(this.fullpath, 'utf-8') : '[]';
                let object = JSON.parse(file);
                const id = this._getMax(object);
                const newProduct = { ...product, id }
                object.push(newProduct);
                fs.writeFileSync(this.fullpath, JSON.stringify(object));
                resolve(newProduct);
            } catch (error) {
                reject(error);
            }
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const value = object.find(v => v.id === Number(id));
                resolve(value);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file || '[]');
                resolve(object);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateById(product) {
        return new Promise((resolve, reject) => {
            try {
                let flagProducto = false;
                const file = fs.readFileSync(this.fullpath, 'utf-8');
                const object = JSON.parse(file);
                const newArray = object.map(value => {
                    if( value?.id === product.id ) {
                        flagProducto = true;
                        return product;
                    }
                    return value;
                });
                fs.writeFileSync(this.fullpath, JSON.stringify(newArray));
                flagProducto ? resolve(product) : resolve({ error: 'No se ha encontrado producto para modificar'});
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteById(id) {
        try {
            const file = fs.readFileSync(this.fullpath, 'utf-8');
            const object = JSON.parse(file);
            const isExist = object.find(value => value.id === id);
            if( isExist ) {
                const newArray = object.filter(value => value.id !== id);
                fs.writeFileSync(this.fullpath, JSON.stringify(newArray));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    deleteAll() {
        fs.writeFileSync(this.fullpath, '[]');
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync('./backup/productos.txt', 'utf-8');
                const object = JSON.parse(file);
                const random = Math.round(Math.random() * (object.length - 1));
                resolve(object[random]);
            } catch (error) {
                reject(error)
            }
        });
    }

    _findFile() {
        return fs.existsSync(this.fullpath);
    }

    _getMax(array) {
        let maxId = 0;
        array.map(({ id }) => (id > maxId && (maxId = id)));
        maxId++;
        return maxId;
    }

}

module.exports = Contenedor;