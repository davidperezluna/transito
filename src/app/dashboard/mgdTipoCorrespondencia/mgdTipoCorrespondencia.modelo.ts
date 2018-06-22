export class MgdTipoCorrespondencia{
	constructor(
		public id:number,
		public nombre: string,
		public diasVigencia: string,
		public editable: boolean,
		public prohibicion: boolean
	){}
}