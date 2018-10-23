"use strict";
var GdRemitente = (function () {
    function GdRemitente(primerNombre, segundoNombre, primerApellido, segundoApellido, identificacion, direccion, telefono, correoElectronico, idTipoIdentificacion, id) {
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.identificacion = identificacion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico;
        this.idTipoIdentificacion = idTipoIdentificacion;
        this.id = id;
    }
    return GdRemitente;
}());
exports.GdRemitente = GdRemitente;
//# sourceMappingURL=gdRemitente.modelo.js.map