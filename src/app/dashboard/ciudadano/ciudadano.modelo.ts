export class Ciudadano{
	constructor(
		public id:number,
		public tipoIdentificacionId:number,
		public municipioNacimientoId:number,
		public municipioResidenciaId:number,
		public numeroIdentificacion:number,
		public primerNombre:string,
		public segundoNombre:string,
		public PrimerApellido:string,
		public SegundoApellido:string,
		public direccion:string,
		public telefono:string,
		public direccionTrabajo:string,
		public sexo:string,
		public grupoSanguineo:string,
		public fechaExpedicionDocumento:string,
		public edad:number,
	){}
}