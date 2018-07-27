export class RegistroRemolque{
	constructor(
		public id: number,
		public alto: string,
		public largo: string,
		public ancho: string,
		public numeroEjes: string,
		public cargaUtil: string,
		public pesoVacio: string,
		public referencia: string,
		public numeroFth: string,
		public rut: string,
		public origenRegistroId: string,
		public condicionIngresoId: string,
		public vehiculoPlaca: string,
		public vehiculoSerie: string,
		public vehiculoCarroceriaId: number,
		public vehiculoVin: string,
		public vehiculoMarcaId: number,
		public vehiculoModelo: string,
		public vehiculoClaseId: number,


	){}
}