export class Sustrato{
	constructor(
		public id: number,
		public estado: string,
		public desde: number,
		public hasta: number,
		public sedeOperativaId: number,
		public moduloId: number
	){}
}