export class RegistroMaquinaria{
	constructor(
		public id: number,
		public condicionSelected: string,
		public fechaIngreso: string,
		public pesoBruto: string,
		public cargaUtilMaxima: string,
		public rodajeSelected: string,
		public numeroEjes: string,
		public numeroLlantas: string,
		public tipoCabinaSelected: string,
		public altoTotal: string,
		public anchoTotal: string,
		public largoTotal: string,
		public subpartidaArancelaria: string,
		public tipoVehiculoId: number,
		public cfgOrigenVehiculoId: string,
		public cfgEmpresaGpsId: string,

		public numeroActivacion: string,
		public tipoDispositivo: string,
		public numeroImportacion: string,

		public vehiculoPlaca: string,
		public vehiculoSerie: string,
		public vehiculoVin: string,
		public vehiculoChasis: string,
		public vehiculoMotor: string,
		public vehiculoModelo: string,

		
		public vehiculoColorId: number,
		public vehiculoMarcaId: number,
		public vehiculoClaseId: number,
		public vehiculoLineaId: number,
		public vehiculoCarroceriaId: number,
		public vehiculoCombustibleId: number,

	){}
}