const FacturaDB = require('../../infraestructuras/baseDatos/facturas');
const repositorioFacturas = require('../../aplicaciones/repositorios/repositorioFacturas');
var mongoose = require('mongoose');
var path = require('path');

module.exports = class extends repositorioFacturas {
    constructor() {
        super();
    }
    async persistFacturas(facEntity) {
        let factura = FacturaDB.createFactura(facEntity);
        return await factura.save()
    }


    async deleteFacturas() {
        return await FacturaDB.Factura.remove()
    }
    async getInfo() {
        let params = [{
                $unwind: "$detail",
            },
            {
                $unwind: "$detail.item",
            },
            {
                $project: {
                    "BillNumber": "$billNumber",
                    'Utilidad_Bruta': {
                        $subtract: [{
                            $sum: [{
                                    $subtract: ["$detail.item.utilidad", "$detail.item.cost"]
                                },
                                "$detail.item.incentive"
                            ]
                        }, "$detail.item.houseCredit"]
                    },
                    "Caracteristicas_Adicionales": { $size: "$detail.item.caracteristicasAdicionales" }
                }
            }

        ]
        return await FacturaDB.Factura.aggregate(params)
            //return await FacturaDB.Factura.find()
    }
}