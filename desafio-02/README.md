# Desafio 02
## Autor
- [@jcandiap](https://github.com/jcandiap)
## Consigna del desafio
- Se debe implementar un programa que contenga una clase llamada [Contenedor](https://github.com/jcandiap/desafios-backend-coderhouse/blob/main/desafio-02/model/Contenedor.js) que reciba el nombre del archivo con el que va a trabajar e implementar los siguientes métodos:
```
• save(Object): Number » Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

• getById(Number): Object » Recibe un id y devuelve el objeto con ese id, o null si no está.

• getAll(): Object[] » Devuelve un array con los objetos presentes en el archivo.

• deleteById(Number): void » Elimina del archivo el objeto con el id buscado.

• deleteAll(): void » Elimina todos los objetos presentes en el archivo.
```
### Aspectos a considerar
- El método **save** incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
- Implementar el manejo de archivos con el módulo **fs** de node.js, utilizando promesas con **async/await** y manejo de errores.
- Probar el módulo creando un contenedor de *productos*, que se guarde en el archivo: **[productos.txt](https://github.com/jcandiap/desafios-backend-coderhouse/blob/main/desafio-02/files/productos.txt)**
- Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construido.
- El formato de cada producto será:
```js
{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url de la foto del producto)
}
```
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcandiap/)