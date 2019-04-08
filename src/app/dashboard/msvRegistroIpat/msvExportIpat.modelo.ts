export class MsvExportIpat {
    constructor(
        public documento: string,
        public arrayGravedadAccidente: number,
        public arrayTipoVictima: number,
        public horaInicio: string,
        public horaFin: string,
        public fechaInicio: string,
        public fechaFin: string,
        public arrayGrupoEdad: number,
        public arrayMunicipio: number,
        public arrayDiaSemana: number,
        public arrayGenero: number,
        public arrayClase: number,
        public arrayClaseAccidente: number,
        public arrayChoqueCon: number,
        public arrayObjetoFijo: number,

    ) {}
}