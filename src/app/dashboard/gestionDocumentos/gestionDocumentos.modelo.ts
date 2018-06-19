export class GestionDocumentos{
	constructor(
		public id: number,
		public identificacion: string,
		public direccion: string,
		public telefono: string,
		public correoElectronico: string,
		public numeroOficio: string,
		public tipo: string,
		public nombre: string,
		public nombreEntidad: string
	){}
}