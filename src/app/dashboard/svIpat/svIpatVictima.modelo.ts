export class SvIpatVictima {
    constructor(
        public consecutivo: string,
        
        public nombres: string,
        public apellidos: string,
        public tipoIdentificacion: string,
        public identificacion: string,
        public nacionalidad: string,
        public fechaNacimiento: string,
        public sexo: string,
        public direccionResidencia: string,
        public ciudadResidencia: string,
        public telefono: string,
        public idHospital: string,
        public placaVehiculo: string,
        public practicoExamen: string,
        public autorizo: string,
        public idResultadoExamen: string,
        public idGradoExamen: string,
        public sustanciasPsicoactivas: string,
        public chaleco: string,
        public casco: string,
        public cinturon: string,
        public idTipoVictima: number,
        public idGravedad: number,
        public descripcionLesion: string,
    ) {}
}