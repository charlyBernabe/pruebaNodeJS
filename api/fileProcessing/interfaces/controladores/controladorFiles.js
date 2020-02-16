var CasosUsoFiles = require('../../aplicaciones/casosUso/casosUsoFiles'),
    RepositorioBDFiles = require('../almacenamiento/repositorioBDFacturas'),
    Utilerias = require('../../../utilerias/interfaces/controladores/manejadorErrores'),
    casoUso = new CasosUsoFiles(new RepositorioBDFiles());
exports.persistFacturas = async function(req, res, next) {
    casoUso.persistFacturas(req.files).then(data => {
        console.log('data :', data);
        res.status(200).send({
            "code": 200,
            "message": "OK.",
            "description": "Facturas registradas correctamente.",
            "upload": data
        });
    }).catch(error => {
        res.status(400).send(Utilerias.manejarErrores(400, null, error));

    });



}