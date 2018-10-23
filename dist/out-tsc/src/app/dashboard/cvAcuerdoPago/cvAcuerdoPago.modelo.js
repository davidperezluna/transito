"use strict";
var CvAcuerdoPago = (function () {
    function CvAcuerdoPago(fecha, numeroCuotas, valorCapital, valorCuotaInicial, comparendos, idPorcentajeInicial, idInteres, id) {
        this.fecha = fecha;
        this.numeroCuotas = numeroCuotas;
        this.valorCapital = valorCapital;
        this.valorCuotaInicial = valorCuotaInicial;
        this.comparendos = comparendos;
        this.idPorcentajeInicial = idPorcentajeInicial;
        this.idInteres = idInteres;
        this.id = id;
    }
    return CvAcuerdoPago;
}());
exports.CvAcuerdoPago = CvAcuerdoPago;
//# sourceMappingURL=cvAcuerdoPago.modelo.js.map