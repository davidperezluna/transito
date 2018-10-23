"use strict";
var rnaRegistroInsumos = (function () {
    function rnaRegistroInsumos(id, estado, numeroActa, fecha, rangoInicio, rangoFin, referencia, cantidad, empresaId, sedeOperativaId, casoInsumoId) {
        this.id = id;
        this.estado = estado;
        this.numeroActa = numeroActa;
        this.fecha = fecha;
        this.rangoInicio = rangoInicio;
        this.rangoFin = rangoFin;
        this.referencia = referencia;
        this.cantidad = cantidad;
        this.empresaId = empresaId;
        this.sedeOperativaId = sedeOperativaId;
        this.casoInsumoId = casoInsumoId;
    }
    return rnaRegistroInsumos;
}());
exports.rnaRegistroInsumos = rnaRegistroInsumos;
//# sourceMappingURL=rnaRegistroInsumos.modelo.js.map