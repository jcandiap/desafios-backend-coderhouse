import knex from 'knex';

export class ContenedorSqlite {

    constructor(options) {
        this.db = knex(options);
    }

    async checkTableUser() {
        try {
            const existTable = await this.db.schema.hasTable('user');
            if( !existTable ) {
                await this.db.schema.createTable('user', newTable => {
                    newTable.string('id');
                    newTable.string('userName');
                    newTable.string('userEmail');
                });
            }
        } catch(error) {
            console.log('Error al validar tabla', error);
            throw new Error('Error al validar tabla');
        }
    }

    async checkTableMessage() {
        try {
            const existTable = await this.db.schema.hasTable('message');
            if( !existTable ) {
                await this.db.schema.createTable('message', newTable => {
                    newTable.increments('id');
                    newTable.string('userId');
                    newTable.string('message');
                });
            }
        } catch(error) {
            console.log('Error al validar tabla', error);
            throw new Error('Error al validar tabla');
        }
    }

    async saveUser(user) {
        let newObject;
        try {
            await this.checkTableUser();
            newObject = await this.db('user').insert(user);
        } catch (error) {
            console.log('Error al ingresar usuario:', error);
        }
        return newObject;
    }

    async saveMessage({ message, id }) {
        let newObject;
        try {
            await this.checkTableMessage();
            newObject = await this.db('message').insert({ message, userId: id });
            console.log(newObject);
        } catch (error) {
            console.log('Error al ingresar mensaje:', error);
        }
        return newObject;
    }

    async findAllMessages() {
        let object;
        try {
            object = await this.db.from('message').select('*');
        } catch(error) {
            console.log('Error al buscar mensajes:', error);
        }
        return object;
    }

    async findUser(id) {
        let object;
        try {
            object = await this.db.from('user').select('*').where('id', id);
        } catch(error) {
            console.log('Error al buscar producto:', error);
        }
        return object;
    }

}