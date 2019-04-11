
export class MsvIpatVehiculo {
    constructor(
        //campos vehiculo
        public portaPlaca: string,
        public placa: string,
        public placaRemolque: string,
        public nacionalidadVehiculo: string,
        public marca: string,
        public linea: string,
        public color: string,
        public modelo: string,
        public carroceria: string,
        public ton: string,
        public pasajeros: string,

        public empresa: string,
        public nitEmpresa: number,

        public matriculadoEn: string,
        public inmovilizado: string,
        public inmovilizadoEn: string,
        public aDisposicionDe: string,
        public portaTarjetaRegistro: string,
        public tarjetaRegistro: string,
        public organismoTransitoTarjetaRegistro: string,

        //revision tecnomecanica
        public revisionTecnomecanica: string,
        public numeroTecnoMecanica: number,
        public cantidadAcompaniantes: number,

        //soat
        public portaSoat: string,
        public soat: number,
        public numeroPoliza: number,
        public aseguradoraSoat: string,
        public fechaVencimientoSoat: string,

        //seguro de responsabilidad civil contractual
        public portaSeguroResponsabilidadCivil: string,
        public numeroSeguroResponsabilidadCivil: number,
        public idAseguradoraSeguroResponsabilidadCivil: string,
        public fechaVencimientoSeguroResponsabilidadCivil: string,

        //seguro de responsabilidad extracontractual
        public portaSeguroExtracontractual: string,
        public numeroSeguroExtracontractual: number,
        public idAseguradoraSeguroExtracontractual: string,
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