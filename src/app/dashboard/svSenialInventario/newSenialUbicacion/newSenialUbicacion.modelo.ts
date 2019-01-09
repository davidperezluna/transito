export class SvSenialUbicacion{
	constructor(
		public fecha: string,
		public hora: string,
		public latitud: string,
		public longitud: string,
		public direccion: string,
		public cantidad: number,
		public idConector: number,
		public idSenial: number,
		public idEstado: number,
		public idMunicipio: number,
		public id: number
	){}
}