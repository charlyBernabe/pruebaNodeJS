# pruebaNodeJS

## NodeJS Code

pruebaNodeJS: API REST para registrar y consultar facturas en formato JSON.


version: v1.0

**Libraries:**

- async-foreach ^0.1.3
- body-parser ^1.19.0
- decompress ^4.2.0
- decompress-tarxz ^3.0.0
- dotenv ^6.2.0
- express ^4.17.1
- express-fileupload ^1.1.6
- fs ^0.0.1-security
- mongoose ^5.9.1
- nodemon ^2.0.2
- util ^0.12.1

---

---

## Servicios

A continuación se muestran los servicios que se exponen en el API REST:

- Cargar Facturas
- Obtener información

---

### Cargar Facturas

```
[POST]  [dominio]/api/saveFiles
```

Body:
```form-data

file: *.tar.xz
*file: Archivo comprimido, que contiene n Json a procesar
```

Response:
```json

{
    "code": 200,
    "message": "OK.",
    "description": "Facturas registradas correctamente."
}
```
---

### Obtener información

```
[GET] [dominio]/api/getInfo
```


Response:
```json
{
    "code": 200,
    "message": "OK.",
    "description": "Listado de datos.",
    "data": [
        {
            "_id": "5e490290bbad1e706e1dea1d",
            "BillNumber": "AA000000002",
            "Utilidad_Bruta": -8431,
            "Caracteristicas_Adicionales": 5
        },
        {
            "_id": "5e490290bbad1e706e1dea25",
            "BillNumber": "AA000000001",
            "Utilidad_Bruta": 3789,
            "Caracteristicas_Adicionales": 5
        }
    ]
}
```
### Contenedor Docker

````
El API REST ya contiene los archivos docker-compose.yml y Dockerfile, que contienen la configuración necesaria para poder correr el contenedor. Se deben correr los siguientes comandos para crear/iniciar el contenedor.


docker-compose build
docker-compose up -d mongo
docker-compose up 

````


### Notas

````
El API REST esta diseñado para recibir archivos comprimidos con la extencion tar.xz, por lo que si se intenta subir archivos de tipo *.zip, *.rar, el sistema
no estará preparado para procesarlos. Es necesario hacer un ajuste en el CasoUsoFiles.js
```
            await decompress(zipFile.file.data, 'dist', {
                plugins: [
                    decompressTarxz()
                ]
            });

````
La aplicacion tiene comentado la url de MONGODB en el .env para poder conectarse
a mongoDocker, si se ejecutará por medio de un servidor local, sera necesario descomentar la linea:

< #MONGODB_URL=mongodb://localhost:27017/testfiles >
```



