export class VhloLimitacion{
	constructor(
		public fechaRadicacion: string,
		public numeroOrdenJudicial: string,
		public fechaExpedicion: string,
		public observaciones: string,
		public vehiculos: any,
		public demandantes: any,
		public idDemandado: number,
		public idTipoProcesoLimitacion: number,
		public idEntidadJudicial: number,
		public idCausalLimitacion: number,
		public idTipoLimitacion: number,
		public idDepartamento: number,
		public idMunicipio: number,
	){}
}