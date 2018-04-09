export class Comparendo{
	constructor(
		public id:number,
		public municipioId:number,
		public vehiculoId:number,
		public ciudadanoId:number,
		public agenteTransitoId:number,
		public numeroOrden:string,
		public fechaDiligenciamiento:string,
		public fechaNotificacion:string,
		public lugarInfraccion:string,
		public barrioInfraccion:string,
		public observacionesAgente:string,
		public fuga:string,
		public accidente:string,
		public polca:string,
		public gradoAlchoholemia:string
	){}
} 