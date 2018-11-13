export class TramiteSolicitud{
	constructor(
		public id: number,
		public tramiteFacturaId: number,
		public solicitanteId: number,
		public ciudadanoId: number,
		public vehiculoId: number,
		public observacion: string,
		public documentacion: boolean,
		public datos: any
	){}
}