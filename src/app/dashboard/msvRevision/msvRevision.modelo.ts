export class msvRevision{
	constructor(
		public id:number,
		public fechaRecepcion: string,
		public fechaDevolucion: string,
		public fechaOtorgamiento: string,
		public estado: boolean,
		public empresaId: number,
		public personaContacto: string,
		public cargo: string,
		public funcionarioId: string,
		public correo: string

	){}
}