export class SvRevision{
	constructor(
		public id:number,
		public numeroRadicado:number,
		public fechaRecepcion: string,
		public fechaRevision: string,
		public fechaDevolucion: string,
		public fechaOtorgamiento: string,
		public fechaVisitaControl1: string,
		public observacionVisita1: string,
		public fechaVisitaControl2: string,
		public observacionVisita2: string,
		public estado: boolean,
		public empresaId: number,
		public personaContacto: string,
		public cargo: string,
		public funcionarioId: number,
		public correo: string

	){}
}