"use strict";
var TramiteSolicitudRnc = (function () {
    function TramiteSolicitudRnc(id, tramiteFacturaId, solicitanteId, vehiculoId, observacion, documentacion, datos) {
        this.id = id;
        this.tramiteFacturaId = tramiteFacturaId;
        this.solicitanteId = solicitanteId;
        this.vehiculoId = vehiculoId;
        this.observacion = observacion;
        this.documentacion = documentacion;
        this.datos = datos;
    }
    return TramiteSolicitudRnc;
}());
exports.TramiteSolicitudRnc = TramiteSolicitudRnc;
//# sourceMappingURL=tramiteSolicitudRnc.modelo.js.map