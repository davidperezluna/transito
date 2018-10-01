export class CfgAsignacionPlacaSede {
    constructor(
        public id: number,
        public sedeOperativa: number,
        public moduloId: number,
        public cfgTipoVehiculo: number,
        public letrasPlaca: string,
        public numeroInicial: string,
        public numeroFinal: string,
        public letraFinal: string,
    ) { }
}