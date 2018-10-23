"use strict";
var Factura = (function () {
    function Factura(id, vehiculoId, sedeOperativaId, ciudadanoId, fechaCreacion, fechaVencimiento, numero, valorBruto, estado) {
        this.id = id;
        this.vehiculoId = vehiculoId;
        this.sedeOperativaId = sedeOperativaId;
        this.ciudadanoId = ciudadanoId;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.numero = numero;
        this.valorBruto = valorBruto;
        this.estado = estado;
    }
    return Factura;
}());
exports.Factura = Factura;
//# sourceMappingURL=factura.modelo.js.map