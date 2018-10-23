"use strict";
var Ciudadano = (function () {
    function Ciudadano(id, tipoIdentificacionUsuarioId, municipioNacimientoId, municipioResidenciaId, generoId, grupoSanguineoId, numeroIdentificacionUsuario, primerNombreUsuario, segundoNombreUsuario, primerApellidoUsuario, segundoApellidoUsuario, direccion, telefonoUsuario, correoUsuario, direccionTrabajo, sexo, fechaExpedicionDocumento, fechaNacimiento, edad) {
        this.id = id;
        this.tipoIdentificacionUsuarioId = tipoIdentificacionUsuarioId;
        this.municipioNacimientoId = municipioNacimientoId;
        this.municipioResidenciaId = municipioResidenciaId;
        this.generoId = generoId;
        this.grupoSanguineoId = grupoSanguineoId;
        this.numeroIdentificacionUsuario = numeroIdentificacionUsuario;
        this.primerNombreUsuario = primerNombreUsuario;
        this.segundoNombreUsuario = segundoNombreUsuario;
        this.primerApellidoUsuario = primerApellidoUsuario;
        this.segundoApellidoUsuario = segundoApellidoUsuario;
        this.direccion = direccion;
        this.telefonoUsuario = telefonoUsuario;
        this.correoUsuario = correoUsuario;
        this.direccionTrabajo = direccionTrabajo;
        this.sexo = sexo;
        this.fechaExpedicionDocumento = fechaExpedicionDocumento;
        this.fechaNacimiento = fechaNacimiento;
        this.edad = edad;
    }
    return Ciudadano;
}());
exports.Ciudadano = Ciudadano;
//# sourceMappingURL=ciudadano.modelo.js.map