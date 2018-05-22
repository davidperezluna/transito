export class Empresa{
	constructor(
		public id: number,
		public nombre: string,
		public sigla: string,
		public nit: string,
		public dv: number,
		public capitalPagado: string,
		public capitalLiquido: string,
		public empresaPrestadora: boolean,
		public certificadoExistencial: string,
		public tipoSociedadId: number,
		public tipoIdentificacionId: number,
		public municipioId: number,
		public ciudadanoId: number,
		public telefono: number,
		public direccion: string,
		public correo: string,
		public direccionTrabajo: string,
		public nroRegistroMercantil: string,
		public estado: number,
		public fechaVencimientoRegistroMercantil:string,
	){}
}