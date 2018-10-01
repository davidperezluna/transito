export class MgdDocumento{
	constructor(
		public id: number,
		public numeroRadicado: number,
		public folios: number,
		public numeroOficio: string,
		public descripcion: string,
		public correoCertificadoLlegada: string,
		public nombreTransportadoraLlegada: string,
		public fechaLlegada: string,
		public numeroGuiaLlegada: string,
		public vigencia: number,
		public tipoCorrespondenciaId: number,
        public sedeOperativaId: number,
		public usuarioId: number,
		public entidadNombre:string,
		public entidadCargo:string,
	){}
}