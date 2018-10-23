"use strict";
var TramiteSolicitud = (function () {
    function TramiteSolicitud(id, tramiteFacturaId, solicitanteId, ciudadanoId, vehiculoId, observacion, documentacion, datos) {
        this.id = id;
        this.tramiteFacturaId = tramiteFacturaId;
        this.solicitanteId = solicitanteId;
        this.ciudadanoId = ciudadanoId;
        this.vehiculoId = vehiculoId;
        this.observacion = observacion;
        this.documentacion = documentacion;
        this.datos = datos;
    }
    return TramiteSolicitud;
}());
exports.TramiteSolicitud = TramiteSolicitud;
//# sourceMappingURL=tramiteSolicitud.modelo.js.map