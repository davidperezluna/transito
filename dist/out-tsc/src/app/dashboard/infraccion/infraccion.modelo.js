"use strict";
var Infraccion = (function () {
    function Infraccion(id, codigo, descripcion, valor, inmovilizacion, suspensionLicencia) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
        this.inmovilizacion = inmovilizacion;
        this.suspensionLicencia = suspensionLicencia;
    }
    return Infraccion;
}());
exports.Infraccion = Infraccion;
//# sourceMappingURL=infraccion.modelo.js.map