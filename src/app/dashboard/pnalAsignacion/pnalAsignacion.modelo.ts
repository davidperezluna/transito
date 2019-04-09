export class PnalAsignacion{
	constructor(
		public desde: number,
		public hasta: number,
		public rangos: number,
		public fechaAsignacion: string,
		public numeroResolucion: string,
		public idOrganismoTransito: number,
		public idFuncionario: number,
		public id:number
	){}
}