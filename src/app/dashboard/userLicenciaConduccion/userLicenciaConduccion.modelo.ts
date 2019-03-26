export class UserLicenciaConduccion {
    constructor(
        public numero: number,
        public numeroRunt: number,
        public fechaExpedicion: string,
        public fechaVencimiento: string,
        public estado: string,
        public idOrganismoTransito: string,
        public idCategoria: string,
        public idClase: string,
        public idServicio: string,
        public idTramiteFactura: string,
        public idCiudadano: string,
        public idPais: string,
        public id: number,
    ) { }
}