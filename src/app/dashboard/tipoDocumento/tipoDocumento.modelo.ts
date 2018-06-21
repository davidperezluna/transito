export class TipoDocumento{
	constructor(
		public id: number,
		public nombre: string,
		public diasVigencia: string,
		public codigo: string,
		public editable: boolean
	){}
}
