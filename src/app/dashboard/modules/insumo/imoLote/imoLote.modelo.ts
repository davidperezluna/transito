export class ImoLote{
	constructor(
		public id:number,
		public estado:string,
		public numeroActa:string,
		public fecha:string,
		public rangoInicio:string,
		public rangoFin:string,
		public referencia:string,
		public cantidad:number,
		public idEmpresa:string,
		public idOrganismoTransito:string,
		public imoCfgTipo:string,
	){}
}