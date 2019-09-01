export class BpRegistroCompromiso{
	constructor(
		public fechaExpedicion: string,
		public numero: string,
		public contratoNumero: string,
		public contratoTipo: string,
		public contratoEstado: string,
		public valorApropiado:number,
		public id:number
	){}
}