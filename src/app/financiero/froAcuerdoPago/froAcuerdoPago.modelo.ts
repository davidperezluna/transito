export class FroAcuerdoPago{
	constructor(
		public numeroCuotas: number,
		public valorBruto: number,
		public valorMora: number,
		public valorNeto: number,
		public valorCuotaInicial: number,
		public porcentajeInicial: number,
		public fechaFinal: string,
		public diasMoraTotal: number,
		public comparendos: string,
		public idInteres: number,
		public id: number
	){}
}