export class CvCdoTrazabilidad{
	constructor(
		public fecha: string,
		public hora: string,
		public observaciones:string,
		public idComparendo:number,
		public idComparendoEstado:number,
		public id:number
	){}
}