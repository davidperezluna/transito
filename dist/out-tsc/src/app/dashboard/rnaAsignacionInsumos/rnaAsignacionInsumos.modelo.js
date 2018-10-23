"use strict";
var rnaAsignacionInsumos = (function () {
    function rnaAsignacionInsumos(id, numero, fecha, tipo, estado, rangoInicio, rangoFin, sedeOperativaId, casoInsumoId, loteInsumoId) {
        this.id = id;
        this.numero = numero;
        this.fecha = fecha;
        this.tipo = tipo;
        this.estado = estado;
        this.rangoInicio = rangoInicio;
        this.rangoFin = rangoFin;
        this.sedeOperativaId = sedeOperativaId;
        this.casoInsumoId = casoInsumoId;
        this.loteInsumoId = loteInsumoId;
    }
    return rnaAsignacionInsumos;
}());
exports.rnaAsignacionInsumos = rnaAsignacionInsumos;
//# sourceMappingURL=rnaAsignacionInsumos.modelo.js.map