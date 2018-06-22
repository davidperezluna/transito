export class MgdDocumento{
	constructor(
		public id: number,
		public numeroRadicado: number,
		public folios: number,
		public numeroOficio: string,
		public descripcion: string,
		public correoCertificadoLlegada: boolean,
		public nombreTransportadoraLlegada: string,
		public fechaLlegada: string,
		public numeroGuiaLlegada: string,
		public tipoCorrespondenciaId: number,
        public sedeOperativaId: number,
		public usuarioId: number
	){}
}