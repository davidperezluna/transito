"use strict";
var MsvEvaluacion = (function () {
    function MsvEvaluacion(id, numero, parametro, item, variable, criterio, aplica, evidencia, responde, observacion, estado) {
        this.id = id;
        this.numero = numero;
        this.parametro = parametro;
        this.item = item;
        this.variable = variable;
        this.criterio = criterio;
        this.aplica = aplica;
        this.evidencia = evidencia;
        this.responde = responde;
        this.observacion = observacion;
        this.estado = estado;
    }
    return MsvEvaluacion;
}());
exports.MsvEvaluacion = MsvEvaluacion;
//# sourceMappingURL=msvEvaluacion.modelo.js.map