import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {VehiculoService} from '../../services/vehiculo.service';
import {LoginService} from '../../services/login.service';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public vehiculos;
	public formNew = false;
  public formIndex = true;
  public table:any; 

  constructor(
		private _VehiculoService: VehiculoService,
		private _loginService: LoginService,
	
		
		){}
  ngOnInit() {
		this._VehiculoService.getVehiculo().subscribe(
				response => {
          this.vehiculos = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      );
  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formIndex = true;
      this.ngOnInit();
    }
}

}