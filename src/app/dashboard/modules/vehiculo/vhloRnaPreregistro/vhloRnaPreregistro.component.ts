import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloRnaPreregistro } from './vhloRnaPreregistro.modelo';
import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnaPreregistro.component.html'
})

export class VhloRnaPreregistroComponent implements OnInit {
  public errorMessage;

	public vehiculos;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any = null; 
  public vehiculo: VhloRnaPreregistro;

  constructor(
    private _VehiculoService: VhloVehiculoService,
		private _RnaPreregistroService: VhloRnaPreregistroService,
		private _loginService: LoginService,
	
		
  ){}
  
  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info',
      showConfirmButton: false,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formEdit=false;
    this.formNew=false;

		this._RnaPreregistroService.index().subscribe(
				response => {
          this.vehiculos = response.data;
      
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
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

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
      destroy: true,
      responsive: true,
      pageLength: 10,
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

  onEdit(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formIndex = false;
    this.formEdit = true;
  }
  
  onDelete(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Eliminando registro!',
          text: 'Solo tardara unos segundos por favor espere.',
          type: 'info',
          showConfirmButton: false,
          onOpen: () => {
            swal.showLoading()
          }
        });

        let token = this._loginService.getToken();

        this._VehiculoService.delete({ 'id': id}, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });

              this.ngOnInit();
            }else{
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });
            }
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
    });
  }
}