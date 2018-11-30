export class RegistroRemolque{
	constructor(
		public alto: string,
		public largo: string,
		public ancho: string,
		public numeroEjes: string,
		public cargaUtil: string,
		public pesoVacio: string,
		public referencia: string,
		public numeroFth: string,
		public numeroRunt: string,
		public modelo: string,
		public placa: string,
		public serie: string,
		public vin: string,
		public idOrigenRegistro: string,
		public idCondicionIngreso: string,
		public idCarroceria: number,
		public idLinea: number,
		public idClase: number,
		public idSedeOperativa: number,
		public id: number,
		public numeroFactura:string,
		public fechaFactura:string,
		public valor:string,

	){}
}