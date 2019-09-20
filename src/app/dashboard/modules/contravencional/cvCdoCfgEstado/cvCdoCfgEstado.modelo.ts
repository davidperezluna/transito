export class CvCdoCfgEstado{
	constructor(
		public nombre: string,
		public codigo: string,
		public sigla: string,
		public dias: number,
		public simit: boolean,
		public habiles: boolean,
		public actualiza: boolean,
		public finaliza: boolean,
		public reparto: boolean,
		public idFormato:number,
		public id:number
	){}
}