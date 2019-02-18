import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {VehiculoService} from '../../services/vehiculo.service';
import {LoginService} from '../../services/login.service';
import {Vehiculo} from './vehiculo.modelo';
import { NewVehiculoComponent } from './new/new.component';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public vehiculos;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public vehiculo: Vehiculo;

  constructor(
		private _VehiculoService: VehiculoService,
		private _loginService: LoginService,
	
		
		){}
  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info'
    });

    this.formEdit=false;
    this.formNew=false;
		this._VehiculoService.getVehiculo().subscribe(
				response => {
          this.vehiculos = response.data;
          
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
            swal.close();
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
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
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

  editVehiculo(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formEdit = true;
    this.formIndex = false;
  }

}