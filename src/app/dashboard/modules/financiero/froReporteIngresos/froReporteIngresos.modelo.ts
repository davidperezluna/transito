export class FroReporteIngresos {
    constructor(
        public idOrganismoTransito: number,
        public arrayOrganismosTransito: string,
        public idTipoRecaudo: number,
        public fechaDesde: string,
        public fechaHasta: string,
    ) { }
}
