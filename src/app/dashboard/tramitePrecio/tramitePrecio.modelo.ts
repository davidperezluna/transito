export class TramitePrecio{
	constructor(
		public id:number,
		public tramiteId:number,
		public tipoVehiculoId:number,
		public valor:string,
		public anio:string,
		public smldv:string,
		public valorEstampilla:string,
	){}
}