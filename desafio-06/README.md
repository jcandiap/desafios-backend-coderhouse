# Desafio 06
## Autor
- [@jcandiap](https://github.com/jcandiap)
## Consigna del desafio
- Modificar el [último desafio](https://github.com/jcandiap/desafios-backend-coderhouse/tree/main/desafio-05) para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real.
    - Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
    - Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.
## Aspectos a considerar:
Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars (o cualquiera de los motores elegidos) en el frontend. Considerar usar archivos públicos para alojar la plantilla vacía, y obtenerla usando la función fetch(). **Recordar que fetch devuelve una PROMESA**.
#
- En la parte inferior del formilario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email.
- El formato a representar será email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)](texto normal en marrón): mensaje (texto italic en verde)
- Además incorporar dos elementos de entrada: uno para que el usuario inrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón.
- Los mensajes deben persistir en el servidor en un archivo ([ver segundo desafio](https://github.com/jcandiap/desafios-backend-coderhouse/tree/main/desafio-02))
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcandiap/)