export class SvIpat{
	constructor(
		public idOrganismoTransito:number,
		public numeroConsecutivo:string,

		public idGravedad:number,
		public lugar: string,
		public fechaAccidente:string,
		public horaAccidente:string,
		public fechaLevantamiento:string,
		public horaLevantamiento:string,
		public idClaseAccidente: number,
		public otroClaseAccidente:string,
		public idClaseChoque:number,
		public idObjetoFijo:number,
		public otroObjetoFijo:string,
		public idArea:number,
		public idTipoArea:number,
		public idTipoVia:number,
		public idCardinalidad:number,
		public idSector:number,
		public idZona:number,
		public arrayDisenios:number,
		public arrayEstadosTiempo:number,
		public arrayGeometrias:number,
		public idUtilizacion:number,
		public idCalzada:number,
		public idCarril:number,
		public idMaterial:number,
		public otroMaterial: string,
		public idEstadoVia:number,
		public arrayCondicionesVia:number,
		public otraCondicionVia: string,
		public idIluminacion:number,
		public idEstadoIluminacion:number,
		public idVisual:number,
		public idVisualDisminuida:number,
		public otraVisualDisminuida: string,
		public hayAgenteTransito: string,
		
		public idEstadoSemaforo: number,
		public arraySenialesVerticales: number,
		public arraySenialesHorizontales: number,
		public arrayReductoresVelocidad: number,
		public otroReductorVelocidad: string,
		public arrayDelineadoresPiso: number,
		public otroDelineadorPiso: string,
		
		//propietario
		public mismoConductor: string,
		public nombresPropietario: string,
		public apellidosPropietario: string,
		public tipoIdentificacionPropietario: string,
		public identificacionPropietario: string,

		public observaciones:string,

		//correspondio
		public idMunicipio: number,
		public idEntidad: number,
		public idUnidad: number,
		public idAnio: number,
		public consecutivo: number,
		public correspondio: string,


		//total victimas
		public totalPeatones: number,
		public totalAcompaniantes: number,
		public totalPasajeros: number,
		public totalConductores: number,
		public totalHeridos: number,
		public totalMuertos: number,


		// información testigo
		public hayTestigo: number,
		public tipoIdentificacionTestigo: number,
		public identificacionTestigo: number,
		public nombresTestigo: string,
		public apellidosTestigo: string,
		public departamentoResidenciaTestigo: string,
		public direccionTestigo: string,
		public ciudadResidenciaTestigo: string,
		public telefonoTestigo: string,
		
		public arrayHipotesis: string,
		public otraHipotesis: string,
		
		//datos agente de transito
		public gradoAgente: string,
		public tipoIdentificacionAgente: string,
		public identificacionAgente: string,
		public nombresAgente: string,
		public apellidosAgente: string,
		public placaAgente: string,
		public entidadAgente: string,
	){}
}