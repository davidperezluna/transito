import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RegistroMaquinariaService} from '../../services/registroMaquinaria.service';
import {LoginService} from '../../services/login.service';
// import {Vehiculo} from './vehiculo.modelo';
import { RegistroMaquinaria } from './rnmaRegistroMaquinaria.modelo';
import { NewRegistroMaquinariaComponent } from './new/new.component';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './rnmaRegistroMaquinaria.component.html'
})
export class RnmaRegistroMaquinariaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public vehiculos;
  public registrosMaquinaria;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public registroMaquinaria: RegistroMaquinaria;

  constructor(
		private _RegistroMaquinariaService: RegistroMaquinariaService,
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
		this._RegistroMaquinariaService.index().subscribe(
				response => {
          this.registrosMaquinaria = response.data;
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
    this.formIndex = false;
    this.formNew = true;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  editVehiculo(registroMaquinaria:any){
    this.registroMaquinaria = registroMaquinaria;
    this.formIndex = false;
    this.formEdit = true;
  }

}