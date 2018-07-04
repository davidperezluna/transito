export class MpersonalHorario{
	constructor(
		public horaInicioManana: string,
		public horaFinManana: string,
		public manana: boolean,
		public horaInicioTarde: string,
		public horaFinTarde: string,
		public tarde: boolean,
		public horaInicioNoche: string,
		public horaFinNoche: string,
		public noche: boolean,
		public lunes: any,
		public martes: any,
		public miercoles: any,
		public jueves: any,
		public viernes: any,
		public sabado: any,
		public domingo: any,
		public dias: any,
		public funcionarioId: number,
		public id:number
	){}
}