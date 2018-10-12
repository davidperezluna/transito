export class GdRemitente{
	constructor(
		public primerNombre:string,
		public segundoNombre:string,
		public primerApellido:string,
		public segundoApellido:string,
		public identificacion:string,
		public direccion:string,
		public telefono:string,
		public correoElectronico:string,
		public idTipoIdentificacion:number,
		public id:number,
	){}
}