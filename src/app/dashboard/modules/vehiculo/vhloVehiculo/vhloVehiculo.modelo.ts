export class VhloVehiculo{
	constructor(
		public id:number,
		public claseId:string,
		public municipioId:number,
		public lineaId:number,
		public servicioId:number,
		public colorId:number,
		public combustibleId:number,
		public carroceriaId:number,
		public sedeOperativaId:number,
		public placa:any,
		public numeroFactura:string,
		public fechaFactura:string,
		public valor:string,
		public numeroManifiesto:string,
		public fechaManifiesto:string,
		public cilindraje:string,
		public modelo:string,
		public motor:string,
		public chasis:string,
		public serie:string,
		public vin:number,
		public numeroPasajeros:number,
		public capacidadCarga:number,
		public pignorado:number,
		public cancelado:number,
		public tipoVehiculo:string,
		public radioAccion:string,
		public modalidadTransporte:string,
		public transportePasajeros:string,
		public paisRegistro: number,
		
	){}
}