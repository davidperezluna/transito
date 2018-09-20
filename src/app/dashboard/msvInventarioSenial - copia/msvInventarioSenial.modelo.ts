export class MsvInventarioSenial{
	constructor(
	     public id: number,
		 public inventario: number,
		 public fecha: string,
		 public unidad: string,
		 public tipoColorId: number,
		 public direccion: string,
		 public latitud: string,
		 public longitud: string,
		 public codigo: string,
		 public nombre: string,
		 public valor: number,
		 public tipoEstadoId: number,
		 public cantidad: number
	){}
}