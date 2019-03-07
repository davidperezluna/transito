export class FroFacTramite{
	constructor(
		public fechaCreacion: string,
		public fechaVencimiento: string,
		public numero: string,
		public valorBruto: number,
		public estado: boolean,
		public idModulo: boolean,
		public idTipoRecaudo: number,
		public idVehiculo: number,
		public idOrganismoTransito: number,
		public idCiudadano: number,
		public id: number,
	){}
}