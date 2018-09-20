export class MsvSenialInventario{
	constructor(
		public inventario: number,
		public fecha: string,
		public unidad: string,
		public direccion: string,
		public latitud: string,
		public longitud: string,
		public codigo: string,
		public nombre: string,
		public valor: number,
		public idTipo: number,
		public idColor: number,
		public cantidad: number,
		public id: number
	){}
}