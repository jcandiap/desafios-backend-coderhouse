export class Product {

    constructor(object) {
        this.id = object?.id || 0;
        this.title = object?.title || '';
        this.price = object?.price || '';
        this.thumbnail = object?.thumbnail || '';
    }

    validarDatos() {
        if( !this.title || !this.price || !this.thumbnail ) {
            return false;
        } else {
            return true;
        }
    }
}