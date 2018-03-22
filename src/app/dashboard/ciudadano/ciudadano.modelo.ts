export class Ciudadano{
	constructor(
		public id:number,
		public tipoIdentificacionId:number,
		public municipioNacimientoId:number,
		public municipioResidenciaId:number,
		public numeroIdentificacion:number,
		public nombres:string,
		public apellidos:string,
		public direccion:string,
		public telefono:string,
		public direccionTrabajo:string,
		public sexo:string,
		public grupoSanguineo:string,
		public fechaExpedicionDocumento:string,
		public edad:number,
	){}
}