export class FroReporteIngresos {
    constructor(
        public id: number,
        public idSedeOperativa: number,
        public idTipoPersona: number,
        public fechaDesde: string,
        public fechaHasta: string,
    ) { }
}
