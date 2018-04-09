export class Tramite{
	constructor(
		public id:number,
		public moduloId: number,
		public nombre:string,
		public valor:number,
		public redondeo:boolean,
		public unidad:number,
		public afectacion:boolean
	){}
}