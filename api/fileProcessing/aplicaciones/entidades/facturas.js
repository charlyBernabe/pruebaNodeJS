class Facturas {

    constructor(__id, __updatedAt, __createdAt, __fechaLiquidacionFactura,
        __fechaCancelacion, cliente, canalVenta, billNumber, sucursal,
        vendedor, apv, at, status, detail) {
        this.__id = __id;
        this.__updatedAt = __updatedAt;
        this.__createdAt = __createdAt;
        this.__fechaLiquidacionFactura = __fechaLiquidacionFactura;
        this.__fechaCancelacion = __fechaCancelacion;
        this.cliente = cliente;
        this.canalVenta = canalVenta;
        this.billNumber = billNumber;
        this.sucursal = sucursal;
        this.vendedor = vendedor;
        this.apv = apv;
        this.at = at;
        this.status = status;
        this.detail = detail;
    };
    /**
     * Función para imprimir la información de Perfil en formato fácil de leer
     */
    toString() {
        const output = {
            Cliente: this.cliente,
            detail: this.detail
        };
        return JSON.stringify(output, null, 2);
    }
}

module.exports = Facturas;