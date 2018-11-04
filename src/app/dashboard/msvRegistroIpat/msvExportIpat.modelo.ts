export class MsvExportIpat {
    constructor(
        public documento: string,
        public idGravedad: number,
        public idTipoVictima: number,
        public horaInicio: string,
        public horaFin: string,
        public fechaInicio: string,
        public fechaFin: string,
        public idGrupoEdad: number,
        public idMunicipio: number,
        public idDiaSemana: number,
        public idGenero: number,
        public idClase: number,
        public idClaseAccidente: number,
        public idChoqueCon: number,
        public idObjetoFijo: number,

    ) {}
}