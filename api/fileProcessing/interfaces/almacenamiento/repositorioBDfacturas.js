'use strict';
const FacturaDB = require('../../infraestructuras/baseDatos/facturas');
const repositorioFacturas = require('../../aplicaciones/repositorios/repositorioFacturas');
var mongoose = require('mongoose');
var path = require('path');

module.exports = class extends repositorioFacturas {
    constructor() {
        super();
    }
    async persistFacturas(facEntity) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var factura = FacturaDB.createFactura(facEntity);
            factura.save(function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(factura);
                }
            })

        })
    }

    async deleteFacturas(facEntity) {
        var self = this;
        return await FacturaDB.Factura.remove()
    }
}