export class FroReporteIngresos {
    constructor(
        public idOrganismoTransito: number,
        public idTipoRecaudo: number,
        public fechaDesde: string,
        public fechaHasta: string,
    ) { }
}
