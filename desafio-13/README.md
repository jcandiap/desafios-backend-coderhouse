
# Desafio 13 Coderhouse

Información adicional sobre el desafio de balanceador de carga

# Aspectos a considerar 😔
+ El archivo generado por ```--prof``` quedó procesado y guardado con el nombre ```result-log.txt```
+ Las pruebas realizadas con **Artillery** quedaron guardadas en el archivo ```result-test.txt```
+ En el archivo ```error.log``` quedan guardadas las excepciones al momento de consumir un servicio, además de el intento de ingresar a rutas no existentes.
+ En el archivo ```warn.log``` quedan guardadas las alertas (en este caso mucho menos que los errores) de no envio de forma correcta de datos para los servicios.
+ La verdad no se como funcionara el desafio esta semana, en el desafio que vimos con el profesor la clase pasada habia una lamina menos de desafio y esa libreria tampoco la usamos durante la clase, de igual forma intentare completarlo hasta el ultimo punto pero hago la entrega para que no se me pase el tiempo 😁🐱‍👤
+ Abajo se mantienen las mismas instrucciones que el desafio pasado ya que no ha cambiado mucho! 😂
+ **La pagina ```/info``` bajó de 2.39 KB a 1.20 KB con la liberia compression** 😁

# Comandos de ejecución
#### Comandos para ejecutar aplicación sin pm2
+ Ejecución en modo **cluster**: ```node src/app.js --port=8081 --modo=CLUSTER```
+ Ejecución en modo **fork**: ```node src/app.js --port=8081 --modo=FORK```

#### Comandos para ejecutar aplicacion **con** pm2
+ ```pm2 start ./process.json``` ⬅️ **Ejecución dentro de la carpeta del proyecto**

#### Comandos para detener procesos de pm2
+ ```pm2 delete all```

# Configuración archivo [process.json](https://github.com/jcandiap/desafio-12-coderhouse/blob/main/process.json)
# Todos estos son los casos presentados dentro del desafio 👀

#### Para configurar un servidor con 2 instancias en modo **fork**
```json
    {
        "apps": [
            {
                "name": "Process 8081",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8081 --modo=FORK"
            },
            {
                "name": "Process 8082",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8082 --modo=FORK"
            }
        ]
    }
```

#### Para configurar un servidor con 5 instancias en modo **fork**
```json
    {
        "apps": [
            {
                "name": "Process 8081",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8081 --modo=FORK"
            },
            {
                "name": "Process 8082",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8082 --modo=FORK"
            },
            {
                "name": "Process 8083",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8083 --modo=FORK"
            },
            {
                "name": "Process 8084",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8084 --modo=FORK"
            },
            {
                "name": "Process 8085",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8085 --modo=FORK"
            }
        ]
    }
```

#### Para configurar un servidor con 5 instancias en modo **cluster**
```json
    {
        "apps": [
            {
                "name": "Process 8081",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8081 --modo=CLUSTER"
            },
            {
                "name": "Process 8082",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8082 --modo=CLUSTER"
            },
            {
                "name": "Process 8083",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8083 --modo=CLUSTER"
            },
            {
                "name": "Process 8084",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8084 --modo=CLUSTER"
            },
            {
                "name": "Process 8085",
                "script": "src/app.js",
                "watch": true,
                "args": "--port=8085 --modo=CLUSTER"
            }
        ]
    }
```
