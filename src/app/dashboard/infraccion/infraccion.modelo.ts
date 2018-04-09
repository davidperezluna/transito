export class Infraccion{
	constructor(
		public id:number,
		public codigo:string,
		public descripcion:string,
		public valor:number,
		public inmovilizacion:boolean,
		public suspensionLicencia:boolean
	){}
}