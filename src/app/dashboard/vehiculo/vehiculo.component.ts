import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {VehiculoService} from '../../services/vehiculo.service';
import {LoginService} from '../../services/login.service';
import {Vehiculo} from './vehiculo.modelo';
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
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    this.formEdit=false;
    this.formNew=false;
		this._VehiculoService.getVehiculo().subscribe(
				response => {
          this.vehiculos = response.data;
    console.log(this.vehiculos);
          
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

  editVehiculo(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formEdit = true;
    this.formIndex = false;
  }

}