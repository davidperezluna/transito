export class GestionDocumentos{
	constructor(
		public id:number,
		public identificacionPeticionario:string,
		public direccionPeticionario:string,
		public telefonoPeticionario:string,
		public correoElectronico:string,
		public numeroOficio:string,
		public tipoPeticionario:string,
		public nombrePeticionario:string
	){}
}