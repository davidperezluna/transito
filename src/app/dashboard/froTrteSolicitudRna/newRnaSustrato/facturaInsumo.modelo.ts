export class FacturaInsumo{
	constructor(
		public descripcion: string,
		public entregado: boolean,
		public idInsumo: number,
		public idCiudadano: number,
		public idFactura: number,
	){}
}