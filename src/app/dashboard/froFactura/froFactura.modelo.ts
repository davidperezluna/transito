export class CvAcuerdoPago{
	constructor(
		public fecha: string,
		public numeroCuotas: number,
		public valorCapital: number,
		public valorCuotaInicial: number,
		public comparendos: string,
		public idPorcentajeInicial: number,
		public idInteres: number,
		public id: number
	){}
}