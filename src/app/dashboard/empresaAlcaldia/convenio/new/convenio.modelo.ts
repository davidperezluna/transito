export class Convenio{
	constructor(
		public id: number,
		public numeroConvenio: number,
		public fechaConvenio: string,
		public fechaActaInicio: string,
		public fechaActaFin: string,
		public observacion: string,
		public empresa: string,
		public empresas: any =[],
	){}
}