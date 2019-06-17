export class UserEmpresaTransporte {
    constructor(
        public idEmpresa: number,
        public idRadioAccion: number,
        public idModalidadTransporte: number,
        public idClase: number,
        public numeroActo: number,
        public fechaExpedicionActo: string,
        public fechaEjecucionActo: string,
        public numeroEjecutoriaActo: number,
        public arrayColores: string,
        public arrayMunicipios: string,

        public idCarroceria: number,
        public capacidadMinima: number,
        public capacidadMaxima: number,
        public id: number,
    ) { }
}