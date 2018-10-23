"use strict";
var MpersonalAsignacion = (function () {
    function MpersonalAsignacion(desde, hasta, fechaAsignacion, numeroResolucion, sedeOperativaId, funcionarioId, id) {
        this.desde = desde;
        this.hasta = hasta;
        this.fechaAsignacion = fechaAsignacion;
        this.numeroResolucion = numeroResolucion;
        this.sedeOperativaId = sedeOperativaId;
        this.funcionarioId = funcionarioId;
        this.id = id;
    }
    return MpersonalAsignacion;
}());
exports.MpersonalAsignacion = MpersonalAsignacion;
//# sourceMappingURL=mpersonalAsignacion.modelo.js.map