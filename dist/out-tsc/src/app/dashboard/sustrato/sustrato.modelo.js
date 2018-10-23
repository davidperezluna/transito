"use strict";
var Sustrato = (function () {
    function Sustrato(estado, descripcion, desde, hasta, consecutivo, impresion, entregado, sedeOperativaId, moduloId, claseId, ciudadanoId, facturaId) {
        this.estado = estado;
        this.descripcion = descripcion;
        this.desde = desde;
        this.hasta = hasta;
        this.consecutivo = consecutivo;
        this.impresion = impresion;
        this.entregado = entregado;
        this.sedeOperativaId = sedeOperativaId;
        this.moduloId = moduloId;
        this.claseId = claseId;
        this.ciudadanoId = ciudadanoId;
        this.facturaId = facturaId;
    }
    return Sustrato;
}());
exports.Sustrato = Sustrato;
//# sourceMappingURL=sustrato.modelo.js.map