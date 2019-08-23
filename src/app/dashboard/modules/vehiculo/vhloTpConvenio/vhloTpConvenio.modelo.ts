export class VhloTpConvenio{
	constructor(
		public id: number,
		public numeroConvenio: number,
		public fechaConvenio: string,
		public fechaActaInicio: string,
		public fechaActaFin: string,
		public numeroCupos: number,
		public observacion: string,
		public empresa: string,
		public empresas: any =[],
	){}
}