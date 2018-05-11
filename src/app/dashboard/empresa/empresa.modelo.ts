export class Empresa{
	constructor(
		public id: number,
		public nombre: string,
		public sigla: string,
		public nit: string,
		public capitalPagado: string,
		public patrimonioLiquido: string,
		public empresaPrestadora: boolean,
		public certificadoExistencial: string,
		public tipoSociedadId: number,
		public municipioId: number,
		public ciudadanoId: number,		
		public telefono: number,
		public direccion: string,
		public correo: string,
		public direccionTrabajo: string,
		public estado: number,
	){}
}