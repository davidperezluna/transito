"use strict";
var CfgAuditoria = (function () {
    function CfgAuditoria(id, nombre, diasVigencia, editable, prohibicion) {
        this.id = id;
        this.nombre = nombre;
        this.diasVigencia = diasVigencia;
        this.editable = editable;
        this.prohibicion = prohibicion;
    }
    return CfgAuditoria;
}());
exports.CfgAuditoria = CfgAuditoria;
//# sourceMappingURL=cfgAuditoria.modelo.js.map