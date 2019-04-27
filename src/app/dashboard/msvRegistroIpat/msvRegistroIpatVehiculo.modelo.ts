
export class MsvIpatVehiculo {
    constructor(
        public consecutivo: string,
        //campos vehiculo
        public portaPlaca: number,
        public placa: string,
        public placaRemolque: string,
        public nacionalidadVehiculo: number,
        public marca: number,
        public linea: number,
        public color: number,
        public modelo: number,
        public carroceria: number,
        public ton: number,
        public pasajeros: number,

        public empresa: string,
        public nitEmpresa: number,

        public matriculadoEn: number,
        public inmovilizado: string,
        public inmovilizadoEn: number,
        public aDisposicionDe: number,
        public portaTarjetaRegistro: number,
        public tarjetaRegistro: number,
        public organismoTransitoTarjetaRegistro: string,

        //revision tecnomecanica
        public revisionTecnomecanica: number,
        public numeroTecnoMecanica: number,
        public cantidadAcompaniantes: number,

        //soat
        public portaSoat: number,
        public soat: number,
        public numeroPoliza: number,
        public aseguradoraSoat: number,
        public fechaVencimientoSoat: string,

        //seguro de responsabilidad civil contractual
        public portaSeguroResponsabilidadCivil: number,
        public numeroSeguroResponsabilidadCivil: number,
        public idAseguradoraSeguroResponsabilidadCivil: number,
        public fechaVencimientoSeguroResponsabilidadCivil: string,

        //seguro de responsabilidad extracontractual
        public portaSeguroExtracontractual: number,
        public numeroSeguroExtracontractual: number,
        public idAseguradoraSeguroExtracontractual: number,
        public fechaVencimientoSeguroExtracontractual: string,

        public clase: number,
        public servicio: number,
        public modalidadTransporte: number,
        public radioAccion: number,
        public descripcionDanios: string,
        public arrayFallas: string,
        public otraFalla: string,
        public arrayLugaresImpacto: string,
    ) {}
}