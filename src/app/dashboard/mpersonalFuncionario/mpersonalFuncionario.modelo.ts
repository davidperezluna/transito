export class MpersonalFuncionario{
	constructor(
		public id:number,
		public cargo: string,
		public actaPosesion: string,
		public resolucion: string,
		public tipoNombramiento: string,
		public numeroContrato: string,
		public fechaInicio: string,
		public fechaFin: string,
		public numeroPlaca: string,
		public inhabilidad: string,
		public novedad: string,
		public activo: boolean,
		public sedeOperativaId: number,
		public tipoContratoId: number,
		public identificacion: number
	){}
}