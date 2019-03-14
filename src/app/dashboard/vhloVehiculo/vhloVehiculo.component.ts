import { Component, OnInit } from '@angular/core';
import { VhloVehiculo } from './vhloVehiculo.modelo';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { LoginService } from '../../services/login.service';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vhloVehiculo.component.html'
})
export class VhloVehiculoComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public vehiculos;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public vehiculo: VhloVehiculo;

  constructor(
    private _VehiculoService: VhloVehiculoService,
		private _loginService: LoginService,
	
		
		){}
  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info'
    });

    this.formEdit = false;
    this.formNew = false;

		this._VehiculoService.index().subscribe(
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