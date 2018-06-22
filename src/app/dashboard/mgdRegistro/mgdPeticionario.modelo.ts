export class MgdPeticionario{
	constructor(
		public id:number,
		public tipoIdentificacionId:number,
		public primerNombre:string,
		public segundoNombre:string,
		public primerApellido:string,
		public segundoApellido:string,
		public identificacion:string,
		public entidadNombre:string,
		public entidadCargo:string,
		public direccion:string,
		public telefono:string,
		public correoElectronico:string
	){}
}