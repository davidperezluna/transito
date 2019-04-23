export class SvCapacitacion {
    constructor(
        public fechaHoraRegistro: string,
        public fechaActividad: string,
        public municipio: string,
        public funcion: string,
        public funcionCriterio: string,
        public temaCapacitacion: string,
        public descripcionActividad: string,

        public idTipoIdentificacion: number,
        public numeroCedulaActorVial: string,
        public nombreActorVial: string,
        public apellidoActorVial: string,
        public fechaNacimientoActorVial: string,
        public emailActorVial: string,
        public genero: number,
        public idGrupoEtnico: number,
        public claseActorVial: string,
        public discapacidad: number,
        public victima: number,

        public identificacion: number,
        public nit: number,
        public documento: string,
        public documentoCapacitados: string,
    ) { }
}

