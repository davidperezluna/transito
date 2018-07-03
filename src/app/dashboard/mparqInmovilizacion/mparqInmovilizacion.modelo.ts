export class MparqInmovilizacion{
	constructor(
		public fechaIngreso: string,
		public numeroInventario: number,
		public hora: string,
		public gruaId: number,
		public comparendoId: number,
		public costoTrayectoId: number,
		public id:number
	){}
}