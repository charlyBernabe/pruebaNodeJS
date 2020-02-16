exports.inicio = function(req, res, next) {
    console.log('cerrarSesion para usuario: ' + req);
    res.status(200).send({
        "code": 200,
        "message": "Sesión cerrada correctamente.",
        "description": "Vuelva a iniciar sesión para obtener un nuevo token.",
    })
}