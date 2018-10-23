"use strict";
var GdDocumento = (function () {
    function GdDocumento(numeroRadicado, folios, numeroOficio, descripcion, detalleLlegada, fechaLlegada, vigencia, entidadNombre, entidadCargo, idSedeOperativa, idTipoCorrespondencia, idMedioCorrespondenciaLlegada, id) {
        this.numeroRadicado = numeroRadicado;
        this.folios = folios;
        this.numeroOficio = numeroOficio;
        this.descripcion = descripcion;
        this.detalleLlegada = detalleLlegada;
        this.fechaLlegada = fechaLlegada;
        this.vigencia = vigencia;
        this.entidadNombre = entidadNombre;
        this.entidadCargo = entidadCargo;
        this.idSedeOperativa = idSedeOperativa;
        this.idTipoCorrespondencia = idTipoCorrespondencia;
        this.idMedioCorrespondenciaLlegada = idMedioCorrespondenciaLlegada;
        this.id = id;
    }
    return GdDocumento;
}());
exports.GdDocumento = GdDocumento;
//# sourceMappingURL=gdDocumento.modelo.js.map