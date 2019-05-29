export class UserMedidaCautelar{
	constructor(
		public numeroOficio: string,
		public numeroRadicado: string,
		public observaciones: string,
		public fechaRegistro: string,
		public fechaInicio: string,
		public fechaExpiracion: string,
		public demandados: any,
		public idEntidadJudicial: number,
		public idCausalLimitacion: number,
		public idTipoProcesoLimitacion: number,
		public idDepartamento: number,
		public idMunicipio: number,
	){}
}