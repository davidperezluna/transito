"use strict";
var FacturaInsumo = (function () {
    function FacturaInsumo(descripcion, entregado, insumoId, ciudadanoId, facturaId) {
        this.descripcion = descripcion;
        this.entregado = entregado;
        this.insumoId = insumoId;
        this.ciudadanoId = ciudadanoId;
        this.facturaId = facturaId;
    }
    return FacturaInsumo;
}());
exports.FacturaInsumo = FacturaInsumo;
//# sourceMappingURL=facturaInsumo.modelo.js.map