export class TramiteSolicitud{
	constructor(
		public id: number,
		public tramiteFacturaId: number,
		public solicitanteId: number,
		public vehiculoId: number,
		public ciudadanoId: number,
		public observacion: string,
		public documentacion: boolean,
		public datos: string
	){}
}