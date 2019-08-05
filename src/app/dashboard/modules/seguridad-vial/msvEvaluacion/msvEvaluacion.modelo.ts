export class MsvEvaluacion{
	constructor(
		public id:number,
		public numero: string,
		public parametro: string,
		public item: string,
		public variable: string,
		public criterio: string,
		public aplica: boolean,
		public evidencia: boolean,
		public responde: boolean,
		public observacion: string,
		public estado: boolean,
		public aval: boolean
	){}
}