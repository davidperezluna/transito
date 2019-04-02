export class VhloRnaTramiteInscripcionLimitacion{
	constructor(
		public fechaRadicacion:string,
		public numeroOrdenJudicial:string,
		public datos:string,
		public fechaExpedicion:string,
		public observaciones:string,
		public idDemandado:number,
		public idDemandante:number,
		public idTipoProcesoLimitacion:number,
		public idEntidadJudicial:number,
		public idCausalLimitacion:number,
		public idTipoLimitacion:number,
		public idDepartamento:number,
		public idMunicipio:number,
	){}
}