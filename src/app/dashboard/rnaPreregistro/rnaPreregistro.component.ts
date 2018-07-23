import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RnaPreregistroService} from '../../services/rnaPreregistro.service';
import {LoginService} from '../../services/login.service';
import {RnaPreregistro} from './rnaPreregistro.modelo';
import { NewRnaPreregistroComponent } from './new/new.component';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './rnaPreregistro.component.html'
})
export class RnaPreregistroComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public vehiculos;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public vehiculo: RnaPreregistro;

  constructor(
		private _RnaPreregistroService: RnaPreregistroService,
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
		this._RnaPreregistroService.index().subscribe(
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
    this.formIndex = false;
    this.formEdit = true;
  }

}