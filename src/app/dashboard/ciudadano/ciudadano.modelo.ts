export class Ciudadano{
	constructor(
		public id: number,
		public tipoIdentificacionId: number,
		public municipioNacimientoId: number,
		public municipioResidenciaId: number,
		public generoId: number,
		public grupoSanguineoId: number,
		public numeroIdentificacion: number,
		public primerNombre: string,
		public segundoNombre: string,
		public primerApellido: string,
		public segundoApellido: string,
		public direccion: string,
		public telefono: string,
		public correo: string,
		public direccionTrabajo: string,
		public sexo: string,
		public fechaExpedicionDocumento: string,
		public edad: number,
	){}
}