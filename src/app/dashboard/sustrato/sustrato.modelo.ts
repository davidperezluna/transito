export class Sustrato{
	constructor(
		public estado: string,
		public descripcion: string,
		public desde: number,
		public hasta: number,
		public consecutivo: number,
		public impresion: boolean,
		public entregado: boolean,
		public sedeOperativaId: number,
		public moduloId: number,
		public claseId: number,
		public ciudadanoId: number,
		public facturaId: number,
	){}
}