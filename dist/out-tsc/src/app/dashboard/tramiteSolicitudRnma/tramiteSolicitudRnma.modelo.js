"use strict";
var TramiteSolicitud = (function () {
    function TramiteSolicitud(id, tramiteFacturaId, solicitanteId, vehiculoId, ciudadanoId, observacion, documentacion, datos) {
        this.id = id;
        this.tramiteFacturaId = tramiteFacturaId;
        this.solicitanteId = solicitanteId;
        this.vehiculoId = vehiculoId;
        this.ciudadanoId = ciudadanoId;
        this.observacion = observacion;
        this.documentacion = documentacion;
        this.datos = datos;
    }
    return TramiteSolicitud;
}());
exports.TramiteSolicitud = TramiteSolicitud;
//# sourceMappingURL=tramiteSolicitudRnma.modelo.js.map