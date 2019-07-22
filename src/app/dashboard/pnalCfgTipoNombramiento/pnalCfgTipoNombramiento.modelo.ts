export class PnalCfgTipoNombramiento{
	constructor(
		public nombre: string,
		public gestionable: boolean,
		public horarios: boolean,
		public prorroga: boolean,
		public id:number
	){}
}