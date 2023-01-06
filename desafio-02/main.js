import { Contenedor } from "./model/Contenedor.js";

const file = new Contenedor('productos.txt');

const main = async () => {
    await file.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'test'
    }).then((resolve, reject) => {
        console.log('Elemento agregado, ID:', resolve)
    });

    await file.getById(2).then((resolve, reject) => {
        console.log('\nElemento encontrado, resultado:', resolve);
    });

    await file.getAll().then((resolve, reject) => {
        console.log('\nElementos encontrados:')
        console.table(resolve);
    });

    file.deleteById(9);

    await file.getAll().then((resolve, reject) => {
        console.log('\nElementos encontrados despues de eliminar:')
        console.table(resolve);
    });

    //file.deleteAll();
}

main();