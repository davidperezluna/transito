export class FroAcuerdoPago{
	constructor(
		public numeroCuotas: number,
		public valorBruto: number,
		public valorMora: number,
		public valorNeto: number,
		public porcentajeInicial: number,
		public valorCuotaInicial: number,
		public porcentajeDescuento: number,
		public valorDescuento: number,
		public fechaComparendo: any,
		public fechaInicial: any,
		public fechaFinal: any,
		public diasMoraTotal: number,
		public idComparendo: number,
		public idInteres: number,
		public id: number
	){}
}