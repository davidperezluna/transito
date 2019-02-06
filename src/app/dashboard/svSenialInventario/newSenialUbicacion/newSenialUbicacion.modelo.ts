import { ArrayType } from "../../../../../node_modules/@angular/compiler/src/output/output_ast";

export class SvSenialUbicacion{
	constructor(
		public fecha: string,
		public hora: string,
		public cantidad: number,
		public idConector: number,
		public idSenial: number,
		public idEstado: number,
		public idMunicipio: number,
		public idBodega: number,
		public id: number
	){}
}