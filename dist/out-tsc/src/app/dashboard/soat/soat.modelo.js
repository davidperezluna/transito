"use strict";
var Soat = (function () {
    function Soat(idVehiculo, fechaExpedicion, fechaVigencia, fechaVencimiento, numeroPoliza, nombreEmpresa, idMunicipio, id) {
        this.idVehiculo = idVehiculo;
        this.fechaExpedicion = fechaExpedicion;
        this.fechaVigencia = fechaVigencia;
        this.fechaVencimiento = fechaVencimiento;
        this.numeroPoliza = numeroPoliza;
        this.nombreEmpresa = nombreEmpresa;
        this.idMunicipio = idMunicipio;
        this.id = id;
    }
    return Soat;
}());
exports.Soat = Soat;
//# sourceMappingURL=soat.modelo.js.map