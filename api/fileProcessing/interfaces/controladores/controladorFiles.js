var CasosUsoFiles = require('../../aplicaciones/casosUso/casosUsoFiles'),
    RepositorioBDFiles = require('../almacenamiento/repositorioBDFacturas'),
    Utilerias = require('../../../utilerias/interfaces/controladores/manejadorErrores'),
    casoUso = new CasosUsoFiles(new RepositorioBDFiles());
exports.persistFacturas = async function(req, res, next) {
    try {
        let response = await casoUso.persistFacturas(req.files);
        res.status(200).send({
            "code": 200,
            "message": "OK.",
            "description": "Facturas registradas correctamente.",
            "data": response
        });
    } catch (error) {
        res.status(400).send(Utilerias.manejarErrores(400, null, new Error(error)));

    }



}
exports.extractInfo = async function(req, res, next) {
    try {
        let response = await casoUso.getInfo();
        res.status(200).send({
            "code": 200,
            "message": "OK.",
            "description": "Listado de datos.",
            "data": response
        });
    } catch (error) {
        res.status(400).send(Utilerias.manejarErrores(400, null, new Error(error)));

    }



}