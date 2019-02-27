export class UserCiudadano{
	constructor(
		public primerNombre: string,
		public segundoNombre: string,
		public primerApellido: string,
		public segundoApellido: string,
		public identificacion: number,
		public fechaNacimiento: string,
		public fechaExpedicionDocumento: string,
		public telefono: string,
		public correo: string,
		public direccionPersonal: string,
		public direccionTrabajo: string,
		public idTipoIdentificacion: number,
		public idMunicipioNacimiento: number,
		public idMunicipioResidencia: number,
		public idGenero: number,
		public idGrupoSanguineo: number,
		public id: number,
	){}
}