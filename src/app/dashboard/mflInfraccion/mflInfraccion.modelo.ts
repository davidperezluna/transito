export class MflInfraccion{
	constructor(
		public nombre: string,
		public codigo: string,
		public descripcion: string,
		public id:number,
		public infraccionCategoriaId: number,
	){}
}