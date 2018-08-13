export class FacturaInsumo{
	constructor(
		public descripcion: string,
		public entregado: boolean,
		public insumoId: number,
		public ciudadanoId: number,
		public facturaId: number,
	){}
}