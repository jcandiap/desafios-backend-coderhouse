import knex from 'knex';

export class ContenedorMariaDB {

    constructor(options) {
        this.db = knex(options);
    }

    async checkTable(table) {
        try {
            const existTable = await this.db.schema.hasTable(table);
            if( !existTable ) {
                await this.db.schema.createTable(table, newTable => {
                    newTable.increments('id');
                    newTable.string('title');
                    newTable.string('thumbnail');
                    newTable.float('price');
                });
            }
        } catch(error) {
            console.log('Error al validar tabla', error);
            throw new Error('Error al validar tabla');
        }
    }

    async save(product) {
        let newObject;
        try {
            await this.checkTable('product');
            newObject = await this.db('product').insert(product);
        } catch (error) {
            console.log('Error al ingresar producto:', error);
        }
        return newObject;
    }

    async findAll() {
        let object;
        try {
            object = await this.db.from('product').select('*');
        } catch(error) {
            console.log('Error al buscar producto:', error);
        }
        return object;
    }

}