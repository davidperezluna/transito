"use strict";
var Sucursal = (function () {
    function Sucursal(id, nombre, sigla, municipioId, direccion, telefono, celular, correo, fax, estado, empresaId) {
        this.id = id;
        this.nombre = nombre;
        this.sigla = sigla;
        this.municipioId = municipioId;
        this.direccion = direccion;
        this.telefono = telefono;
        this.celular = celular;
        this.correo = correo;
        this.fax = fax;
        this.estado = estado;
        this.empresaId = empresaId;
    }
    return Sucursal;
}());
exports.Sucursal = Sucursal;
//# sourceMappingURL=sucursal.modelo.js.map