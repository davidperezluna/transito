export class MflInfraccion{
	constructor(
		public nombre: string,
		public codigo: string,
		public descripcion: string,
		public retiene: boolean,
		public inmoviliza: boolean,
		public dias: number,
		public id:number,
		public infraccionCategoriaId: number,
	){}
}