export class UserEmpresaTransporte {
    constructor(
        public idEmpresa: number,
        public idRadioAccion: number,
        public idModalidadTransporte: number,
        public idClase: number,
        public numeroActo: number,
        public numeroConvenio: number,
        public fechaExpedicionActo: string,
        public fechaEjecutoriaActo: string,
        public numeroEjecutoriaActo: number,
        public arrayColores: string,
        public arrayMunicipios: string,

        public idCarroceria: number,
        public capacidadDisponible: number,
        public capacidadMinima: number,
        public capacidadMaxima: number,
        public dobleCabina: number,
        public id: number,
    ) { }
}