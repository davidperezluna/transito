"use strict";
var TramitePrecio = (function () {
    function TramitePrecio(id, tramiteId, moduloId, claseId, valor, fechaInicio, valorTotal, activo) {
        this.id = id;
        this.tramiteId = tramiteId;
        this.moduloId = moduloId;
        this.claseId = claseId;
        this.valor = valor;
        this.fechaInicio = fechaInicio;
        this.valorTotal = valorTotal;
        this.activo = activo;
    }
    return TramitePrecio;
}());
exports.TramitePrecio = TramitePrecio;
//# sourceMappingURL=tramitePrecio.modelo.js.map