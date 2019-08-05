export class FroRecaudo {
    constructor(
        public id: number,
        public fecha: string,
        public valor: number,
        public valorMora: number,
        public valorFinanciacion: number,
        public valorCapital: number,
        public valorDescuento: number,
        public IdFroFactura: number,
        public IdSedeOperativa: number,
    ) { }
}
 