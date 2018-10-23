"use strict";
var MsvSenialInventario = (function () {
    function MsvSenialInventario(inventario, fecha, unidad, direccion, latitud, longitud, codigo, nombre, valor, idTipo, idColor, cantidad, id) {
        this.inventario = inventario;
        this.fecha = fecha;
        this.unidad = unidad;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.codigo = codigo;
        this.nombre = nombre;
        this.valor = valor;
        this.idTipo = idTipo;
        this.idColor = idColor;
        this.cantidad = cantidad;
        this.id = id;
    }
    return MsvSenialInventario;
}());
exports.MsvSenialInventario = MsvSenialInventario;
//# sourceMappingURL=msvSenialInventario.modelo.js.map