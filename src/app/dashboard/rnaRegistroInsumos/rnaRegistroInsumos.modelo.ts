export class rnaRegistroInsumos{
	constructor(
		public id:number,
		public estado:string,
		public numeroActa:string,
		public fecha:string,
		public rangoInicio:string,
		public rangoFin:string,
		public referencia:string,
		public cantidad:number,
		public empresaId:string,
		public sedeOperativaId:string,
		public casoInsumoId:string,
		
	){}
}