export class TramiteSolicitud{
	constructor(
		public id: number,
		public tramiteFacturaId: number,
		public observacion: string,
		public documentacion: boolean,
		public datos: string
	){}
}