export class TramitePrecio{
	constructor(
		public id:number,
		public tramiteId:number,
		public moduloId:number,
		public claseId:number,
		public valor:string,
		public fechaInicio:string,
		public valorTotal:string,
		public activo:string,
	){}
}