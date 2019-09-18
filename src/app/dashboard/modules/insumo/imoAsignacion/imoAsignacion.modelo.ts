export class ImoAsignacion{
	constructor(
		public id:number,
		public numero:number,
		public fecha:string,
		public tipo:string,
		public estado:string,
		public rangoInicio:string,
		public rangoFin:string,
		public sedeOperativaId:string,
		public casoInsumoId:string,
		public loteInsumoId:string,
		public idFuncionario:string,
	){}
}