export class MsvRegistroIpat{
	constructor(

		public fechaRadicacion:string,
		public municipioId:number,
		public departamentoId:number,
		public ciudadanoDemandadoId:number,
		public ciudadanoDemandanteId:number,
		public otroClaseAccidente:string,
		public otroObjetoFijo:string,
		public limitacionId:number,
		public fechaAccidente:string,
		public fechaLevantamiento:string,
		public tipoProcesoId:number,
		public entidadJudicialId:number,
		public causalLimitacionId:number,
		public observaciones:string,
		public datos:string
	){}
}