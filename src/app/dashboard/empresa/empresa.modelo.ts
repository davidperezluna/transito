export class Empresa{
	constructor(
		public id: number,
		public municipioId: number,
		public tipoEmpresaId: number,
		public ciudadanoId: number,
		public nit: number,		
		public nombre: string,
		public telefono: number,
		public direccion: string,
		public correo: string,
		public direccionTrabajo: string,
		public estado: number,
	){}
}