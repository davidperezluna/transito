export class VhloRegistroRemolque{
	constructor(
		public alto: string,
		public largo: string,
		public ancho: string,
		public numeroEjes: string,
		public cargaUtil: string,
		public pesoVacio: string,
		public referencia: string,
		public numeroFth: string,
		public modelo: string,
		public placa: string,
		public serie: string,
		public vin: string,
		public tipoMatricula: string,
		public numeroFactura:string,
		public fechaFactura:string,
		public valor:string,
		public idCarroceria: number,
		public idMarca: number,
		public idLinea: number,
		public idClase: number,
		public idOrganismoTransito: number,
		public id: number,
	){}
}