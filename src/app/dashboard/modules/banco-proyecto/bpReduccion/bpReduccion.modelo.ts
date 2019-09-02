export class BpReduccion{
	constructor(
		public numero: string,
		public fecha: string,
		public justificacion: string,
		public valor: number,
		public tipoReduccion:number,
		public idFuncionario:number,
		public idCdp:number,
		public idRegistroCompromiso:number,
		public id:number
	){}
}