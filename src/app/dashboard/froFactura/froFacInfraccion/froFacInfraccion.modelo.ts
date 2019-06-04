export class FroFacInfraccion{
	constructor(
		public valor: number,
		public interes: number,
		public numero: string,
		public comparendos: any,
		public idOrganismoTransito: number,
		public idTipoRecaudo: number,
		public id: number
	){}
}