export class FroTrtePrecio {
    constructor(
        public id: number,
        public nombre: string,
        public valor: number,
        public fechaInicio: string,
        public valorConcepto: string,
        public valorTotal: string,
        public conceptos: any,
        public idTramite: string,
        public idClase: string,
        public idModulo: string,
    ) { }
}