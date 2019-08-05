export class PnalHorario{
	constructor(
		public horaInicioManana: string,
		public horaFinManana: string,
		public manana: boolean,
		public horaInicioTarde: string,
		public horaFinTarde: string,
		public tarde: boolean,
		public horaInicioNoche: string,
		public horaFinNoche: string,
		public lugarNoche: string,
		public lugarManana: string,
		public lugarTarde: string,
		public noche: boolean,
		public fecha: any,
		public jornadas: any,
		public idFuncionario: number,
		public id:number
	){}
}