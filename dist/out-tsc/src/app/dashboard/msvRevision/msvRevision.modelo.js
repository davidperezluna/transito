"use strict";
var MsvRevision = (function () {
    function MsvRevision(id, fechaRecepcion, fechaDevolucion, fechaOtorgamiento, estado, empresaId, personaContacto, cargo, funcionarioId, correo) {
        this.id = id;
        this.fechaRecepcion = fechaRecepcion;
        this.fechaDevolucion = fechaDevolucion;
        this.fechaOtorgamiento = fechaOtorgamiento;
        this.estado = estado;
        this.empresaId = empresaId;
        this.personaContacto = personaContacto;
        this.cargo = cargo;
        this.funcionarioId = funcionarioId;
        this.correo = correo;
    }
    return MsvRevision;
}());
exports.MsvRevision = MsvRevision;
//# sourceMappingURL=msvRevision.modelo.js.map