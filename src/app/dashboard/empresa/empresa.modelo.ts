export class Empresa{
	constructor(
		public id: number,
		public municipioId: number,
		public tipoSociedadId: number,
		public ciudadanoId: number,
		public nit: string,
		public nombre: string,
		public telefono: number,
		public direccion: string,
		public correo: string,
		public estado: number,
		public tipoIdentificacionId: number,
		public cfgEmpresaServicioId: number,
		public dv: number,
		public celular: number,
		public fax: number,
		public sigla: string,
		public capitalPagado: string,
		public capitalLiquido: string,
		public tipoEntidad:string,
		public certificadoExistencial: string,
		public empresaPrestadora: boolean,
		public nroRegistroMercantil: string,
		public fechaVencimientoRegistroMercantil:string,
		public direccionTrabajo: string,
		public fechaInicial: string
	){}
}