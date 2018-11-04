export class CvMedidaCautelar{
	constructor(
		public fechaRegistro: string,
		public fechaInico: number,
		public fechaExpiracion: number,
		public fechaLevantamiento: number,
		public numeroOficioInscripcion: number,
		public numeroOficioLevantamiento: number,
		public numeroRadicado: number,
		public observacionesInscripcion: number,
		public observacionesLevantamiento: number,
		public municipioInscripcion: number,
		public municipioLevantamiento: number,
		public entidadJudicialInscripcion: number,
		public entidadJudicialLevantamiento: number,
		public tipoMedidaCautelar: number,
	){}
}