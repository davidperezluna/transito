export class FroInfraccion{
	constructor(
		public codigo: string,
		public nombre: string,
		public descripcion: string,
		public retiene: boolean,
		public inmoviliza: boolean,
		public dias: number,
		public idInfraccionCategoria: number,
		public id:number,
	){}
}