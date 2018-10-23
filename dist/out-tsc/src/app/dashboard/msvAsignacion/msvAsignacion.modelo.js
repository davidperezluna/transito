"use strict";
var MsvAsignacion = (function () {
    function MsvAsignacion(desde, hasta, fechaAsignacion, numeroResolucion, sedeOperativaId, funcionarioId, id) {
        this.desde = desde;
        this.hasta = hasta;
        this.fechaAsignacion = fechaAsignacion;
        this.numeroResolucion = numeroResolucion;
        this.sedeOperativaId = sedeOperativaId;
        this.funcionarioId = funcionarioId;
        this.id = id;
    }
    return MsvAsignacion;
}());
exports.MsvAsignacion = MsvAsignacion;
//# sourceMappingURL=msvAsignacion.modelo.js.map