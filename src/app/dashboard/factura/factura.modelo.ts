export class Factura{
	constructor(
		public id: number,
		public solicitanteId: number,
		public apoderadoId: number,
		public sedeOperativaId: number,
		public fechaCreacion: string,
		public numero: number,
		public valorBruto: string,
		public observacion: string,
		public estado: boolean
	){}
}