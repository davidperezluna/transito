export class Comparendo{
	constructor(
		public id:number,
		public municipioId:number,
		public vehiculoId:number,
		public ciudadanoId:number,
		public agenteTransitoId:number,
		public segimientoEntregaId:number,
		public numeroOrden:string,
		public fechaDiligenciamiento:string,
		public lugarInfraccion:string,
		public barrioInfraccion:string,
		public observacionesAgente:string,
		public observacionesDigitador:string,
		public tipoInfractor:string,
		public tarjetaOperacionInfractor:number,
		public fuga:string,
		public accidente:string,
		public polca:string,
		public fechaNotificacion:string,
		public gradoAlchoholemia:string,
		public retencionLicencia:string,
	){}
} 