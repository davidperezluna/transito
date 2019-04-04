export class UserEmpresa{
	constructor(
		public nit: string,
		public nombre: string,
		public telefono: number,
		public direccion: string,
		public correo: string,
		public estado: number,
		public idTipoIdentificacion: number,
		public idEmpresaServicio: number,
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
		public fechaInicial: string,
		public idTipoEmpresa: string,
		public idMunicipio: number,
		public idTipoSociedad: number,
		public idCiudadano: number,
		public idModalidadTransporte: number,
		public id: number,
	){}
}