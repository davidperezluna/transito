export class RegistroDocumento{
	constructor(
		public id:number,
		public codigoRadicado:string,
		public tiempoRadicacion:string,
		public asuntoDocumento:string,
		public estadoDocumento:string,
		public urlDocumentoEscaneado:string,
		public tiempoTranscurrido:string,
		public numeroDeFolios:string,
		public tipoDocumentoId:string,
		public estado:string
	){}
}