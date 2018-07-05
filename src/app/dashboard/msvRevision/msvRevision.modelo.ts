export class msvRevision{
	constructor(
		public id:number,
		public fecha_recepcion: string,
		public fecha_devolucion: string,
		public fecha_otorgamiento: string,
		public estado: boolean,
		public empresaId: number,
		public personaContacto: string,
		public cargo: string,
		public funcionario: string,
		public correo: string

	){}
}