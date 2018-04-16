export class TramiteSolicitud{
	constructor(
		public id: number,
		public vehiculoId: number,
		public tramiteFacturaId: number,
		public observacion: string,
		public documentacion: boolean
	){}
}