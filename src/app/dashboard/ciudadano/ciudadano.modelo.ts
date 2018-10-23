export class Ciudadano{
	constructor(
		public numeroIdentificacionUsuario: number,
		public primerNombreUsuario: string,
		public segundoNombreUsuario: string,
		public primerApellidoUsuario: string,
		public segundoApellidoUsuario: string,
		public direccion: string,
		public telefonoUsuario: string,
		public correoUsuario: string,
		public direccionTrabajo: string,
		public sexo: string,
		public fechaExpedicionDocumento: string,
		public fechaNacimiento: string,
		public password: string,
		public id: number,
		public tipoIdentificacionUsuarioId: number,
		public municipioNacimientoId: number,
		public municipioResidenciaId: number,
		public generoId: number,
		public grupoSanguineoId: number,
		public idRole: number,
	){}
}