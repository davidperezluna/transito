export class PnalFuncionario{
	constructor(
		public actaPosesion: string,
		public resolucion: string,
		public numeroContrato: string,
		public objetoContrato: string,
		public fechaInicio: string,
		public fechaFin: string,
		public numeroPlaca: string,
		public novedad: string,
		public excel: boolean,
		public activo: string,
		public inhabilidad: string,
		public identificacion: number,
		public idTipoNombramiento: string,
		public idOrganismoTransito: number,
		public idCargo: number,
		public id: number
	){}
}