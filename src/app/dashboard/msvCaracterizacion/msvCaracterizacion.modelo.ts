export class MsvCaracterizacion{
	constructor(
		public id:number,
		public nit:number,
		/* public numero: string,
		public parametro: string,
		public item: string,
		public variable: string,
		public criterio: string,
		public aplica: boolean,
		public evidencia: boolean,
		public responde: boolean,
		public observacion: string,
		public estado: boolean, */
		
		public fecha: string,
		public municipio: string,
		public nombres: string,
		public apellidos: string,
		public identificacion: number,
		public clc: string,
		public fechaVigencia: string,
		public edad: number,
		public genero: string,

		public grupoTrabajo: string,
		public otroGrupoTrabajo: string,
		public tipoContrato: string,
		public otroTipoContrato: string,
		public cargo: string,
		public experienciaConduccion: string,
		public accidente: string,
		public circunstancias: string,
		public incidente: string,
		public frecuenciaDesplazamiento: string,
		public propioVehiculo: string,
		public desplazamientoPlanificado: string,
		public antelacion: string,
		public medioDesplazamiento: string,
		public trayecto: number,
		public tiempoTrayecto: string,
		public kmMensualTrayecto: string,

		//checkbox factores riesgo
		/* public estadoInfraestructura: string,
		public organizacionTrabajo: string,
		public propiaConduccion: string,
		public otro2: string, */
		public arrayFactoresRiesgo: string,
		public otroFactorRiesgo: string,
		
		//checkbox causas riesgo
		/* public intensidadTrafico: string,
		public condicionClimatologica: string,
		public tipoVehiculo: string,
		public organizacionTrabajo2: string,
		public propiaConduccion2: string,
		public estado: string,
		public otroConductor: string,
		public estadoInfraestructura2: string,
		public faltaInformacion: string,
		public otraCausa: string, */
		public arrayCausasRiesgo: string,
		public otraCausaRiesgo: string,

		//public otro3: string,
		public riesgoPercibido: string,
		public propuestaReduccion: string,

	){}
}