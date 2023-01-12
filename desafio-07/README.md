# Desafio 07
## Autor
- [@jcandiap](https://github.com/jcandiap)
## Consigna del desafio
Tomando como vase las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando [Knex](https://www.npmjs.com/package/knex) para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego modificar el [desafío entregable anterior](https://github.com/jcandiap/desafios-backend-coderhouse/tree/main/desafio-06), y:
- Cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
- Cambiar la persistencia de los productos de memoria a base de datos MariaDB

*Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en SQLite3 y tabla productos en MariaDB).*
## Aspectos a considerar
- Definir una carpeta BD para almacenar la base de datos SQLite3 llamada *ecommerce*.