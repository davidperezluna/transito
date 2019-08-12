export class BpRegistroCompromiso{
	constructor(
		public fechaExpedicion: string,
		public contratoNumero: string,
		public contratoTipo: string,
		public contratoEstado: string,
		public observaciones: string,
		public valor: number,
		public id:number
	){}
}