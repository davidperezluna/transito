export class FacturaInfraccion{
	constructor(
		public id: number,
		public sedeOperativaId: number,
		public ciudadanoId: number,
		public fechaCreacion: string,
		public fechaVencimiento: string,
		public numero: string,
		public valorTotal: number,
		public estado: boolean
	){}
}