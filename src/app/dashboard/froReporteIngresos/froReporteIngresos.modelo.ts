export class FroReporteIngresos {
    constructor(
        public idOrganismoTransito: number,
        public idTipoRecaudo: number,
        public idTipoPersona: number,
        public fechaDesde: string,
        public fechaHasta: string,
    ) { }
}
