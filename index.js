var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'), // parse HTTP requests  
    port = process.env.PORT || 3000,
    mongoDB = require('./api/configuraciones/infraestructuras/baseDatos/mongoDB');
const fileUpload = require('express-fileupload');
/** Configuración de variables de entorno locales */
let dotenv = require('dotenv');
dotenv.config();
if (process.env.NODE_ENV !== 'production') {
    dotenv.load();
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
/**
 * Conexion con MongoDB
 */
function connnectToMongo() {
    mongoDB.DBConnectMongoose(process.env.MONGODB_URL)
        .then(() => {
            console.log('Conexion a BD exitosa.')
        })
        .catch(err => {
            console.log('Error: ' + err);
            connnectToMongo(process.env.MONGODB_URL);
        });
}
connnectToMongo();


/**Configuración de headers */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, pragma, cache-control, Authorization, Content-Length, X-Requested-With, x-access-token');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
/**Posible configuración para permitir peticiones de diferentes  */
let allowedOrigins = [];
app.use(cors({ origin: allowedOrigins, credentials: true }));

let routes = require('./api/fileProcessing/infraestructuras/servidor/rutas/files');
//Name api&version
app.get('/api', (req, res) => {
    res.type('application/json');
    res.status(200).send({
        name: 'Backend technical test',
        version: '1.0.0',
    });
});
/**Importación de rutas */
app.use('/api', routes);
/**Error en caso de que no exista la url de la petición */
app.use(function(req, res) {
    res.status(404).send({
        "errors": [{
            "code": 404,
            "message": "Not found.",
            "description": "There is no resource behind the URI: " + req.originalUrl
        }]
    })
});
app.listen(port, function() {
    console.log('Showroom RESTful API server started on: ' + port);
});