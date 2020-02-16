var mongoose = require('mongoose'),
    Schema = mongoose.Schema; // MongoDB connection library;
// Create a Mongoose schema
/**
 * Definición del esquema de facturas para el repositorio de datos.
 */
var facturaSchema = new mongoose.Schema({
    __id: {
        type: Number
    },
    __updatedAt: {
        type: Date,

    },
    __createdAt: {
        type: Date,

    },
    __fechaLiquidacionFactura: {
        type: Date,
        default: null,

    },
    __fechaCancelacion: {
        type: Date,
        default: null,

    },
    cliente: {
        __id: { type: Number, },
        razonSocial: { type: String, }
    },
    canalVenta: {
        __id: { type: Number, },
        nombreCanalVenta: { type: String, }
    },
    billNumber: { type: String, },
    sucursal: { type: String, },
    vendedor: { type: String, },
    apv: {
        __id: { type: Number, },
        vendedor: { type: String, }
    },
    at: { type: Date, },
    status: { type: String, },
    detail: [{
        item: [{
            __id: { type: Number, },
            __updatedAt: { type: Date, },
            __createdAt: { type: Date, },
            kind: { type: String, },
            serialNumber: { type: String, },
            inventoryDate: { type: Date, },
            brand: { type: String, },
            model: { type: String, },
            descriptionModel: { type: String, },
            color: { type: String, },
            price: { type: Number, },
            cost: { type: Number, },
            subsidy: { type: Number, },
            ivaImporte: { type: Number, },
            utilidad: { type: Number, },
            creditNote: { type: Number, },
            houseCredit: { type: Number, },
            incentive: { type: Number, },
            caracteristicasAdicionales: [{
                __id: { type: Number, },
                nombreCaracteristica: { type: String, },
                valorCaracteristica: { type: String, }
            }]
        }],
        times: { type: Number, }
    }]
});


// Register the schema
var Factura = mongoose.model('facturas', facturaSchema);

exports.Factura = Factura;

exports.createFactura = function(facturaData) {
    return new Factura(facturaData);
}