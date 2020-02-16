'use strict';
var express = require('express'),
    router = express.Router(); //Routing;
var Utilerias = require('../../../../utilerias/interfaces/controladores/manejadorErrores');

const controladorFile = require('../../../interfaces/controladores/controladorFiles');

/**
 * Función para restricción de acceso.
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} err Error
 */
var accesoProhibido = function(req, res, err) {
    // console.log('En accesoProhibido: ' + req.session.getRole());
    res.status(403).send(Utilerias.manejarErrores(403)); //res.sendStatus(403);
}

router.post('/saveFiles', controladorFile.persistFacturas);
router.get('/getInfo', controladorFile.extractInfo);

module.exports = router;