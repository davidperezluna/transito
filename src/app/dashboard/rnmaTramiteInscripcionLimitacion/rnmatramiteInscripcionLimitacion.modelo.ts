export class RnmaTramiteInscripcionLimitacion{
	constructor(

		public fechaRadicacion:string,
		public municipioId:number,
		public departamentoId:number,
		public ciudadanoDemandadoId:number,
		public ciudadanoDemandanteId:number,
		public nOrdenJudicial:string,
		public limitacionId:number,
		public fechaExpedicion:string,
		public tipoProcesoId:number,
		public entidadJudicialId:number,
		public causalLimitacionId:number,
		public observaciones:string,
		public datos:string
	){}
}