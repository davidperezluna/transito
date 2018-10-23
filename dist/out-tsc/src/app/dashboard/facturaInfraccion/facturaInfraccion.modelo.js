"use strict";
var FacturaInfraccion = (function () {
    function FacturaInfraccion(id, sedeOperativaId, ciudadanoId, fechaCreacion, fechaVencimiento, numero, valorTotal, estado) {
        this.id = id;
        this.sedeOperativaId = sedeOperativaId;
        this.ciudadanoId = ciudadanoId;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.numero = numero;
        this.valorTotal = valorTotal;
        this.estado = estado;
    }
    return FacturaInfraccion;
}());
exports.FacturaInfraccion = FacturaInfraccion;
//# sourceMappingURL=facturaInfraccion.modelo.js.map