export class PqoInmovilizacion{
	constructor(
		public placa: string,
		public motor: string,
		public chasis: string,
		public fechaInmovilizacion: string,
		public horaInmovilizacion: string,
		public numeroComparendo: number,
		public numeroInventario: number,
		public costoGrua: number,
		public lugar: string,
		public observaciones: string,
		public idMarca: number,
		public idLinea: number,
		public idClase: number,
		public idColor: number,
		public idGrua: number,
		public idPatio: number,
		public idFuncionario: number,
		public id:number
	){}
}