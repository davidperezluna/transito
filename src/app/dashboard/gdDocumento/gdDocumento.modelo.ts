export class GdDocumento{
	constructor(
		public numeroRadicado: number,
		public folios: number,
		public numeroOficio: string,
		public descripcion: string,
		public detalleLlegada: string,
		public fechaLlegada: string,
		public vigencia: number,
		public entidadNombre: string,
		public entidadCargo: string,
		public idSedeOperativa: number,
		public idTipoCorrespondencia: number,
		public idMedioCorrespondenciaLlegada: number,
		public id: number,
	){}
}