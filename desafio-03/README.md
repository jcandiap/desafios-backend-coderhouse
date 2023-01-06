# Desafio 03
## Autor
- [@jcandiap](https://github.com/jcandiap)
## Consigna del desafio
- Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto *8080*:
  - Ruta get **'/productos'** que devuelva un array con todos los productos disponibles en el servidor.
  - Ruta get **'/productoRandom'** que devuelva un producto elegido al azar entre todos los productos disponibles.
- Incluir un archivo de texto [productos.txt](https://github.com/jcandiap/desafios-backend-coderhouse/blob/main/desafio-03/backup/productos.txt) y utilizar la clase [Contenedor](https://github.com/jcandiap/desafios-backend-coderhouse/blob/main/desafio-03/model/products.js) del [desafio anterior](https://github.com/jcandiap/desafios-backend-coderhouse/tree/main/desafio-02) para acceder a los datos persistidos en el servidor
#
Antes de iniciar el servidor, colocar en el archivo [productos.txt](https://github.com/jcandiap/desafios-backend-coderhouse/blob/main/desafio-03/backup/productos.txt) tres productos como en el ejemplo del [desafio anterior](https://github.com/jcandiap/desafios-backend-coderhouse/tree/main/desafio-02).
```json
[
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
]
```
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcandiap/)