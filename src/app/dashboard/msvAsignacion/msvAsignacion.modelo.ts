export class MsvAsignacion{
	constructor(
		public desde: number,
		public hasta: number,
		public fechaAsignacion: string,
		public numeroResolucion: string,
		public sedeOperativaId: number,
		public funcionarioId: number,
		public id:number
	){}
}