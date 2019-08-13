export class BpOrdenPago{
	constructor(
		public fecha: string,
		public tipo: string,
		public concepto: string,
		public valor: number,
		public idRegistroCompromiso:number,
		public id:number
	){}
}